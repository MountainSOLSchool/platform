import { Functions } from '@sol/firebase/functions';
import { Braintree } from '@sol/payments/braintree';
import { DatabaseUtility } from '@sol/firebase/database';
import { type Firestore } from 'firebase-admin/firestore';

export interface DonationDbo {
    amount: number;
    currency: string;
    paymentMethod: 'venmo' | 'card';
    transactionId?: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    timestamp: Date;
    completedAt?: Date;
    errors?: string[];
    source?: 'donation_page';
    donorName?: string;
    donorEmail?: string;
    donorAddress?: string;
    referralSource?: string;
}

export interface DonationSummary {
    amount: number;
    transactionId: string;
    timestamp: Date;
}

export class DonationRepository {
    private static get database(): Firestore {
        return DatabaseUtility.getDatabase();
    }

    static async create(donation: Omit<DonationDbo, 'timestamp'>): Promise<string> {
        const { id } = await this.database
            .collection('donations')
            .add({ ...donation, timestamp: new Date() });
        return id;
    }

    static async update(id: string, updates: Partial<DonationDbo>): Promise<void> {
        await this.database
            .collection('donations')
            .doc(id)
            .update(updates);
    }
}

export const donate = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<{
        amount: number;
        paymentMethodNonce: string;
        deviceData: string;
        donorName: string;
        donorEmail: string;
        donorAddress?: string;
        referralSource?: string;
    }>(async (request, response, secrets, strings) => {
        try {
            const {
                amount,
                paymentMethodNonce,
                deviceData,
                donorName,
                donorEmail,
                donorAddress,
                referralSource,
            } = request.body.data;

            if (!amount || amount <= 0 || amount > 249) {
                response.status(400).send({ error: 'Invalid donation amount. Please donate an amount under $250' });
                return;
            }

            if (!paymentMethodNonce) {
                response.status(400).send({ error: 'Payment method nonce is required' });
                return;
            }

            if (!donorName || !donorEmail) {
                response.status(400).send({ error: 'Donor name and email are required' });
                return;
            }

            const braintree = new Braintree(secrets, strings);

            // Detect payment method type from the nonce
            // Venmo nonces typically start with 'fake-venmo-account-nonce' in sandbox
            // or contain venmo-specific identifiers in production
            // For now, we'll try Venmo first and fall back to card
            let paymentMethod: 'venmo' | 'card' = 'card';
            let success = false;
            let transaction: any;
            let errors: any;

            // Try to determine payment method from nonce characteristics
            // Braintree nonces for Venmo often contain specific patterns
            const isLikelyVenmo = paymentMethodNonce.includes('venmo') ||
                                  paymentMethodNonce.startsWith('fake-venmo');

            const donationRecord: Omit<DonationDbo, 'timestamp'> = {
                amount,
                currency: 'USD',
                paymentMethod: isLikelyVenmo ? 'venmo' : 'card',
                status: 'pending',
                source: 'donation_page',
                donorName,
                donorEmail,
                donorAddress,
                referralSource,
            };

            const donationId = await DonationRepository.create(donationRecord);

            if (isLikelyVenmo) {
                // Try Venmo transaction
                const venmoResult = await braintree.transactWithVenmo({
                    amount: amount,
                    nonce: paymentMethodNonce,
                    deviceData: deviceData,
                    customFields: {
                        purpose: 'charitable_donation',
                    }
                });

                success = venmoResult.success;
                transaction = venmoResult.transaction;
                errors = venmoResult.errors;
                paymentMethod = 'venmo';
            } else {
                // Process as card transaction
                const cardResult = await braintree.transact({
                    amount: amount,
                    nonce: paymentMethodNonce,
                    deviceData: deviceData,
                    customer: { email: donorEmail },
                });

                success = cardResult.success;
                transaction = cardResult.transaction;
                errors = cardResult.errors;
                paymentMethod = 'card';
            }

            if (success && transaction) {
                await DonationRepository.update(donationId, {
                    status: 'completed',
                    transactionId: transaction.id,
                    completedAt: new Date(),
                    paymentMethod,
                });

                response.send({
                    success: true,
                    donationId,
                    transactionId: transaction.id,
                    amount: amount,
                });
            } else {
                const errorMessages = errors?.deepErrors().map((e: any) => e.message) || ['Transaction failed'];

                await DonationRepository.update(donationId, {
                    status: 'failed',
                    errors: errorMessages
                });

                response.status(400).send({
                    success: false,
                    errors: errorMessages,
                    message: 'Unable to process donation. Please try again.'
                });
            }

        } catch (error) {
            console.error('Error processing donation:', error);

            // Handle gateway rejection for token_issuance
            if (error instanceof Error && error.message.includes('token_issuance')) {
                response.status(503).send({
                    success: false,
                    error: 'Temporary payment processing issue. Please try again.',
                    retry: true
                });
            } else {
                response.status(500).send({
                    success: false,
                    error: 'An unexpected error occurred while processing your donation.'
                });
            }
        }
    });

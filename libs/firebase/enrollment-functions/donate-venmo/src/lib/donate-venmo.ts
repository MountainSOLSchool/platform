import { Functions } from '@sol/firebase/functions';
import { Braintree } from '@sol/payments/braintree';
import { DatabaseUtility } from '@sol/firebase/database';
import { type Firestore } from 'firebase-admin/firestore';

export interface DonationDbo {
    amount: number;
    currency: string;
    paymentMethod: 'venmo';
    transactionId?: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    timestamp: Date;
    completedAt?: Date;
    errors?: string[];
    source?: 'donation_page_venmo';
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

export const donateVenmo = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<{
        amount: number;
        paymentMethodNonce: string;
        deviceData: string;
    }>(async (request, response, secrets, strings) => {
        try {            
            const {
                amount,
                                            paymentMethodNonce,
                deviceData,
            } = request.body.data;

            if (!amount || amount <= 0 || amount > 249) {
                response.status(400).send({ error: 'Invalid donation amount. Please donate an amount under $250' });
                return;
            }

            if (!paymentMethodNonce) {
                response.status(400).send({ error: 'Payment method nonce is required' });
                return;
            }

            const donationRecord: Omit<DonationDbo, 'timestamp'> = {
                amount,
                currency: 'USD',
                paymentMethod: 'venmo',
                status: 'pending',
                source: 'donation_page_venmo'
            };

            const donationId = await DonationRepository.create(donationRecord);

            const braintree = new Braintree(secrets, strings);

            const {
                success,
                transaction,
                errors
            } = await braintree.transactWithVenmo({
                amount: amount,
                nonce: paymentMethodNonce,
                deviceData: deviceData,
                customFields: {
                    purpose: 'charitable_donation',
                }
            });

            if (success && transaction) {
                await DonationRepository.update(donationId, {
                    status: 'completed',
                    transactionId: transaction.id,
                    completedAt: new Date()
                });

                response.send({
                    success: true,
                    donationId,
                    transactionId: transaction.id,
                    amount: amount,
                });                
            } else {
                const errorMessages = errors?.deepErrors().map((e) => e.message) || ['Transaction failed'];
                
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
            console.error('Error processing Venmo donation:', error);
            
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

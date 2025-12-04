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

                // Send confirmation email
                const { html, text } = generateDonationEmailContent(
                    donorName,
                    donorEmail,
                    amount,
                    transaction.id,
                    paymentMethod,
                    donorAddress,
                    referralSource
                );

                await DatabaseUtility.getDatabase()
                    .collection('mail')
                    .add({
                        to: donorEmail,
                        message: {
                            subject: `Thank you for your donation to Mountain SOL`,
                            from: `Mountain SOL School <info@mountainsol.org>`,
                            replyTo: `Mountain SOL School <info@mountainsol.org>`,
                            messageId: `<${transaction.id}.${Date.now()}@mountainsol.org>`,
                            html,
                            text,
                        },
                    });

                response.send({
                    success: true,
                    donationId,
                    transactionId: transaction.id,
                    amount: amount,
                });
            } else{
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

interface EmailContent {
    html: string;
    text: string;
}

function generateDonationEmailContent(
    donorName: string,
    donorEmail: string,
    amount: number,
    transactionId: string,
    paymentMethod: 'venmo' | 'card',
    donorAddress?: string,
    referralSource?: string
): EmailContent {
    const paymentMethodDisplay = paymentMethod === 'venmo' ? 'Venmo' : 'Credit Card';
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const styles = `
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 30px 20px; }
        .receipt { background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
        .receipt-row:last-child { border-bottom: none; font-weight: bold; font-size: 18px; }
        .label { color: #666; }
        .value { font-weight: 600; }
        .footer { background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .footer a { color: #667eea; text-decoration: none; }
    `;

    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <style>${styles}</style>
            </head>
            <body>
                <div class="header">
                    <h1>Thank You for Your Donation!</h1>
                </div>

                <div class="content">
                    <p>Dear ${donorName},</p>

                    <p>Thank you so much for your generous donation to Mountain SOL School! Your support helps us provide exceptional outdoor education experiences for students in our community.</p>

                    <div class="receipt">
                        <h2 style="margin-top: 0;">Donation Receipt</h2>
                        <div class="receipt-row">
                            <span class="label">Date:</span>
                            <span class="value">${currentDate}</span>
                        </div>
                        <div class="receipt-row">
                            <span class="label">Donor Name:</span>
                            <span class="value">${donorName}</span>
                        </div>
                        <div class="receipt-row">
                            <span class="label">Email:</span>
                            <span class="value">${donorEmail}</span>
                        </div>
                        ${donorAddress ? `
                        <div class="receipt-row">
                            <span class="label">Address:</span>
                            <span class="value">${donorAddress}</span>
                        </div>
                        ` : ''}
                        ${referralSource ? `
                        <div class="receipt-row">
                            <span class="label">How you heard about us:</span>
                            <span class="value">${referralSource}</span>
                        </div>
                        ` : ''}
                        <div class="receipt-row">
                            <span class="label">Payment Method:</span>
                            <span class="value">${paymentMethodDisplay}</span>
                        </div>
                        <div class="receipt-row">
                            <span class="label">Transaction ID:</span>
                            <span class="value">${transactionId}</span>
                        </div>
                        <div class="receipt-row">
                            <span class="label">Donation Amount:</span>
                            <span class="value">$${amount.toFixed(2)}</span>
                        </div>
                    </div>

                    <p>Your donation is tax-deductible to the extent allowed by law. Please keep this email as your receipt for tax purposes.</p>

                    <p>If you have any questions about your donation or would like to learn more about how your contribution is making a difference, please don't hesitate to reach out.</p>

                    <p>With gratitude,<br>
                    <strong>The Mountain SOL Team</strong></p>
                </div>

                <div class="footer">
                    <p>Mountain SOL School<br>
                    Email: <a href="mailto:info@mountainsol.org">info@mountainsol.org</a><br>
                    Website: <a href="https://mountainsol.org">mountainsol.org</a></p>

                    <p style="font-size: 12px; margin-top: 20px;">
                    Mountain SOL is a 501(c)(3) nonprofit organization.<br>
                    Tax ID: [Your Tax ID]
                    </p>
                </div>
            </body>
        </html>`;

    const text = `Thank You for Your Donation!

Dear ${donorName},

Thank you so much for your generous donation to Mountain SOL School! Your support helps us provide exceptional outdoor education experiences for students in our community.

DONATION RECEIPT
================
Date: ${currentDate}
Donor Name: ${donorName}
Email: ${donorEmail}
${donorAddress ? `Address: ${donorAddress}\n` : ''}${referralSource ? `How you heard about us: ${referralSource}\n` : ''}Payment Method: ${paymentMethodDisplay}
Transaction ID: ${transactionId}

Donation Amount: $${amount.toFixed(2)}

Your donation is tax-deductible to the extent allowed by law. Please keep this email as your receipt for tax purposes.

If you have any questions about your donation or would like to learn more about how your contribution is making a difference, please don't hesitate to reach out.

With gratitude,
The Mountain SOL Team

---
Mountain SOL School
Email: info@mountainsol.org
Website: mountainsol.org

Mountain SOL is a 501(c)(3) nonprofit organization.
Tax ID: [Your Tax ID]`;

    return { html, text };
}

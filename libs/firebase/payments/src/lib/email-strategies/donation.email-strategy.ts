import {
    PaymentEmailStrategy,
    PaymentEmailConfig,
    PaymentEmailContent,
} from '@sol/payments/domain';
import {
    baseEmailStyles,
    formatDate,
    formatPaymentMethod,
} from './base-email.styles';

export class DonationEmailStrategy implements PaymentEmailStrategy {
    getSubject(): string {
        return 'Thank you for your donation to Mountain SOL';
    }

    generateContent(config: PaymentEmailConfig): PaymentEmailContent {
        const {
            recipientName,
            recipientEmail,
            amount,
            transactionId,
            paymentMethod,
            address,
            referralSource,
        } = config;

        const currentDate = formatDate();
        const paymentMethodDisplay = formatPaymentMethod(paymentMethod);

        const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <style>${baseEmailStyles}</style>
                </head>
                <body>
                    <div class="header">
                        <h1>Thank You for Your Donation!</h1>
                    </div>

                    <div class="content">
                        <p>Dear ${recipientName},</p>

                        <p>Thank you so much for your generous donation to Mountain SOL School! Your support helps us provide exceptional outdoor education experiences for students in our community.</p>

                        <div class="receipt">
                            <h2 style="margin-top: 0;">Donation Receipt</h2>
                            <div class="receipt-row">
                                <span class="label">Date:</span>
                                <span class="value">${currentDate}</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Donor Name:</span>
                                <span class="value">${recipientName}</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Email:</span>
                                <span class="value">${recipientEmail}</span>
                            </div>
                            ${
                                address
                                    ? `
                            <div class="receipt-row">
                                <span class="label">Address:</span>
                                <span class="value">${address}</span>
                            </div>
                            `
                                    : ''
                            }
                            ${
                                referralSource
                                    ? `
                            <div class="receipt-row">
                                <span class="label">How you heard about us:</span>
                                <span class="value">${referralSource}</span>
                            </div>
                            `
                                    : ''
                            }
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
                        Tax ID: 54-1942427
                        </p>
                    </div>
                </body>
            </html>`;

        const text = `Thank You for Your Donation!

Dear ${recipientName},

Thank you so much for your generous donation to Mountain SOL School! Your support helps us provide exceptional outdoor education experiences for students in our community.

DONATION RECEIPT
================
Date: ${currentDate}
Donor Name: ${recipientName}
Email: ${recipientEmail}
${address ? `Address: ${address}\n` : ''}${referralSource ? `How you heard about us: ${referralSource}\n` : ''}Payment Method: ${paymentMethodDisplay}
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
Tax ID: 54-1942427`;

        return { html, text };
    }
}

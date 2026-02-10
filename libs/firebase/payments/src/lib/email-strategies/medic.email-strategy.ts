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

export class MedicPaymentEmailStrategy implements PaymentEmailStrategy {
    getSubject(): string {
        return 'Mountain SOL Medical - Class Registration Confirmation';
    }

    generateContent(config: PaymentEmailConfig): PaymentEmailContent {
        const {
            recipientName,
            recipientEmail,
            amount,
            transactionId,
            paymentMethod,
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
                        <h1>Registration Confirmed</h1>
                    </div>

                    <div class="content">
                        <p>Dear ${recipientName},</p>

                        <p>Thank you for registering for a Mountain SOL Medical class. Your spot has been reserved.</p>

                        <div class="receipt">
                            <h2 style="margin-top: 0;">Registration Receipt</h2>
                            <div class="receipt-row">
                                <span class="label">Date:</span>
                                <span class="value">${currentDate}</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Name:</span>
                                <span class="value">${recipientName}</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Email:</span>
                                <span class="value">${recipientEmail}</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Payment Method:</span>
                                <span class="value">${paymentMethodDisplay}</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Transaction ID:</span>
                                <span class="value">${transactionId}</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Amount Paid:</span>
                                <span class="value">$${amount.toFixed(2)}</span>
                            </div>
                        </div>

                        <p>If you have any questions about your registration, please don't hesitate to reach out.</p>

                        <p>Thank you,<br>
                        <strong>The Mountain SOL Medical Team</strong></p>
                    </div>

                    <div class="footer">
                        <p>Mountain SOL Medical<br>
                        Email: <a href="mailto:info@mountainsol.org">info@mountainsol.org</a><br>
                        Website: <a href="https://mountainsol.org">mountainsol.org</a></p>
                    </div>
                </body>
            </html>`;

        const text = `Registration Confirmed

Dear ${recipientName},

Thank you for registering for a Mountain SOL Medical class. Your spot has been reserved.

REGISTRATION RECEIPT
================
Date: ${currentDate}
Name: ${recipientName}
Email: ${recipientEmail}
Payment Method: ${paymentMethodDisplay}
Transaction ID: ${transactionId}

Amount Paid: $${amount.toFixed(2)}

If you have any questions about your registration, please don't hesitate to reach out.

Thank you,
The Mountain SOL Medical Team

---
Mountain SOL Medical
Email: info@mountainsol.org
Website: mountainsol.org`;

        return { html, text };
    }
}

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

export class ServicePaymentEmailStrategy implements PaymentEmailStrategy {
    getSubject(): string {
        return 'Payment Receipt from Mountain SOL';
    }

    generateContent(config: PaymentEmailConfig): PaymentEmailContent {
        const {
            recipientName,
            recipientEmail,
            amount,
            transactionId,
            paymentMethod,
            address,
            invoiceNumber,
            purpose,
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
                        <h1>Payment Received</h1>
                    </div>

                    <div class="content">
                        <p>Dear ${recipientName},</p>

                        <p>Thank you for your payment to Mountain SOL. This email serves as your receipt.</p>

                        <div class="receipt">
                            <h2 style="margin-top: 0;">Payment Receipt</h2>
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
                                invoiceNumber
                                    ? `
                            <div class="receipt-row">
                                <span class="label">Invoice Number:</span>
                                <span class="value">${invoiceNumber}</span>
                            </div>
                            `
                                    : ''
                            }
                            ${
                                purpose
                                    ? `
                            <div class="receipt-row">
                                <span class="label">Purpose:</span>
                                <span class="value">${purpose}</span>
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
                                <span class="label">Amount Paid:</span>
                                <span class="value">$${amount.toFixed(2)}</span>
                            </div>
                        </div>

                        <p>If you have any questions about this payment, please don't hesitate to reach out.</p>

                        <p>Thank you,<br>
                        <strong>The Mountain SOL Team</strong></p>
                    </div>

                    <div class="footer">
                        <p>Mountain SOL School<br>
                        Email: <a href="mailto:info@mountainsol.org">info@mountainsol.org</a><br>
                        Website: <a href="https://mountainsol.org">mountainsol.org</a></p>
                    </div>
                </body>
            </html>`;

        const text = `Payment Received

Dear ${recipientName},

Thank you for your payment to Mountain SOL. This email serves as your receipt.

PAYMENT RECEIPT
================
Date: ${currentDate}
Name: ${recipientName}
Email: ${recipientEmail}
${address ? `Address: ${address}\n` : ''}${invoiceNumber ? `Invoice Number: ${invoiceNumber}\n` : ''}${purpose ? `Purpose: ${purpose}\n` : ''}Payment Method: ${paymentMethodDisplay}
Transaction ID: ${transactionId}

Amount Paid: $${amount.toFixed(2)}

If you have any questions about this payment, please don't hesitate to reach out.

Thank you,
The Mountain SOL Team

---
Mountain SOL School
Email: info@mountainsol.org
Website: mountainsol.org`;

        return { html, text };
    }
}

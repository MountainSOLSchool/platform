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
import type { MedicClassDetails } from '../factories/medic-payment.factory';

export class MedicPaymentEmailStrategy implements PaymentEmailStrategy {
    constructor(private readonly classDetails?: MedicClassDetails) {}

    getSubject(): string {
        return 'Mountain SOL Medic - Class Registration Confirmation';
    }

    generateContent(config: PaymentEmailConfig): PaymentEmailContent {
        const {
            recipientName,
            recipientEmail,
            amount,
            transactionId,
            paymentMethod,
        } = config;

        const className = this.classDetails?.className;
        const classLocation = this.classDetails?.location;
        const classDate = this.classDetails?.date;
        const classTime = this.classDetails?.time;

        const currentDate = formatDate();
        const paymentMethodDisplay = formatPaymentMethod(paymentMethod);

        const classDescription = className
            ? `<strong>${className}</strong>`
            : 'a Mountain SOL Medic class';

        const classDetailsHtml = (classDate || classTime || classLocation)
            ? `<div class="receipt" style="margin-bottom: 20px;">
                            <h2 style="margin-top: 0;">Class Details</h2>
                            ${className ? `<div class="receipt-row"><span class="label">Class:</span><span class="value">${className}</span></div>` : ''}
                            ${classDate ? `<div class="receipt-row"><span class="label">Date:</span><span class="value">${classDate}</span></div>` : ''}
                            ${classTime ? `<div class="receipt-row"><span class="label">Time:</span><span class="value">${classTime}</span></div>` : ''}
                            ${classLocation ? `<div class="receipt-row"><span class="label">Location:</span><span class="value">${classLocation}</span></div>` : ''}
                        </div>`
            : '';

        const classDetailsText = (classDate || classTime || classLocation)
            ? `\nCLASS DETAILS\n================\n${className ? `Class: ${className}\n` : ''}${classDate ? `Date: ${classDate}\n` : ''}${classTime ? `Time: ${classTime}\n` : ''}${classLocation ? `Location: ${classLocation}\n` : ''}`
            : '';

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

                        <p>Thank you for registering for ${classDescription}. Your spot has been reserved.</p>

                        ${classDetailsHtml}

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
                        <strong>The Mountain SOL Medic Team</strong></p>
                    </div>

                    <div class="footer">
                        <p>Mountain SOL Medic<br>
                        Email: <a href="mailto:info@mountainsol.org">info@mountainsol.org</a><br>
                        Website: <a href="https://mountainsol.org">mountainsol.org</a></p>
                    </div>
                </body>
            </html>`;

        const text = `Registration Confirmed

Dear ${recipientName},

Thank you for registering for ${className || 'a Mountain SOL Medic class'}. Your spot has been reserved.
${classDetailsText}
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
The Mountain SOL Medic Team

---
Mountain SOL Medic
Email: info@mountainsol.org
Website: mountainsol.org`;

        return { html, text };
    }
}

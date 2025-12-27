import { PaymentMethod } from './payment.dbo';

export interface PaymentEmailConfig {
    recipientName: string;
    recipientEmail: string;
    amount: number;
    transactionId: string;
    paymentMethod: PaymentMethod;
    address?: string;
    invoiceNumber?: string;
    purpose?: string;
    referralSource?: string;
}

export interface PaymentEmailContent {
    html: string;
    text: string;
}

export interface PaymentEmailStrategy {
    getSubject(): string;
    generateContent(config: PaymentEmailConfig): PaymentEmailContent;
}

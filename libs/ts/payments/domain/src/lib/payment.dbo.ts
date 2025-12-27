export type PaymentType = 'donation' | 'service_payment';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'venmo' | 'card';

export interface PaymentDbo {
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentType: PaymentType;
    transactionId?: string;
    status: PaymentStatus;
    timestamp: Date;
    completedAt?: Date;
    errors?: string[];
    payerName: string;
    payerEmail: string;
    payerAddress?: string;
    invoiceNumber?: string;
    purpose?: string;
    referralSource?: string;
    source?: string;
}

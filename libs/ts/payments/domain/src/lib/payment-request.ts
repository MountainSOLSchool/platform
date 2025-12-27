export interface BasePaymentRequest {
    amount: number;
    paymentMethodNonce: string;
    deviceData: string;
    paymentMethodType: string;
    payerName: string;
    payerEmail: string;
    payerAddress?: string;
}

export interface ServicePaymentRequest extends BasePaymentRequest {
    payerAddress: string;
    purpose: string;
    invoiceNumber?: string;
}

export interface DonationRequest extends BasePaymentRequest {
    referralSource?: string;
}

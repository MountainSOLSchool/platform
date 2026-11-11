export interface PreparedTransaction {
    amount: number;
    nonce: string;
    customer: { email: string };
    deviceData: string;
    orderId?: string;
    customFields?: Record<string, string>;
}

export interface UnpreparedTransaction {
    amount: number;
    customer: { email: string };
}

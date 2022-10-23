export interface QualifiedTransaction {
    amount: number;
    nonce: string;
    customer: { email: string };
    deviceData: string;
}

export interface UnqualifiedTransaction {
    amount: number;
    customer: { email: string };
}

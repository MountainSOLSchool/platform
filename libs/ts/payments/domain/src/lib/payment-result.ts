export type PaymentResult =
    | { success: true; paymentId: string; transactionId: string; amount: number }
    | { success: false; errors: string[]; message: string };

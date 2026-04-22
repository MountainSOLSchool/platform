export type RevokeEnrollmentRequest = {
    enrollmentId: string;
};

export type RevokeEnrollmentResponse = {
    success: boolean;
    refunded: boolean;
    refundAmount: number;
};

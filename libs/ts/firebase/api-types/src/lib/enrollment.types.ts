export type RevokeEnrollmentRequest = {
    enrollmentId: string;
    classIdsToRevoke?: string[];
    refundAmount?: number;
};

export type RevokeEnrollmentResponse = {
    success: boolean;
    refunded: boolean;
    refundAmount: number;
};

export type PreviewPartialRevokeRequest = {
    enrollmentId: string;
    classIdsToRevoke: string[];
};

export type PreviewPartialRevokeResponse = {
    originalCost: number;
    recalculatedCost: number;
    suggestedRefund: number;
    classNames: Array<{ id: string; semesterId: string; name: string }>;
};

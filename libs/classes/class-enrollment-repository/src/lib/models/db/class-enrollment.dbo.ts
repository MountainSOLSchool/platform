export interface ClassEnrollmentDbo {
    relatedId?: string;
    studentId?: string;
    userId: string;

    studentName: string;

    contactEmail: string;
    finalCost: number;
    discountIds: Array<string>;
    classIds: Array<string>;
    transactionId?: string;
    status: 'pending' | 'enrolled' | 'failed';
    failures?: Array<string>;
    isSignedUpForSolsticeEmails?: boolean;
}

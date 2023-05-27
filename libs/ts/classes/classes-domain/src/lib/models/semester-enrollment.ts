export interface SemesterEnrollment {
    studentName: string;
    finalCost: number;
    classIds: Array<string>;
    transactionId: string;
    timestamp: { _seconds: number };
    discounts: Array<{ amount: number; description: string }>;
}

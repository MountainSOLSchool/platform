export interface MedicEnrollment {
    id: string;
    classId: string;
    className: string;
    studentName: string;
    studentEmail: string;
    userId?: string;
    transactionId: string;
    amount: number;
    status: MedicEnrollmentStatus;
    timestamp: string;
}

export type MedicEnrollmentStatus = 'pending' | 'enrolled' | 'failed';

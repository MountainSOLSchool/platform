import admin from 'firebase-admin';

export type ClassEnrollmentDbo = {
    id?: string;
    relatedId?: string;
    studentId?: string;
    userId: string;
    timestamp?: admin.firestore.Timestamp;
    studentName: string;
    contactEmail: string;
    finalCost: number;
    discountIds: Array<string>;
    discounts: Array<{
        amount: number;
        description: string;
    }>;
    transactionId?: string;
    status: 'pending' | 'enrolled' | 'failed';
    failures?: Array<string>;
    isSignedUpForSolsticeEmails?: boolean;
    releaseSignatures?: Array<{
        name: string;
        signature: string;
    }>;
    additionalOptionIdsByClassId: Record<string, Array<string>>;
} & (
    | {
          /** @deprecated Only old records have unqualified classes */
          classIds: Array<string>;
      }
    | {
          classes: Array<{ id: string; semesterId: string }>;
      }
);

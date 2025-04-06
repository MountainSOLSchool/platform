export type SemesterEnrollment = {
    studentName: string;
    studentId: string;
    finalCost: number;
    transactionId: string;
    timestamp: { _seconds: number };
    discounts: Array<{ amount: number; description: string }>;
} & (
    | {
          /** @deprecated Only old records have unqualified classes */
          classIds: Array<string>;
      }
    | {
          classes: Array<{ id: string; semesterId: string }>;
      }
);

import { StudentForm } from './student-form.interface';

export interface Enrollment {
    selectedClasses: Array<{
        id: string;
        semesterId: string;
    }>;
    userCostsToSelectedClassIds: Record<string, number | undefined>;
    discountCodes: Array<string>;
    student: Partial<StudentForm> | undefined;
    releaseSignatures: Array<{ name: string; signature: string }>;
    isStudentNew: boolean | undefined;
    isSignedUpForSolsticeEmails: boolean;
}

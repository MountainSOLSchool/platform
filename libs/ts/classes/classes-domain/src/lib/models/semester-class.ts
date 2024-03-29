export interface SemesterClass {
    title: string;
    startMs: number;
    endMs: number;
    registrationEndMs: number;
    id: string;
    classType: string;
    gradeRangeStart: number;
    gradeRangeEnd: number;
    description: string;
    cost: number;
    paymentRange?: {
        lowest?: number;
        highest?: number;
    };
    location: string;
    instructors: Array<{
        firstName: string;
        lastName: string;
    }>;
    dailyTimes: string;
    weekday: string;
    thumbnailUrl: string;
    enrolledCount: number;
    live: boolean;
    pausedForEnrollment: boolean;
    // it's an array of Firestore.DocumentReference, but that can't class can't be imported here
    students: Array<unknown>;
    semesterId: string;
    forInformationOnly: boolean;
}

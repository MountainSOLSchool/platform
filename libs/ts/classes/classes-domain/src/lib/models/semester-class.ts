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
    studentIds: Array<string>;
    semesterId: string;
    forInformationOnly: boolean;
}

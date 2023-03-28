export interface SemesterClass {
    title: string;
    startMs: number;
    endMs: number;
    id: string;
    classType: string;
    gradeRangeStart: number;
    gradeRangeEnd: number;
    description: string;
    cost: number;
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
    students: Array<unknown>;
}

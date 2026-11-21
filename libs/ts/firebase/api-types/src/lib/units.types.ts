// fullUnitsAndPaths
export interface UnitSummary {
    id: string;
    name: string;
    description: string;
    category: string;
    isRepeatable: boolean;
    prereqUnitIds: Array<string>;
}

export interface PathSummary {
    id: string;
    name: string;
    description: string;
    /** The path's required units, in display order. */
    unitIds: Array<string>;
    electives: Array<{
        name: string;
        unitIds: Array<string>;
    }>;
}

export interface FullUnitsAndPathsResponse {
    paths: Array<PathSummary>;
    units: Record<string, UnitSummary>;
}

// getStudentCompletedUnits
export interface GetStudentCompletedUnitsRequest {
    studentId: string;
}

export interface GetStudentCompletedUnitsResponse {
    student: {
        /** The student's first name only. */
        name: string;
        /** Absent when the student has no completed units yet. */
        completed_units?: Array<string>;
    };
}

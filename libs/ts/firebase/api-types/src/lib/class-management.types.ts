/**
 * Class Management API Types
 *
 * Shared types for class CRUD operations between Angular frontend
 * and Firebase Cloud Functions backend.
 */

export interface AdditionalOptionInput {
    id: string;
    description: string;
    cost: number;
}

export interface CreateClassRequest {
    semesterId: string;
    name: string;
    description: string;
    classType: string;
    gradeRangeStart: number;
    gradeRangeEnd: number;
    cost: number;
    paymentRangeLowest?: number;
    paymentRangeHighest?: number;
    location: string;
    instructorIds: string[];
    weekday: string;
    dailyTimes: string;
    startDate: string;
    endDate: string;
    registrationEndDate: string;
    minStudentSize?: number;
    maxStudentSize?: number;
    thumbnailUrl?: string;
    live: boolean;
    forInformationOnly?: boolean;
    unitIds?: string[];
    ageGroup?: string;
    additionalOptions?: AdditionalOptionInput[];
}

export interface CreateClassResponse {
    success: boolean;
    classId: string;
}

export interface UpdateClassRequest {
    semesterId: string;
    classId: string;
    name: string;
    description: string;
    classType: string;
    gradeRangeStart: number;
    gradeRangeEnd: number;
    cost: number;
    paymentRangeLowest?: number;
    paymentRangeHighest?: number;
    location: string;
    instructorIds: string[];
    weekday: string;
    dailyTimes: string;
    startDate: string;
    endDate: string;
    registrationEndDate: string;
    minStudentSize?: number;
    maxStudentSize?: number;
    thumbnailUrl?: string;
    live: boolean;
    pausedForEnrollment?: boolean;
    forInformationOnly?: boolean;
    unitIds?: string[];
    ageGroup?: string;
    additionalOptions?: AdditionalOptionInput[];
}

export interface UpdateClassResponse {
    success: boolean;
}

export interface UploadClassImageRequest {
    semesterId: string;
    classId?: string;
    imageBase64: string;
    contentType: string;
}

export interface UploadClassImageResponse {
    success: boolean;
    url: string;
}

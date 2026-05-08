/**
 * Semester Enrollment Email Content API Types
 *
 * Shared types for the per-semester confirmation-email content block
 * that admins edit and the enrollment trigger renders.
 */

export interface GetSemesterEnrollmentEmailContentRequest {
    semesterId: string;
}

export interface GetSemesterEnrollmentEmailContentResponse {
    content: string | null;
}

export interface UpdateSemesterEnrollmentEmailContentRequest {
    semesterId: string;
    content: string;
}

export interface UpdateSemesterEnrollmentEmailContentResponse {
    success: boolean;
}

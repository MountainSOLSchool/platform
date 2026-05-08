/**
 * Semester Enrollment Email Content API Types
 *
 * Shared types for the per-semester confirmation-email content block
 * that admins edit and the enrollment trigger renders.
 */

export interface SemesterEmailAttachment {
    name: string;
    url: string;
    storagePath: string;
}

export interface GetSemesterEnrollmentEmailContentRequest {
    semesterId: string;
}

export interface GetSemesterEnrollmentEmailContentResponse {
    semesterName: string;
    content: string | null;
    attachments: Array<SemesterEmailAttachment>;
}

export interface UpdateSemesterEnrollmentEmailContentRequest {
    semesterId: string;
    content: string;
}

export interface UpdateSemesterEnrollmentEmailContentResponse {
    success: boolean;
}

export interface UploadSemesterEmailAttachmentRequest {
    semesterId: string;
    filename: string;
    fileBase64: string;
}

export interface UploadSemesterEmailAttachmentResponse {
    attachment: SemesterEmailAttachment;
    attachments: Array<SemesterEmailAttachment>;
}

export interface DeleteSemesterEmailAttachmentRequest {
    semesterId: string;
    storagePath: string;
}

export interface DeleteSemesterEmailAttachmentResponse {
    attachments: Array<SemesterEmailAttachment>;
}

export interface SendTestEnrollmentEmailRequest {
    semesterId: string;
}

export interface SendTestEnrollmentEmailResponse {
    success: boolean;
    mailDocId: string;
    sentTo: string;
}

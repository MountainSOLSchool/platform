export type EnrollmentMessageSeverity =
    | 'info'
    | 'warning'
    | 'success'
    | 'promotional';

export interface EnrollmentMessage {
    id: string;
    text: string;
    severity: EnrollmentMessageSeverity;
    active: boolean;
    startDate?: string;
    endDate?: string;
    sortOrder: number;
}

export interface GetEnrollmentMessagesResponse {
    messages: EnrollmentMessage[];
}

export interface GetEnrollmentMessagesAdminResponse {
    messages: EnrollmentMessage[];
}

export interface UpdateEnrollmentMessagesRequest {
    messages: EnrollmentMessage[];
}

export interface UpdateEnrollmentMessagesResponse {
    success: boolean;
}

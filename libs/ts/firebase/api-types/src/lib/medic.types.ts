export interface CreateMedicClassRequest {
    name: string;
    description: string;
    cost: number;
    minStudents: number;
    maxStudents: number;
    status: 'draft' | 'published';
}

export interface CreateMedicClassResponse {
    success: boolean;
    classId: string;
}

export interface UpdateMedicClassRequest {
    classId: string;
    name: string;
    description: string;
    cost: number;
    minStudents: number;
    maxStudents: number;
    status: 'draft' | 'published' | 'archived';
}

export interface UpdateMedicClassResponse {
    success: boolean;
}

export interface GetMedicClassesResponse {
    classes: Array<{
        id: string;
        name: string;
        description: string;
        cost: number;
        maxStudents: number;
        enrolledCount: number;
    }>;
}

export interface GetMedicClassesAdminResponse {
    classes: Array<{
        id: string;
        name: string;
        description: string;
        cost: number;
        minStudents: number;
        maxStudents: number;
        status: string;
        enrolledCount: number;
        createdAt: string;
        updatedAt: string;
    }>;
}

export interface MedicEnrollRequest {
    classId: string;
    studentName: string;
    studentEmail: string;
    paymentMethodNonce: string;
    deviceData: string;
    paymentMethodType: string;
}

export interface MedicEnrollResponse {
    success: boolean;
    enrollmentId?: string;
    transactionId?: string;
    error?: string;
}

export interface GetMedicEnrollmentsRequest {
    classId?: string;
}

export interface GetMedicEnrollmentsResponse {
    enrollments: Array<{
        id: string;
        classId: string;
        className: string;
        studentName: string;
        studentEmail: string;
        transactionId: string;
        amount: number;
        status: string;
        timestamp: string;
    }>;
}

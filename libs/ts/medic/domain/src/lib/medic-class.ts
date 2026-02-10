export interface MedicClass {
    id: string;
    name: string;
    description: string;
    cost: number;
    minStudents: number;
    maxStudents: number;
    status: MedicClassStatus;
    enrolledCount: number;
    createdAt: string;
    updatedAt: string;
}

export type MedicClassStatus = 'draft' | 'published' | 'archived';

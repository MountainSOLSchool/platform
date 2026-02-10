import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import admin from 'firebase-admin';

export interface GetClassForEditRequest {
    semesterId: string;
    classId: string;
}

export interface ClassForEdit {
    id: string;
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
    minStudentSize: number;
    maxStudentSize: number;
    live: boolean;
    pausedForEnrollment: boolean;
    forInformationOnly: boolean;
    thumbnailUrl?: string;
    unitIds?: string[];
    ageGroup?: string;
    additionalOptions?: Array<{
        id: string;
        description: string;
        cost: number;
    }>;
}

export interface GetClassForEditResponse {
    class: ClassForEdit;
}

export const getClassForEdit = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<GetClassForEditRequest>(async (request, response) => {
        const { semesterId, classId } = request.body.data;

        if (!semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }

        if (!classId) {
            response.status(400).send({ error: 'classId is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const classDoc = await db
            .doc(`semesters/${semesterId}/classes/${classId}`)
            .get();

        if (!classDoc.exists) {
            response.status(404).send({ error: 'Class not found' });
            return;
        }

        const data = classDoc.data()!;

        const instructorRefs =
            (data.instructors as admin.firestore.DocumentReference[]) || [];
        const instructorIds = instructorRefs.map((ref) => ref.id);

        const unitRefs =
            (data.units as admin.firestore.DocumentReference[]) || [];
        const unitIds = unitRefs.map((ref) => ref.id);

        const classForEdit: ClassForEdit = {
            id: classDoc.id,
            name: data.name || '',
            description: data.description || '',
            classType: data.class_type || '',
            gradeRangeStart: data.grade_range_start ?? 0,
            gradeRangeEnd: data.grade_range_end ?? 12,
            cost: Number(data.cost) || 0,
            paymentRangeLowest: data.payment_range_lowest,
            paymentRangeHighest: data.payment_range_highest,
            location: data.location || '',
            instructorIds,
            weekday: data.weekday || '',
            dailyTimes: data.daily_times || '',
            startDate: data.start?.toDate?.()?.toISOString() || '',
            endDate: data.end?.toDate?.()?.toISOString() || '',
            registrationEndDate:
                data.registration_end_date?.toDate?.()?.toISOString() || '',
            minStudentSize: data.min_student_size ?? 5,
            maxStudentSize: data.max_student_size ?? 12,
            live: data.live ?? false,
            pausedForEnrollment: data.paused_for_enrollment ?? false,
            forInformationOnly: data.for_information_only ?? false,
            thumbnailUrl: data.thumbnailUrl,
            unitIds: unitIds.length > 0 ? unitIds : undefined,
            ageGroup: data.age_group || undefined,
            additionalOptions: data.additional_options?.map(
                (opt: { id: string; description: string; cost: number }) => ({
                    id: opt.id,
                    description: opt.description,
                    cost: opt.cost,
                })
            ),
        };

        response.send({ class: classForEdit });
    });

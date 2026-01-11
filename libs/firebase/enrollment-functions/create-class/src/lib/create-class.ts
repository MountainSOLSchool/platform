import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import admin from 'firebase-admin';

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
}

export interface CreateClassResponse {
    success: boolean;
    classId: string;
}

export const createClass = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<CreateClassRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }

        // Full validation only required when publishing (live = true)
        if (data.live) {
            if (!data.name) {
                response.status(400).send({ error: 'name is required' });
                return;
            }

            if (!data.instructorIds || data.instructorIds.length === 0) {
                response
                    .status(400)
                    .send({ error: 'At least one instructor is required' });
                return;
            }
        }

        const db = DatabaseUtility.getDatabase();
        const classesCollection = db.collection(
            `semesters/${data.semesterId}/classes`
        );

        const instructorRefs = (data.instructorIds ?? []).map((id) =>
            db.doc(`teachers/${id}`)
        );

        const classDoc: Record<string, unknown> = {
            name: data.name || '',
            description: data.description || '',
            class_type: data.classType || '',
            grade_range_start: data.gradeRangeStart ?? 0,
            grade_range_end: data.gradeRangeEnd ?? 12,
            cost: data.cost ?? 0,
            location: data.location || '',
            instructors: instructorRefs,
            weekday: data.weekday || '',
            daily_times: data.dailyTimes || '',
            live: data.live ?? false,
            paused_for_enrollment: false,
            for_information_only: data.forInformationOnly ?? false,
            students: [],
            min_student_size: data.minStudentSize ?? 5,
            max_student_size: data.maxStudentSize ?? 12,
            thumbnailUrl: data.thumbnailUrl || '',
        };

        // Only set date fields if they have values
        if (data.startDate) {
            classDoc['start'] = admin.firestore.Timestamp.fromDate(
                new Date(data.startDate)
            );
        }
        if (data.endDate) {
            classDoc['end'] = admin.firestore.Timestamp.fromDate(
                new Date(data.endDate)
            );
        }
        if (data.registrationEndDate) {
            classDoc['registration_end_date'] = admin.firestore.Timestamp.fromDate(
                new Date(data.registrationEndDate)
            );
        }

        if (data.paymentRangeLowest && data.paymentRangeHighest) {
            classDoc['payment_range_lowest'] = data.paymentRangeLowest;
            classDoc['payment_range_highest'] = data.paymentRangeHighest;
        }

        if (data.unitIds && data.unitIds.length > 0) {
            const unitCollection = data.ageGroup
                ? `${data.ageGroup}_units`
                : 'units';
            classDoc['units'] = data.unitIds.map((id) =>
                db.doc(`${unitCollection}/${id}`)
            );
        }

        if (data.ageGroup) {
            classDoc['age_group'] = data.ageGroup;
        }

        const docRef = await classesCollection.add(classDoc);

        const result: CreateClassResponse = {
            success: true,
            classId: docRef.id,
        };

        response.send(result);
    });

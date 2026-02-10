import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import admin from 'firebase-admin';

export interface AdminClass {
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
    instructors: Array<{ id: string; firstName: string; lastName: string }>;
    weekday: string;
    dailyTimes: string;
    startDate: string;
    endDate: string;
    registrationEndDate: string;
    maxStudentSize: number;
    enrolledCount: number;
    live: boolean;
    pausedForEnrollment: boolean;
    forInformationOnly: boolean;
    thumbnailUrl?: string;
    additionalOptions?: Array<{
        id: string;
        description: string;
        cost: number;
    }>;
}

export interface GetClassesForAdminRequest {
    semesterId: string;
}

export interface GetClassesForAdminResponse {
    classes: AdminClass[];
}

export const getClassesForAdmin = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<GetClassesForAdminRequest>(async (request, response) => {
        const { semesterId } = request.body.data;

        if (!semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const classesSnapshot = await db
            .collection(`semesters/${semesterId}/classes`)
            .get();

        const classes: AdminClass[] = await Promise.all(
            classesSnapshot.docs.map(async (doc) => {
                const data = doc.data();

                const instructorRefs =
                    (data.instructors as admin.firestore.DocumentReference[]) ||
                    [];
                const instructors = await Promise.all(
                    instructorRefs.map(async (ref) => {
                        const instructorDoc = await ref.get();
                        const instructorData = instructorDoc.data();
                        return {
                            id: instructorDoc.id,
                            firstName: instructorData?.first_name || '',
                            lastName: instructorData?.last_name || '',
                        };
                    })
                );

                const studentRefs =
                    (data.students as admin.firestore.DocumentReference[]) ||
                    [];

                return {
                    id: doc.id,
                    name: data.name || '',
                    description: data.description || '',
                    classType: data.class_type || '',
                    gradeRangeStart: data.grade_range_start ?? 0,
                    gradeRangeEnd: data.grade_range_end ?? 12,
                    cost: Number(data.cost) || 0,
                    paymentRangeLowest: data.payment_range_lowest,
                    paymentRangeHighest: data.payment_range_highest,
                    location: data.location || '',
                    instructors,
                    weekday: data.weekday || '',
                    dailyTimes: data.daily_times || '',
                    startDate: data.start?.toDate?.()?.toISOString() || '',
                    endDate: data.end?.toDate?.()?.toISOString() || '',
                    registrationEndDate:
                        data.registration_end_date?.toDate?.()?.toISOString() ||
                        '',
                    maxStudentSize: data.max_student_size || 0,
                    enrolledCount: studentRefs.length,
                    live: data.live ?? false,
                    pausedForEnrollment: data.paused_for_enrollment ?? false,
                    forInformationOnly: data.for_information_only ?? false,
                    thumbnailUrl: data.thumbnailUrl,
                    additionalOptions: data.additional_options?.map(
                        (opt: {
                            id: string;
                            description: string;
                            cost: number;
                        }) => ({
                            id: opt.id,
                            description: opt.description,
                            cost: opt.cost,
                        })
                    ),
                };
            })
        );

        classes.sort((a, b) => a.name.localeCompare(b.name));

        response.send({ classes });
    });

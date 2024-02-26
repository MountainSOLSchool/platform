import { SemesterClass } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';
import { firestore } from 'firebase-admin';
import { FieldPath } from 'firebase-admin/firestore';

type ClassDbo = {
    id: string;
    description: string;
    live: boolean;
    cost: number;
    location: string;
    weekday: string;
    thumbnailUrl: string;
    payment_range_lowest?: number;
    payment_range_highest?: number;
    instructors: Array<firestore.DocumentReference>;
    students: Array<firestore.DocumentReference>;
    name: string;
    start: { _seconds: number };
    end: { _seconds: number };
    registration_end_date: { _seconds: number };
    class_type: string;
    grade_range_start: number;
    grade_range_end: number;
    paused_for_enrollment: boolean;
    daily_times: string;
    max_student_size: number;
};

export class NewClassRepository {
    protected constructor() {
        // empty protected constructor
    }

    static of(): NewClassRepository {
        return new NewClassRepository();
    }

    async get(
        id: string
    ): Promise<
        SemesterClass & { students: Array<firestore.DocumentReference> }
    > {
        const classesCollectionGroup =
            DatabaseUtility.getDatabase().collectionGroup('classes');
        const querySnapshot = await classesCollectionGroup
            .where(FieldPath.documentId(), '==', id)
            .get();
        const classDoc = querySnapshot.docs[0];
        const classData = classDoc.data() as ClassDbo;
        classData.id = classDoc.id;
        const pathSegments = classDoc.ref.path.split('/');
        const semesterId = pathSegments[pathSegments.indexOf('classes') - 1];
        return this.convertDboToDomain(classData, semesterId);
    }
    async getMany(ids: Array<string>): Promise<SemesterClass[]> {
        return await Promise.all(
            ids.map(async (id) => {
                return await this.get(id);
            })
        );
    }

    private async convertDboToDomain(
        dbo: ClassDbo,
        semesterId: string
    ): Promise<
        SemesterClass & { students: Array<firestore.DocumentReference> }
    > {
        const domain: Awaited<ReturnType<typeof this.convertDboToDomain>> = {
            title: dbo.name,
            startMs:
                typeof dbo !== 'string' &&
                typeof dbo.start === 'object' &&
                dbo.start &&
                '_seconds' in dbo.start
                    ? Number(dbo.start._seconds) * 1000
                    : 0,
            endMs:
                typeof dbo !== 'string' &&
                typeof dbo.end === 'object' &&
                dbo.end &&
                '_seconds' in dbo.end
                    ? Number(dbo.end._seconds) * 1000
                    : 0,
            registrationEndMs:
                typeof dbo !== 'string' &&
                typeof dbo.registration_end_date === 'object' &&
                dbo.registration_end_date &&
                '_seconds' in dbo.registration_end_date
                    ? Number(dbo.registration_end_date._seconds) * 1000
                    : 0,
            enrolledCount: Array.isArray(dbo.students)
                ? dbo.students?.length ?? 0
                : 0,
            id: dbo.id,
            classType: dbo.class_type,
            gradeRangeStart: dbo.grade_range_start,
            gradeRangeEnd: dbo.grade_range_end,
            description: dbo.description,
            live: dbo.live,
            cost: dbo.cost,
            location: dbo.location,
            instructors: (
                (await DatabaseUtility.getHydratedDocuments(
                    dbo.instructors as unknown as Array<firestore.DocumentReference>
                )) as Array<{
                    id: string;
                    first_name: string;
                    last_name: string;
                }>
            ).map((instructor) => ({
                ...instructor,
                firstName: instructor.first_name,
                lastName: instructor.last_name,
            })),
            dailyTimes: dbo.daily_times,
            weekday: dbo.weekday,
            thumbnailUrl: dbo.thumbnailUrl,
            students: dbo.students,
            pausedForEnrollment: dbo.max_student_size
                ? dbo.students.length > dbo.max_student_size
                : false,
            semesterId,
        };

        if (!!dbo.payment_range_lowest || !!dbo.payment_range_highest) {
            domain.paymentRange = {
                lowest: dbo.payment_range_lowest,
                highest: dbo.payment_range_highest,
            };
        }
        return domain;
    }
}

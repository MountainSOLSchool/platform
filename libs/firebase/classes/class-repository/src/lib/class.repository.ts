import { SemesterClass } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';
import { SemesterRepository } from './semester.repository';
import { firestore } from 'firebase-admin';

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
    units?: Array<firestore.DocumentReference>;
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
    for_information_only?: boolean;
};

export class ClassRepository {
    protected constructor(private readonly semester: SemesterRepository) {}
    static of(semester: SemesterRepository): ClassRepository {
        return new ClassRepository(semester);
    }

    private async getClassesPath(): Promise<string> {
        return `${await this.semester.getPath()}/classes`;
    }
    async get(id: string): Promise<SemesterClass> {
        const document = await DatabaseUtility.getDocumentRef(
            `${await this.getClassesPath()}/${id}`
        );
        const [data] = await DatabaseUtility.getHydratedDocuments([document]);
        return await this.convertDboToDomain(data as ClassDbo);
    }
    async getMany(ids: Array<string>): Promise<SemesterClass[]> {
        return await Promise.all(
            ids.map(async (id) => {
                return await this.get(id);
            })
        );
    }

    async getOpenForRegistration(): Promise<SemesterClass[]> {
        const now = new Date(Date.now());
        const query = await DatabaseUtility.fetchMatchingDocuments(
            await DatabaseUtility.getCollectionRef(await this.getClassesPath()),
            ['registration_end_date', '>=', now],
            ['live', '==', true]
        );
        const classIds = query.map((doc) => doc.id);
        return await this.getMany(classIds);
    }

    async getAll(): Promise<SemesterClass[]> {
        const query = await DatabaseUtility.fetchMatchingDocuments(
            await DatabaseUtility.getCollectionRef(await this.getClassesPath()),
            ['live', '==', true]
        );
        const classIds = query.map((doc) => doc.id);
        return await this.getMany(classIds);
    }

    private async convertDboToDomain(dbo: ClassDbo): Promise<SemesterClass> {
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
            studentIds: dbo.students.map((ref) => ref.id),
            pausedForEnrollment: dbo.max_student_size
                ? dbo.students.length > dbo.max_student_size
                : false,
            semesterId: await this.semester.getId(),
            forInformationOnly: dbo.for_information_only ?? false,
            unitIds: dbo.units?.map((ref) => ref.id),
        };

        if (!!dbo.payment_range_lowest || !!dbo.payment_range_highest) {
            domain.paymentRange = {
                lowest: dbo.payment_range_lowest,
                highest: dbo.payment_range_highest,
            };
        }
        return domain;
    }

    async addStudentToClass(studentId: string, classId: string): Promise<void> {
        const classRef = await DatabaseUtility.getDocumentRef(
            `${await this.getClassesPath()}/${classId}`
        );
        const studentRef = await DatabaseUtility.getDocumentRef(
            `students/${studentId}`
        );
        const enrolledStudents =
            ((await classRef.get()).data()?.students as Array<
                firestore.DocumentReference<firestore.DocumentData>
            >) ?? [];
        if (
            !enrolledStudents
                ?.map((ref) => ref.id)
                .find((s) => s === studentRef.id)
        ) {
            await classRef.update({
                students: [...enrolledStudents, studentRef],
            });
        }
    }
}

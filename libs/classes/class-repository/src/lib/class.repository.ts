import { SemesterClass } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';

export class ClassRepository {
    protected constructor(private readonly semesterId: string) {}
    static of(semesterId: string): ClassRepository {
        return new ClassRepository(semesterId);
    }

    private get classesPath(): string {
        return `semesters/${this.semesterId}/classes`;
    }
    async get(id: string): Promise<SemesterClass> {
        const document = await DatabaseUtility.getDocumentRef(
            `${this.classesPath}/${id}`
        );
        const [data] = await DatabaseUtility.getHydratedDocuments([document]);
        return await this.convertDboToDomain(data);
    }

    async getMany(ids: Array<string>): Promise<SemesterClass[]> {
        return await Promise.all(
            ids.map(async (id) => {
                return await this.get(id);
            })
        );
    }

    async getByStartsAtOrAfter(startsAt: number): Promise<SemesterClass[]> {
        const query = await DatabaseUtility.fetchMatchingDocuments(
            await DatabaseUtility.getCollectionRef(this.classesPath),
            ['start', '>=', new Date(startsAt)],
            ['live', '==', true]
        );
        const classIds = query.map((doc) => doc.id);
        return await this.getMany(classIds);
    }

    private async convertDboToDomain(dbo: any): Promise<SemesterClass> {
        return {
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
                    dbo.instructors as unknown as Array<FirebaseFirestore.DocumentReference>
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
        };
    }

    async addStudentToClass(studentId: string, classId: string): Promise<void> {
        const classRef = await DatabaseUtility.getDocumentRef(
            `${this.classesPath}/${classId}`
        );
        const studentRef = await DatabaseUtility.getDocumentRef(
            `students/${studentId}`
        );
        const enrolledStudents =
            ((await classRef.get()).data()?.students as Array<
                FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
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

import { V1DatabaseUtility } from '@sol/firebase/database';
import { NewStudentDbEntry, StudentDbEntry } from '@sol/student/domain';
import { V1ClassRepository, SemesterRepository } from '@sol/classes/repository';
import { DocumentReference, DocumentData } from 'firebase-admin/firestore';

export class V1StudentRepository {
    protected constructor(private readonly semester: SemesterRepository) {}
    static of(semester: SemesterRepository): V1StudentRepository {
        return new V1StudentRepository(semester);
    }
    static async fetchMatchingStudent({
        firstName,
        lastName,
        birthDate,
    }: {
        firstName: string;
        lastName: string;
        birthDate: string;
    }): Promise<StudentDbEntry | undefined> {
        const studentRef = await this.fetchMatchingStudentRef({
            firstName,
            lastName,
            birthDate,
        });

        return studentRef
            ? (
                  await V1DatabaseUtility.getHydratedDocuments<StudentDbEntry>([
                      studentRef,
                  ])
              )[0]
            : undefined;
    }

    static async fetchMatchingStudentRef({
        firstName,
        lastName,
        birthDate,
    }: {
        firstName: string;
        lastName: string;
        birthDate: string;
    }): Promise<DocumentReference<DocumentData> | undefined> {
        const students = this.database.collection('students');

        return (
            await V1DatabaseUtility.fetchFirstMatchingDocument(
                students,
                ['first_name', '==', firstName],
                ['last_name', '==', lastName],
                ['birth_date', '==', birthDate]
            )
        )?.ref;
    }

    static async get(id: string): Promise<StudentDbEntry | undefined> {
        return (
            await V1DatabaseUtility.getHydratedDocuments<StudentDbEntry>([
                this.database.collection('students').doc(id),
            ])
        )[0];
    }

    static async create(
        student: NewStudentDbEntry
    ): Promise<DocumentReference> {
        return await this.database.collection('students').add(student);
    }

    static async update(student: StudentDbEntry): Promise<DocumentReference> {
        await this.database
            .collection('students')
            .doc(student.id)
            .update(student);
        return this.database.collection('students').doc(student.id);
    }

    private static get database() {
        return V1DatabaseUtility.getDatabase();
    }

    async getAll(): Promise<Array<StudentDbEntry>> {
        const allClasses = await V1ClassRepository.of(this.semester).getAll();
        const allStudentsFromAllClassesRefs = allClasses.map(
            (theClass) => theClass.students as Array<DocumentReference>
        );
        const allStudentsFromEachClassInSemester = await Promise.all(
            allStudentsFromAllClassesRefs.map((studentRefs) =>
                V1DatabaseUtility.getHydratedDocuments<StudentDbEntry>(
                    studentRefs
                )
            )
        );
        const uniqueStudentsById: Map<string, StudentDbEntry> =
            allStudentsFromEachClassInSemester
                .reduce((acc, curr) => [...acc, ...curr], [])
                .reduce(
                    (unique, student) => unique.set(student.id, student),
                    new Map<string, StudentDbEntry>()
                );
        return Array.from(uniqueStudentsById.values());
    }

    async getInClass(classId: string): Promise<Array<StudentDbEntry>> {
        const theClass = await V1ClassRepository.of(this.semester).get(classId);

        const classStudentRefs = theClass.students ?? [];

        return await V1DatabaseUtility.getHydratedDocuments<StudentDbEntry>(
            classStudentRefs
        );
    }
}

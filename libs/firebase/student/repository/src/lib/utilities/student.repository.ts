import { DatabaseUtility } from '@sol/firebase/database';
import { NewStudentDbEntry, StudentDbEntry } from '@sol/student/domain';
import { ClassRepository, SemesterRepository } from '@sol/classes/repository';
import { DocumentReference, DocumentData } from 'firebase-admin/firestore';

export class StudentRepository {
    protected constructor(private readonly semester: SemesterRepository) {}
    static of(semester: SemesterRepository): StudentRepository {
        return new StudentRepository(semester);
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
                  await DatabaseUtility.getHydratedDocuments<StudentDbEntry>([
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
            await DatabaseUtility.fetchFirstMatchingDocument(
                students,
                ['first_name', '==', firstName],
                ['last_name', '==', lastName],
                ['birth_date', '==', birthDate]
            )
        )?.ref;
    }

    static async get(id: string): Promise<StudentDbEntry | undefined> {
        return (
            await DatabaseUtility.getHydratedDocuments<StudentDbEntry>([
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
        return DatabaseUtility.getDatabase();
    }

    async getAll(): Promise<Array<StudentDbEntry>> {
        const allClasses = await ClassRepository.of(this.semester).getAll();
        const allStudentsFromAllClassesRefs = allClasses.map(
            (theClass) => theClass.students as Array<DocumentReference>
        );
        const allStudentsFromEachClassInSemester = await Promise.all(
            allStudentsFromAllClassesRefs.map((studentRefs) =>
                DatabaseUtility.getHydratedDocuments<StudentDbEntry>(
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
        const theClass = await ClassRepository.of(this.semester).get(classId);

        const classStudentRefs = theClass.students ?? [];

        return await DatabaseUtility.getHydratedDocuments<StudentDbEntry>(
            classStudentRefs
        );
    }

    static async allStudentsOfAllTime(): Promise<Array<StudentDbEntry>> {
        const studentsCollection = this.database.collection('students');

        const studentDocuments = await studentsCollection.listDocuments();

        return await DatabaseUtility.getHydratedDocuments(studentDocuments);
    }
}

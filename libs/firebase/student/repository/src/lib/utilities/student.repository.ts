import { DatabaseUtility } from '@sol/firebase/database';
import * as admin from 'firebase-admin';
import { NewStudentDbEntry, StudentDbEntry } from '@sol/student/domain';
import { firestore } from 'firebase-admin';
import DocumentReference = firestore.DocumentReference;
import { ClassRepository } from '@sol/classes/repository';

export class StudentRepository {
    protected constructor(private readonly semesterId: string) {}
    static of(semesterId: string): StudentRepository {
        return new StudentRepository(semesterId);
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
    }): Promise<
        | admin.firestore.DocumentReference<admin.firestore.DocumentData>
        | undefined
    > {
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

    static async create(
        student: NewStudentDbEntry
    ): Promise<DocumentReference> {
        return await this.database.collection('students').add(student);
    }

    private static get database(): FirebaseFirestore.Firestore {
        return DatabaseUtility.getDatabase();
    }

    async getEnrolled(classId?: string): Promise<Array<StudentDbEntry>> {
        let students: Array<StudentDbEntry> = [];
        if (classId) {
            const theClass = await ClassRepository.of(this.semesterId).get(
                classId
            );

            const classStudentRefs = theClass.students ?? [];

            students =
                await DatabaseUtility.getHydratedDocuments<StudentDbEntry>(
                    classStudentRefs
                );
        } else {
            const allClasses = await ClassRepository.of(
                this.semesterId
            ).getAll();
            const allStudentsFromAllClassesRefs = allClasses.map(
                (theClass) => theClass.students
            );
            const allStudentsFromEachClassInSemester = await Promise.all(
                allStudentsFromAllClassesRefs.map((studentRefs) =>
                    DatabaseUtility.getHydratedDocuments<StudentDbEntry>(
                        studentRefs as any
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
            students = Array.from(uniqueStudentsById.values());
        }

        return students;
    }
}

import { DatabaseUtility } from '@sol/firebase/database';
import * as admin from 'firebase-admin';
import { NewStudentDbEntry, StudentDbEntry } from '@sol/student/domain';
import { firestore } from 'firebase-admin';
import DocumentReference = firestore.DocumentReference;
import { SUMMER_2023_SEMESTER } from '@sol/classes/repository';

export class StudentRepository {
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

    static async fetchStudents(
        className?: string
    ): Promise<Array<StudentDbEntry>> {
        let students: Array<StudentDbEntry>;
        if (className) {
            const classes = this.database.collection(SUMMER_2023_SEMESTER);

            const classDocument =
                await DatabaseUtility.fetchFirstMatchingDocument(classes, [
                    'name',
                    '==',
                    className,
                ]);

            const classStudentRefs: Array<FirebaseFirestore.DocumentReference> =
                classDocument?.get('students') ?? [];

            students =
                await DatabaseUtility.getHydratedDocuments<StudentDbEntry>(
                    classStudentRefs
                );
        } else {
            const { students: hydratedStudents } =
                await DatabaseUtility.getHydratedCollection(
                    this.database.collection('students')
                );
            students = hydratedStudents.map(
                (doc) => doc as unknown as StudentDbEntry
            );
        }

        return students;
    }

    static async create(
        student: NewStudentDbEntry
    ): Promise<DocumentReference> {
        return await this.database.collection('students').add(student);
    }

    private static get database(): FirebaseFirestore.Firestore {
        return DatabaseUtility.getDatabase();
    }
}
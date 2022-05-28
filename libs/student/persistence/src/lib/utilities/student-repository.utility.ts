import { DatabaseUtility } from '@sol/firebase/database';
import * as admin from 'firebase-admin';
import { StudentDbEntry } from '@sol/student/domain';

export class StudentRepositoryUtility {
    constructor(private readonly database: admin.firestore.Firestore) {}

    public async updateStudents(
        students: Array<StudentDbEntry>
    ): Promise<void> {
        this.database;
    }

    public async fetchMatchingStudent({
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

    public async fetchMatchingStudentRef({
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

    public async fetchStudents(
        className: string
    ): Promise<Array<StudentDbEntry>> {
        const classes = this.database.collection('classes');

        const classDocument = await DatabaseUtility.fetchFirstMatchingDocument(
            classes,
            ['name', '==', className]
        );

        const classStudentRefs: Array<FirebaseFirestore.DocumentReference> =
            classDocument?.get('students') ?? [];

        const students =
            await DatabaseUtility.getHydratedDocuments<StudentDbEntry>(
                classStudentRefs
            );

        return students;
    }
}

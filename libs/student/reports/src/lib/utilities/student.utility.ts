import { DatabaseUtility } from '@sol/firebase/database';
import * as admin from 'firebase-admin';
import { StudentDbEntry } from '@sol/student/domain';

export class StudentUtility {
    constructor(private readonly database: admin.firestore.Firestore) {}

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

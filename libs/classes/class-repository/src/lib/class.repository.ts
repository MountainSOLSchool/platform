import { Class } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';

export class ClassRepository {
    static async get(id: string): Promise<Class> {
        const document = await DatabaseUtility.getDocumentRef(`classes/${id}`);
        const [data] = await DatabaseUtility.getHydratedDocuments([document]);
        return data as Class;
    }

    static async addStudentToClass(
        studentId: string,
        classId: string
    ): Promise<void> {
        const classRef = await DatabaseUtility.getDocumentRef(
            `classes/${classId}`
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

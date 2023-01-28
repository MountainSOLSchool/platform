import { Class } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';
import { CLASSES_SUMMER_2023_COLLECTION } from './constants';

export class ClassRepository {
    static async get(id: string): Promise<Class> {
        const document = await DatabaseUtility.getDocumentRef(
            `${CLASSES_SUMMER_2023_COLLECTION}/${id}`
        );
        const [data] = await DatabaseUtility.getHydratedDocuments([document]);
        return data as Class;
    }

    static async getAll(ids: Array<string>): Promise<Class[]> {
        return await Promise.all(
            ids.map(async (id) => {
                return await this.get(id);
            })
        );
    }

    static async addStudentToClass(
        studentId: string,
        classId: string
    ): Promise<void> {
        const classRef = await DatabaseUtility.getDocumentRef(
            `${CLASSES_SUMMER_2023_COLLECTION}/${classId}`
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

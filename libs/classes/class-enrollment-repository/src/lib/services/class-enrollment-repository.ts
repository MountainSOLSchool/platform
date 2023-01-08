import { ClassEnrollmentDbo } from '../models/db/class-enrollment.dbo';
import { DatabaseUtility } from '@sol/firebase/database';

export class ClassEnrollmentRepository {
    static async create(enrollment: ClassEnrollmentDbo): Promise<string> {
        const { id } = await this.database
            .collection('enrollment')
            .add({ ...enrollment, timestamp: new Date() });
        return id;
    }

    private static get database(): FirebaseFirestore.Firestore {
        return DatabaseUtility.getDatabase();
    }
}

import { ClassEnrollmentDbo } from '../models/db/class-enrollment.dbo';
import { DatabaseUtility } from '@sol/firebase/database';
import { AuthUtility } from '@sol/firebase/functions';
import * as functions from 'firebase-functions';

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

    static async getCurrentUserCompletedEnrollments(
        request: functions.https.Request,
        response: functions.Response
    ): Promise<Array<ClassEnrollmentDbo>> {
        const user = await AuthUtility.getUserFromRequest(request, response);
        if (!user) {
            return [];
        }
        // load enrollments from database with userId matching uid
        return await this.database
            .collection('enrollment')
            .where('userId', '==', user.uid)
            .where('status', '==', 'enrolled')
            .get()
            .then((snapshot) => {
                return snapshot.docs.map(
                    (doc) => doc.data() as ClassEnrollmentDbo
                );
            });
    }
}

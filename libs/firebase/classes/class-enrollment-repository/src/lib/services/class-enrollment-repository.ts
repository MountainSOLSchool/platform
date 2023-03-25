import { ClassEnrollmentDbo } from '../models/db/class-enrollment.dbo';
import { DatabaseUtility } from '@sol/firebase/database';
import { AuthUtility } from '@sol/firebase/functions';
import * as functions from 'firebase-functions';
import { SemesterEnrollment } from '@sol/classes/domain';

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
    ): Promise<Array<SemesterEnrollment>> {
        const user = await AuthUtility.getUserFromRequest(request, response);
        if (!user) {
            return [];
        }
        // load enrollments from database with userId matching uid
        const snapshot = await this.database
            .collection('enrollment')
            .where('userId', '==', user.uid)
            .where('status', '==', 'enrolled')
            .get();
        return await Promise.all(
            snapshot.docs.map(async (doc) => {
                const dbo = doc.data();
                return {
                    studentName: dbo.studentName,
                    finalCost: dbo.finalCost,
                    classIds: dbo.classIds,
                    transactionId: dbo.transactionId,
                    timestamp: dbo.timestamp,
                };
            })
        );
    }
}
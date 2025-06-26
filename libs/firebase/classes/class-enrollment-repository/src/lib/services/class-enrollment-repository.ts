import { ClassEnrollmentDbo } from '../models/db/class-enrollment.dbo';
import { DatabaseUtility } from '@sol/firebase/database';
import { AuthUtility } from '@sol/firebase/functions';
import { type Firestore } from 'firebase-admin/firestore';
import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';
import { SemesterEnrollment } from '@sol/classes/domain';

export class ClassEnrollmentRepository {
    static async create(enrollment: ClassEnrollmentDbo): Promise<string> {
        const { id } = await this.database
            .collection('enrollment')
            .add({ ...enrollment, timestamp: new Date() });
        return id;
    }

    private static get database(): Firestore {
        return DatabaseUtility.getDatabase();
    }

    /**
     * Get the most recent enrolled enrollment for a specific student
     */
    static async getLatestEnrolledByStudentId(
        studentId: string
    ): Promise<ClassEnrollmentDbo | null> {
        const snapshot = await this.database
            .collection('enrollment')
            .where('studentId', '==', studentId)
            .where('status', '==', 'enrolled')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get();

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        return doc.data() as ClassEnrollmentDbo;
    }

    static async getCurrentSemesterEnrollments(): Promise<
        Array<SemesterEnrollment>
    > {
        const snapshot = await this.database
            .collection('enrollment')
            .where('status', '==', 'enrolled')
            .get();
        return await Promise.all(
            snapshot.docs.map(async (doc) => {
                const dbo = doc.data();
                return {
                    studentName: dbo.studentName,
                    studentId: dbo.studentId,
                    finalCost: dbo.finalCost,
                    classIds: dbo.classIds,
                    classes: dbo.classes,
                    transactionId: dbo.transactionId,
                    timestamp: dbo.timestamp,
                    discounts: dbo.discounts,
                };
            })
        );
    }

    static async getCurrentUserCompletedEnrollments(
        request: Request,
        response: express.Response
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
                    studentId: dbo.studentId,
                    finalCost: dbo.finalCost,
                    classIds: dbo.classIds,
                    classes: dbo.classes,
                    transactionId: dbo.transactionId,
                    timestamp: dbo.timestamp,
                    discounts: dbo.discounts,
                };
            })
        );
    }
}

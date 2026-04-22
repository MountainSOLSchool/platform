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

    static async getById(
        enrollmentId: string
    ): Promise<(ClassEnrollmentDbo & { id: string }) | null> {
        const doc = await this.database
            .collection('enrollment')
            .doc(enrollmentId)
            .get();
        if (!doc.exists) {
            return null;
        }
        return { ...(doc.data() as ClassEnrollmentDbo), id: doc.id };
    }

    static async getAddendumsByOriginalId(
        originalEnrollmentId: string
    ): Promise<Array<ClassEnrollmentDbo>> {
        const snapshot = await this.database
            .collection('enrollment')
            .where('originalEnrollmentId', '==', originalEnrollmentId)
            .where('status', '==', 'enrolled')
            .get();
        return snapshot.docs.map(
            (doc) => ({ ...(doc.data() as ClassEnrollmentDbo), id: doc.id })
        );
    }

    static async updateStatus(
        enrollmentId: string,
        status: ClassEnrollmentDbo['status']
    ): Promise<void> {
        await this.database
            .collection('enrollment')
            .doc(enrollmentId)
            .update({ status });
    }

    static async getCurrentSemesterEnrollments(): Promise<
        Array<SemesterEnrollment>
    > {
        const snapshot = await this.database
            .collection('enrollment')
            .where('status', 'in', ['enrolled', 'revoked'])
            .get();
        return await Promise.all(
            snapshot.docs.map(async (doc) => {
                const dbo = doc.data();
                return {
                    id: doc.id,
                    studentName: dbo.studentName,
                    studentId: dbo.studentId,
                    finalCost: dbo.finalCost,
                    classIds: dbo.classIds,
                    classes: dbo.classes,
                    transactionId: dbo.transactionId,
                    timestamp: dbo.timestamp,
                    discounts: dbo.discounts,
                    status: dbo.status,
                    enrollmentType: dbo.enrollmentType,
                    originalEnrollmentId: dbo.originalEnrollmentId,
                    additionalOptionIdsByClassId:
                        dbo.additionalOptionIdsByClassId,
                };
            })
        );
    }

    static async getEnrollmentsForStudents(
        studentIds: string[]
    ): Promise<Array<SemesterEnrollment>> {
        if (studentIds.length === 0) {
            return [];
        }

        // Firestore 'in' queries are limited to 30 items
        const chunks: string[][] = [];
        for (let i = 0; i < studentIds.length; i += 30) {
            chunks.push(studentIds.slice(i, i + 30));
        }

        const results: SemesterEnrollment[] = [];
        for (const chunk of chunks) {
            const snapshot = await this.database
                .collection('enrollment')
                .where('studentId', 'in', chunk)
                .where('status', '==', 'enrolled')
                .get();

            for (const doc of snapshot.docs) {
                const dbo = doc.data();
                results.push({
                    id: doc.id,
                    studentName: dbo.studentName,
                    studentId: dbo.studentId,
                    finalCost: dbo.finalCost,
                    classIds: dbo.classIds,
                    classes: dbo.classes,
                    transactionId: dbo.transactionId,
                    timestamp: dbo.timestamp,
                    discounts: dbo.discounts,
                    enrollmentType: dbo.enrollmentType,
                    originalEnrollmentId: dbo.originalEnrollmentId,
                    additionalOptionIdsByClassId:
                        dbo.additionalOptionIdsByClassId,
                });
            }
        }

        return results;
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
                    id: doc.id,
                    studentName: dbo.studentName,
                    studentId: dbo.studentId,
                    finalCost: dbo.finalCost,
                    classIds: dbo.classIds,
                    classes: dbo.classes,
                    transactionId: dbo.transactionId,
                    timestamp: dbo.timestamp,
                    discounts: dbo.discounts,
                    enrollmentType: dbo.enrollmentType,
                    originalEnrollmentId: dbo.originalEnrollmentId,
                    additionalOptionIdsByClassId:
                        dbo.additionalOptionIdsByClassId,
                };
            })
        );
    }
}

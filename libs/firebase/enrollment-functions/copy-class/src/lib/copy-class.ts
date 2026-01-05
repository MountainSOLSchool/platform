import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import admin from 'firebase-admin';

interface CopyClassRequest {
    classId: string;
    sourceSemesterId: string;
    targetSemesterId: string;
    newSemesterName?: string;
}

interface CopyClassResponse {
    newClassId: string;
    targetSemesterId: string;
}

export const copyClass = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<CopyClassRequest>(async (request, response) => {
        const { classId, sourceSemesterId, targetSemesterId, newSemesterName } =
            request.body.data;

        if (!classId || !sourceSemesterId || !targetSemesterId) {
            response.status(400).send({
                error: 'Missing required fields: classId, sourceSemesterId, targetSemesterId',
            });
            return;
        }

        const db = DatabaseUtility.getDatabase();

        let finalTargetSemesterId = targetSemesterId;

        if (targetSemesterId === 'new') {
            if (!newSemesterName) {
                response.status(400).send({
                    error: 'newSemesterName is required when targetSemesterId is "new"',
                });
                return;
            }

            const newSemesterRef = db.collection('semesters').doc();
            await newSemesterRef.set({
                displayName: newSemesterName,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            finalTargetSemesterId = newSemesterRef.id;
        }

        const sourceClassRef = db.doc(
            `semesters/${sourceSemesterId}/classes/${classId}`
        );
        const sourceClassDoc = await sourceClassRef.get();

        if (!sourceClassDoc.exists) {
            response.status(404).send({
                error: `Class ${classId} not found in semester ${sourceSemesterId}`,
            });
            return;
        }

        const sourceClassData = sourceClassDoc.data();
        if (!sourceClassData) {
            response.status(404).send({
                error: `Class ${classId} has no data`,
            });
            return;
        }

        const newClassRef = db
            .collection(`semesters/${finalTargetSemesterId}/classes`)
            .doc();

        const newClassData = {
            ...sourceClassData,
            name: `Copy of ${sourceClassData.name}`,
            live: false,
            students: [],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        await newClassRef.set(newClassData);

        const sourceAdditionalOptionsRef = sourceClassRef.collection(
            'additional_options'
        );
        const additionalOptionsSnapshot = await sourceAdditionalOptionsRef.get();

        if (!additionalOptionsSnapshot.empty) {
            const batch = db.batch();
            additionalOptionsSnapshot.docs.forEach((doc) => {
                const optionData = doc.data();
                const newOptionRef = newClassRef
                    .collection('additional_options')
                    .doc(doc.id);
                batch.set(newOptionRef, {
                    ...optionData,
                    students: [],
                });
            });
            await batch.commit();
        }

        const result: CopyClassResponse = {
            newClassId: newClassRef.id,
            targetSemesterId: finalTargetSemesterId,
        };

        response.send(result);
    });

import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import admin from 'firebase-admin';

export interface CopyClassRequest {
    sourceClassId: string;
    sourceSemesterId: string;
    targetSemesterId?: string;
    newSemesterName?: string;
}

export interface CopyClassResponse {
    success: boolean;
    classId: string;
    semesterId: string;
}

export const copyClass = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<CopyClassRequest>(async (request, response) => {
        const { sourceClassId, sourceSemesterId, targetSemesterId, newSemesterName } =
            request.body.data;

        if (!sourceClassId) {
            response.status(400).send({ error: 'sourceClassId is required' });
            return;
        }

        if (!sourceSemesterId) {
            response.status(400).send({ error: 'sourceSemesterId is required' });
            return;
        }

        if (!targetSemesterId && !newSemesterName) {
            response
                .status(400)
                .send({ error: 'Either targetSemesterId or newSemesterName is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();

        // Get the source class
        const sourceClassDoc = await db
            .doc(`semesters/${sourceSemesterId}/classes/${sourceClassId}`)
            .get();

        if (!sourceClassDoc.exists) {
            response.status(404).send({ error: 'Source class not found' });
            return;
        }

        const sourceData = sourceClassDoc.data()!;

        // Determine target semester ID
        let finalTargetSemesterId = targetSemesterId;

        if (newSemesterName) {
            // Create a new semester
            const semestersCollection = db.collection('semesters');
            const newSemesterRef = await semestersCollection.add({
                displayName: newSemesterName.trim(),
            });
            finalTargetSemesterId = newSemesterRef.id;
        }

        // Verify target semester exists (if using existing semester)
        if (targetSemesterId) {
            const targetSemesterDoc = await db
                .doc(`semesters/${targetSemesterId}`)
                .get();
            if (!targetSemesterDoc.exists) {
                response.status(404).send({ error: 'Target semester not found' });
                return;
            }
        }

        // Create the copy with modified properties
        const targetClassesCollection = db.collection(
            `semesters/${finalTargetSemesterId}/classes`
        );

        const copiedClassDoc: Record<string, unknown> = {
            ...sourceData,
            name: `Copy of ${sourceData.name || 'Untitled'}`,
            live: false,
            paused_for_enrollment: false,
            students: [],
        };

        // Remove the id field if it exists (Firestore will generate a new one)
        delete copiedClassDoc['id'];

        // Copy additional_options but without enrolled students
        if (sourceData.additional_options) {
            copiedClassDoc['additional_options'] = sourceData.additional_options.map(
                (option: { id: string; description: string; cost: number }) => ({
                    id: option.id,
                    description: option.description,
                    cost: option.cost,
                    students: [],
                })
            );
        }

        const newClassRef = await targetClassesCollection.add(copiedClassDoc);

        const result: CopyClassResponse = {
            success: true,
            classId: newClassRef.id,
            semesterId: finalTargetSemesterId!,
        };

        response.send(result);
    });

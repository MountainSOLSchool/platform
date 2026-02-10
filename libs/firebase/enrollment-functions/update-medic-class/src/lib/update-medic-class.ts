import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import admin from 'firebase-admin';
import type { UpdateMedicClassRequest, UpdateMedicClassResponse } from '@sol/ts/firebase/api-types';

export const updateMedicClass = Functions.endpoint
    .restrictedToRoles(Role.MedicAdmin)
    .handle<UpdateMedicClassRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.classId) {
            response.status(400).send({ error: 'classId is required' });
            return;
        }

        if (!data.name?.trim()) {
            response.status(400).send({ error: 'Class name is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const classRef = db.collection('medic_classes').doc(data.classId);

        const existing = await classRef.get();
        if (!existing.exists) {
            response.status(404).send({ error: 'Class not found' });
            return;
        }

        await classRef.update({
            name: data.name.trim(),
            description: data.description || '',
            cost: data.cost,
            minStudents: data.minStudents ?? 1,
            maxStudents: data.maxStudents ?? 20,
            status: data.status,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        const result: UpdateMedicClassResponse = { success: true };
        response.send(result);
    });

import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import admin from 'firebase-admin';
import type { CreateMedicClassRequest, CreateMedicClassResponse } from '@sol/ts/firebase/api-types';

export const createMedicClass = Functions.endpoint
    .restrictedToRoles(Role.MedicAdmin)
    .handle<CreateMedicClassRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.name?.trim()) {
            response.status(400).send({ error: 'Class name is required' });
            return;
        }

        if (!data.cost || data.cost <= 0) {
            response.status(400).send({ error: 'Cost must be greater than 0' });
            return;
        }

        const db = DatabaseUtility.getDatabase();

        const classDoc = {
            name: data.name.trim(),
            description: data.description || '',
            cost: data.cost,
            minStudents: data.minStudents ?? 1,
            maxStudents: data.maxStudents ?? 20,
            location: data.location || '',
            date: data.date || '',
            time: data.time || '',
            status: data.status || 'draft',
            enrolledCount: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        const docRef = await db.collection('medic_classes').add(classDoc);

        const result: CreateMedicClassResponse = {
            success: true,
            classId: docRef.id,
        };

        response.send(result);
    });

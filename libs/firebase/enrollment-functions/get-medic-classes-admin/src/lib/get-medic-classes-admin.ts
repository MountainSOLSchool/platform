import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type { GetMedicClassesAdminResponse } from '@sol/ts/firebase/api-types';

export const getMedicClassesAdmin = Functions.endpoint
    .restrictedToRoles(Role.MedicAdmin)
    .handle(async (request, response) => {
        const db = DatabaseUtility.getDatabase();

        const snapshot = await db
            .collection('medic_classes')
            .orderBy('createdAt', 'desc')
            .get();

        const classes = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                description: data.description,
                cost: data.cost,
                minStudents: data.minStudents,
                maxStudents: data.maxStudents,
                location: data.location || '',
                date: data.date || '',
                time: data.time || '',
                status: data.status,
                enrolledCount: data.enrolledCount ?? 0,
                createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? '',
                updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() ?? '',
            };
        });

        const result: GetMedicClassesAdminResponse = { classes };
        response.send(result);
    });

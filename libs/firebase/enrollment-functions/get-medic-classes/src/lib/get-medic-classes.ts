import { Functions } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type { GetMedicClassesResponse } from '@sol/ts/firebase/api-types';

export const getMedicClasses = Functions.endpoint
    .handle(async (request, response) => {
        const db = DatabaseUtility.getDatabase();

        const snapshot = await db
            .collection('medic_classes')
            .where('status', '==', 'published')
            .get();

        const classes = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                description: data.description,
                cost: data.cost,
                maxStudents: data.maxStudents,
                enrolledCount: data.enrolledCount ?? 0,
            };
        });

        const result: GetMedicClassesResponse = { classes };
        response.send(result);
    });

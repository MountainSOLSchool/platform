import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';

export interface ClassType {
    id: string;
    name: string;
}

export interface GetClassTypesResponse {
    classTypes: ClassType[];
}

export const getClassTypes = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (_request, response) => {
        const db = DatabaseUtility.getDatabase();
        const snapshot = await db.collection('class_types').get();

        const classTypes: ClassType[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name || '',
        }));

        classTypes.sort((a, b) => a.name.localeCompare(b.name));

        response.send({ classTypes });
    });

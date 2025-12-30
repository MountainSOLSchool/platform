import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';

export interface Location {
    id: string;
    name: string;
    description?: string;
}

export interface GetLocationsResponse {
    locations: Location[];
}

export const getLocations = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (_request, response) => {
        const db = DatabaseUtility.getDatabase();
        const snapshot = await db.collection('campuses').get();

        const locations: Location[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name || '',
            description: doc.data().description,
        }));

        locations.sort((a, b) => a.name.localeCompare(b.name));

        response.send({ locations });
    });

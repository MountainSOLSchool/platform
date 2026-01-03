import { DatabaseUtility } from '@sol/firebase/database';
import { Functions } from '@sol/firebase/functions';

interface GetAgeGroupUnitsRequest {
    ageGroup: string;
}

export const getAgeGroupUnits = Functions.endpoint.handle<GetAgeGroupUnitsRequest>(
    async (request, response) => {
        const ageGroup = request.body.data?.ageGroup;

        if (
            !ageGroup ||
            (ageGroup !== 'mallards' && ageGroup !== 'mapaches')
        ) {
            response.status(400).send({
                error: 'Invalid ageGroup. Must be "mallards" or "mapaches".',
            });
            return;
        }

        const collectionName =
            ageGroup === 'mallards' ? 'mallards_units' : 'mapaches_units';
        const db = DatabaseUtility.getDatabase();
        const unitsSnapshot = await db.collection(collectionName).get();

        const units = unitsSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name ?? '',
                description: data.description ?? '',
            };
        });

        response.send({ units });
    }
);

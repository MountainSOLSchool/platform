import { UnitDbEntry, type PathDbEntry } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';
import { type DocumentReference } from 'firebase-admin/firestore';
import { Functions } from '@sol/firebase/functions';

function extractIdFromRef(ref: unknown): string | null {
    if (!ref) return null;
    // Handle DocumentReference objects
    if (typeof ref === 'object' && 'id' in ref && typeof (ref as DocumentReference).id === 'string') {
        return (ref as DocumentReference).id;
    }
    // Handle case where it might already be a string
    if (typeof ref === 'string') {
        return ref;
    }
    return null;
}

export const fullUnitsAndPaths = Functions.endpoint.handle(
    async (request, response) => {
        const paths = await getPaths();
        const units = await getUnits();

        const responsePaths = paths.map((path) => {
            const requirementRefs = (path.requirements as Array<unknown>) ?? [];
            const unitIds = requirementRefs
                .map(extractIdFromRef)
                .filter((id): id is string => id !== null);

            const electives = (path.electives ?? []).map((elective) => {
                const optionRefs = (elective.options as Array<unknown>) ?? [];
                const electiveUnitIds = optionRefs
                    .map(extractIdFromRef)
                    .filter((id): id is string => id !== null);
                return {
                    name: elective.name,
                    unitIds: electiveUnitIds,
                };
            });

            return {
                id: path.id,
                name: path.name,
                description: path.description,
                unitIds,
                electives,
            };
        });

        const responseUnits = units
            .map((unit) => ({
                id: unit.id,
                name: unit.name,
                description: unit.description,
                category: unit.category,
                isRepeatable: unit.is_repeatable,
                prereqUnitIds:
                    (
                        unit.prereqs as Array<DocumentReference> | undefined
                    )?.map((reference) => reference.id) ?? [],
            }))
            .reduce(
                (acc, unit) => ({
                    ...acc,
                    [unit.id]: unit,
                }),
                {}
            );

        response.send({
            paths: responsePaths,
            units: responseUnits,
        });
    }
);

async function getPaths(): Promise<Array<PathDbEntry>> {
    const db = DatabaseUtility.getDatabase();
    const pathsSnapshot = await db.collection('paths').get();

    return pathsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            description: data.description,
            requirements: data.requirements,
            electives: data.electives,
        };
    }) as Array<PathDbEntry>;
}

async function getUnits(): Promise<Array<UnitDbEntry>> {
    const db = DatabaseUtility.getDatabase();
    const unitsSnapshot = await db.collection('units').get();

    return unitsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Array<UnitDbEntry>;
}

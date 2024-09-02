import { UnitDbEntry, type PathDbEntry } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';
import { Functions } from '@sol/firebase/functions';
import { type DocumentReference } from 'firebase-admin/firestore';

export const fullUnitsAndPaths = Functions.endpoint.handle(
    async (request, response) => {
        const paths = await getPaths();
        const units = await getUnits();

        response.send({
            paths: paths.map((path) => ({
                id: path.id,
                name: path.name,
                description: path.description,
                unitIds:
                    (
                        path.requirements as
                            | Array<DocumentReference>
                            | undefined
                    )?.map((reference) => reference.id) ?? [],
                electives:
                    path.electives?.map((elective) => ({
                        name: elective.name,
                        unitIds:
                            (
                                elective.options as
                                    | Array<DocumentReference>
                                    | undefined
                            )?.map((reference) => reference.id) ?? [],
                    })) ?? [],
            })),
            units: units
                .map((unit) => ({
                    id: unit.id,
                    name: unit.name,
                    description: unit.description,
                    category: unit.category,
                    prereqUnitIds:
                        (
                            unit.prereqs as Array<DocumentReference> | undefined
                        )?.map((reference) => reference.id) ?? [],
                }))
                .reduce((acc, unit) => ({
                    ...acc,
                    [unit.id]: unit,
                })),
        });
    }
);

async function getPaths(): Promise<Array<PathDbEntry>> {
    const pathsCollection = await DatabaseUtility.getCollectionRef('paths');

    const pathsDocuments = await pathsCollection.listDocuments();

    const paths = await DatabaseUtility.getHydratedDocuments(pathsDocuments);
    return paths as unknown as Array<PathDbEntry>;
}

async function getUnits(): Promise<Array<UnitDbEntry>> {
    const unitsCollection = await DatabaseUtility.getCollectionRef('units');

    const unitsDocuments = await unitsCollection.listDocuments();

    const units = await DatabaseUtility.getHydratedDocuments(unitsDocuments);
    return units as unknown as Array<UnitDbEntry>;
}

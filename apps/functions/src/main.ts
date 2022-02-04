// © 2021 developed by Katie and David with ❤️❤️❤️

import { HttpUtility } from '@sol/firebase/functions';
import { FirebasePdf } from '@sol/pdf/firebase';
import { DatabaseUtility } from '@sol/firebase/database';
import { RosterReportGenerator } from '@sol/student/reports';

export const roster = HttpUtility.aGetEndpoint(async (request, response) => {
    const className = request.query.class as string;

    const db = DatabaseUtility.getDatabase();
    const reportGenerator = new RosterReportGenerator(db);
    const pdf = await reportGenerator.createRosterPdf(className);

    FirebasePdf.respondWithPdf(pdf, response);
});

export const classes = HttpUtility.aGetEndpoint(async (request, response) => {
    const db = DatabaseUtility.getDatabase();

    response.send({ classes: await _fetchClasses(db) });
});

interface ClassDbEntry {
    name: string;
    start: string;
    end: string;
}

const _fetchClasses = async (
    database: FirebaseFirestore.Firestore
): Promise<unknown> => {
    const classes = database.collection('classes');

    const hydratedClasses = await DatabaseUtility.getHydratedCollection(
        classes
    );

    const mappedClasses = hydratedClasses.classes.map((c, i) => ({
        title: c.name,
        start: c.start,
        end: c.end,
        id: String(i),
    }));

    return mappedClasses;
};

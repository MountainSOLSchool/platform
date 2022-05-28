// © 2021 developed by Katie and David with ❤️❤️❤️

import { AuthUtility, HttpUtility } from '@sol/firebase/functions';
import { FirebasePdf } from '@sol/pdf/firebase';
import { DatabaseUtility } from '@sol/firebase/database';
import { RosterReportGenerator } from '@sol/student/reports';
import { ClassEmailGenerator } from '@sol/student/reports';
import * as Papa from 'papaparse';
import { StudentEnrollmentEntry } from '@sol/student/import';

export const roster = HttpUtility.aGetEndpoint(async (request, response) => {
    AuthUtility.validateIsAdmin(request, response);

    const className = request.query.class as string;

    const db = DatabaseUtility.getDatabase();
    const reportGenerator = new RosterReportGenerator(db);
    const pdf = await reportGenerator.createRosterPdf(className);

    FirebasePdf.respondWithPdf(pdf, response);
});

export const signIn = HttpUtility.aGetEndpoint(async (request, response) => {
    AuthUtility.validateIsAdmin(request, response);

    const className = request.query.class as string;

    const db = DatabaseUtility.getDatabase();
    const reportGenerator = new RosterReportGenerator(db);
    const pdf = await reportGenerator.createSignInOutPdf(className);

    FirebasePdf.respondWithPdf(pdf, response);
});

export const classes = HttpUtility.aGetEndpoint(async (request, response) => {
    const db = DatabaseUtility.getDatabase();

    const classes = await _fetchClasses(db);

    console.log(classes);

    response.send({ classes });
});

export const emails = HttpUtility.aGetEndpoint(async (request, response) => {
    await AuthUtility.validateFirebaseIdToken(request, response);
    await AuthUtility.validateIsAdmin(request, response);
    const db = DatabaseUtility.getDatabase();
    const classEmailGenerator = new ClassEmailGenerator(db);
    const className = request.query.class as string;
    const emailList = await classEmailGenerator.createEmailList(className);
    response.send({
        list: emailList,
    });
});

export const importStudentEnrollmentSummer2022 = HttpUtility.aGetEndpoint(
    async (request, response) => {
        request.body as { enrollments: Array<StudentEnrollmentEntry> };

        // transform entries to db records

        // for each record create or replace

        // const doc = await DatabaseUtility.getDatabase()
        //     .collection('students')
        //     .doc('6R53VzBytDr7n4f2aIzG')
        //     .collection('allergies')
        //     .add({
        //         description: 'some allergy',
        //     });
        response.send({ idk: 'idk' });
    }
);

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

// © 2021 developed by Katie and David with ❤️❤️❤️

import { AuthUtility, HttpUtility } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import { RosterReportGenerator } from '@sol/student/reports';
import { ClassEmailGenerator } from '@sol/student/reports';
import {
    EnrollmentClassesMap,
    StudentEnrollmentEntry,
} from '@sol/student/import';
import { StudentRepositoryUtility } from '@sol/student/persistence';
import { StudentDbEntry } from '@sol/student/domain';
import { TableHtml } from '@sol/table/html';

export const roster = HttpUtility.aGetEndpoint(async (request, response) => {
    AuthUtility.validateIsAdmin(request, response);

    const className = request.query.class as string;

    const db = DatabaseUtility.getDatabase();
    const reportGenerator = new RosterReportGenerator(db);

    const students = await new StudentRepositoryUtility(db).fetchStudents(
        className
    );

    const studentRecords =
        reportGenerator.transformStudentEntriesIntoRosterRecords(students);

    const htmlTable = TableHtml.generateHtmlTableFromRecords({
        records: studentRecords,
        headers: reportGenerator.studentRowHeaders,
        title: `Class Roster for ${className}`,
        styleBuilder: reportGenerator.buildStudentRecordStyle,
    });

    response.send({ html: htmlTable });
});

export const signIn = HttpUtility.aGetEndpoint(async (request, response) => {
    AuthUtility.validateIsAdmin(request, response);

    const className = request.query.class as string;

    const db = DatabaseUtility.getDatabase();
    const reportGenerator = new RosterReportGenerator(db);

    const students = await new StudentRepositoryUtility(db).fetchStudents(
        className
    );

    const studentRecords =
        reportGenerator.transformStudentEntriesIntoSignInSheet(students);

    const htmlTable = TableHtml.generateHtmlTableFromRecords({
        records: studentRecords,
        headers: reportGenerator.signInRowHeaders,
        title: `Sign In/Out for ${className}`,
    });

    response.send({ html: htmlTable });
});

export const classes = HttpUtility.aGetEndpoint(async (request, response) => {
    const db = DatabaseUtility.getDatabase();

    const classes = await _fetchClasses(db);

    response.send({ classes });
});

export const emails = HttpUtility.aGetEndpoint(async (request, response) => {
    await AuthUtility.validateIsAdmin(request, response);
    const db = DatabaseUtility.getDatabase();
    const classEmailGenerator = new ClassEmailGenerator(db);
    const className = request.query.class as string;
    const emailList = await classEmailGenerator.createEmailList(className);
    response.send({
        list: emailList,
    });
});

export const importEnrollment = HttpUtility.aGetEndpoint(
    async (request, response) => {
        await AuthUtility.validateIsAdmin(request, response);
        const { data: entries } = request.body as {
            data: Array<StudentEnrollmentEntry>;
        };

        const updatedStudentEntries = entries
            .filter((e) => !!e.firstName)
            .map((entry) => {
                return {
                    first_name: entry.firstName,
                    last_name: entry.lastName,
                    code_word: entry.codeWord,
                    primary_email: entry.primaryEmailContact,
                    ok_to_photograph: entry.canPhotograph?.includes('Yes'),
                    ok_use_name_photographs: entry.canPhotograph === 'Yes',
                    sunscreen_bug_spray:
                        entry.canUseSunscreenAndInsectRepellant?.includes('Yes')
                            ? 'Yes'
                            : 'No',
                    birth_date: entry.dateOfBirth,
                    guardians: [],
                    emergency_contacts: [
                        {
                            first_name: entry.emergencyContactOneFirstName,
                            last_name: entry.emergencyContactOneLastName,
                            relationship: entry.emergencyContactOneRelationship,
                            phone: entry.emergencyContactOnePhoneNumber,
                            email: entry.emergencyContactOneEmail,
                        },
                    ],
                    authorized_pick_up_contacts: entry.authorizedPickupEntries
                        .split('\n')
                        .map((pickup) =>
                            pickup
                                .split(', ')
                                .map((t) =>
                                    t
                                        .replace('Name: ', '')
                                        .replace('Relationship: ', '')
                                        .replace('Phone: ', '')
                                )
                        )
                        .filter(
                            (pickup) => pickup.length > 1 && pickup[0] !== ''
                        )
                        .map(([name, relationship, phone]) => {
                            const names = name.split(' ');
                            return {
                                first_name: names.slice(0, -1).join(' '),
                                last_name: names[names.length - 1],
                                relationship:
                                    relationship ?? 'unknown relationship',
                                phone: phone ?? '',
                                email: '',
                            };
                        }),
                    allergies: [
                        {
                            name: '',
                            description: entry.specialHealthConsiderations,
                            response: '',
                            important: false,
                        },
                    ],
                    medications: entry.medicationDosageFrequencyEntries
                        .split('\n')
                        .map((med) =>
                            med
                                .split(', ')
                                .map((t) =>
                                    t
                                        .replace('Medication: ', '')
                                        .replace('Dosage & frequency: ', '')
                                        .replace('Perscribing doctor: ', '')
                                )
                        )
                        .filter(
                            (medication) =>
                                medication.length > 1 && medication[0] !== ''
                        )
                        .map(([name, dosage, doctor]) => ({
                            name,
                            dosage: dosage ?? '',
                            doctor: doctor ?? '',
                            important: false,
                        })),
                };
            });

        const matchingStudentResults = await Promise.all(
            updatedStudentEntries.map(async (updatedStudentEntry) => ({
                update: updatedStudentEntry,
                match: await new StudentRepositoryUtility(
                    DatabaseUtility.getDatabase()
                ).fetchMatchingStudent({
                    firstName: updatedStudentEntry.first_name ?? '',
                    lastName: updatedStudentEntry.last_name ?? '',
                    birthDate: updatedStudentEntry.birth_date ?? '',
                }),
            }))
        );

        const existingStudentUpdates: Array<StudentDbEntry> =
            matchingStudentResults
                .filter(({ match }) => !!match)
                .map(({ match: { id }, update }) => ({ id, ...update }));

        const newStudents: Array<Omit<StudentDbEntry, 'id'>> =
            matchingStudentResults
                .filter(({ match }) => !match)
                .map(({ update }) => ({ ...update }));

        const updatedExisting = new Array<{
            update: FirebaseFirestore.DocumentData;
            data: StudentDbEntry;
        }>();

        for (const record of existingStudentUpdates) {
            const { id, ...update } = record;
            updatedExisting.push({
                update: await DatabaseUtility.getDatabase()
                    .collection('students')
                    .doc(id)
                    .update(update),
                data: { id: id, ...update },
            });
        }

        const addedNew = new Array<{
            add: FirebaseFirestore.DocumentData;
            data: Omit<StudentDbEntry, 'id'>;
        }>();
        for (const record of newStudents) {
            addedNew.push({
                add: await DatabaseUtility.getDatabase()
                    .collection('students')
                    .doc()
                    .create(record),
                data: record,
            });
        }

        const enrollments = entries
            .map((entry) => ({
                classSignups: entry.classes,
                student: {
                    firstName: entry.firstName,
                    lastName: entry.lastName,
                    birthDate: entry.dateOfBirth,
                },
            }))
            .filter(({ classSignups }) => !!classSignups);

        const enrolled = new Array<{
            studentRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
            className: string;
        }>();
        for (const studentEnrollment of enrollments) {
            const classesToEnroll = Object.entries(EnrollmentClassesMap)
                .filter(([key]) => studentEnrollment.classSignups.includes(key))
                .map(([, classEnrollmentName]) => classEnrollmentName)
                .reduce((agg, classes) => [...agg, ...classes], []);
            const studentRef = await new StudentRepositoryUtility(
                DatabaseUtility.getDatabase()
            ).fetchMatchingStudentRef(studentEnrollment.student);
            for (const classToEnroll of classesToEnroll) {
                const classRef =
                    (await fetchMatchingClassRef({
                        name: classToEnroll,
                    })) ??
                    (await DatabaseUtility.getDatabase()
                        .collection('classes')
                        .add({
                            name: classToEnroll,
                            class_type: '2022 Summer',
                        }));

                const enrolledStudents =
                    ((await classRef.get()).data()?.students as Array<
                        FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
                    >) ?? [];
                if (
                    !enrolledStudents
                        ?.map((ref) => ref.id)
                        .find((s) => s === studentRef.id)
                ) {
                    await classRef.update({
                        students: [...enrolledStudents, studentRef],
                    });
                    enrolled.push({ studentRef, className: classToEnroll });
                }
            }
        }

        response.send({
            result: {
                updatedStudentEntries,
                addedNew,
                updatedExisting,
                matchingStudentResults,
                enrollments,
                enrolled,
            },
        });
    }
);

async function fetchMatchingClassRef({
    name,
}: {
    name: string;
}): Promise<
    | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
    | undefined
> {
    const classes = DatabaseUtility.getDatabase().collection('classes');

    const classRef = (
        await DatabaseUtility.fetchFirstMatchingDocument(classes, [
            'name',
            '==',
            name,
        ])
    )?.ref;

    return classRef;
}

const _fetchClasses = async (
    database: FirebaseFirestore.Firestore
): Promise<unknown> => {
    const classes = database.collection('classes');

    const hydratedClasses = await DatabaseUtility.getHydratedCollection(
        classes
    );

    const mappedClasses = hydratedClasses.classes.map((c, i) => {
        return {
            title: c.name,
            start: c.start,
            end: c.end,
            enrolledCount: c.students?.length ?? 0,
            id: String(i),
        };
    });

    return mappedClasses;
};

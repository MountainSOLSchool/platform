// © 2021 developed by Katie and David with ❤️❤️❤️

import { AuthUtility, Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import {
    RosterReportGenerator,
    StudentTshirtsGenerator,
} from '@sol/student/reports';
import { ClassEmailGenerator } from '@sol/student/reports';
import {
    EnrollmentClassesMap,
    StudentEnrollmentEntry,
} from '@sol/student/import';
import { StudentRepositoryUtility } from '@sol/student/persistence';
import { StudentDbEntry, StudentForm } from '@sol/student/domain';
import { TableHtml } from '@sol/table/html';
import { Braintree } from '@sol/payments/braintree';
import { ClassRepository, DiscountRepository } from '@sol/classes/repository';
import {
    Discount,
    isClassesDiscount,
    isBasketDiscount,
    ClassesDiscount,
    BasketDiscount,
} from '@sol/classes/domain';

export const roster = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
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

export const signIn = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
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

export const classes = Functions.endpoint.handle(async (request, response) => {
    const db = DatabaseUtility.getDatabase();

    const classes = await _fetchClasses(db);

    response.send({ classes });
});

export const emails = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const db = DatabaseUtility.getDatabase();
        const classEmailGenerator = new ClassEmailGenerator(db);
        const className = request.query.class as string;
        const emailList = await classEmailGenerator.createEmailList(className);
        response.send({
            list: emailList,
        });
    });

export const tshirts = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const db = DatabaseUtility.getDatabase();
        const tshirtGenerator = new StudentTshirtsGenerator(db);
        const tshirtList = await tshirtGenerator.createTshirtList();
        response.send({
            list: tshirtList,
        });
    });

export const importEnrollment = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
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
                    tshirt_size: entry.classes.includes(
                        '(adult sizing): XLarge'
                    )
                        ? 'XLarge'
                        : entry.classes.includes('(adult sizing): Large')
                        ? 'Large'
                        : entry.classes.includes('(adult sizing): Medium')
                        ? 'Medium'
                        : entry.classes.includes('(adult sizing): Small')
                        ? 'Small'
                        : entry.classes.includes('(adult sizing): XSmall')
                        ? 'XSmall'
                        : '',
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
                    .update({ ...update }),
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
    });

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

    const mappedClasses = await Promise.all(
        hydratedClasses.classes.map(async (c, i) => {
            return {
                title: c.name,
                startMs:
                    typeof c !== 'string' &&
                    typeof c.start === 'object' &&
                    '_seconds' in c.start
                        ? Number(c.start._seconds) * 1000
                        : undefined,
                endMs:
                    typeof c !== 'string' &&
                    typeof c.end === 'object' &&
                    '_seconds' in c.end
                        ? Number(c.end._seconds) * 1000
                        : undefined,
                enrolledCount: Array.isArray(c.students)
                    ? c.students?.length ?? 0
                    : 0,
                id: c.id,
                classType: c.class_type,
                gradeRangeStart: c.grade_range_start,
                gradeRangeEnd: c.grade_range_end,
                description: c.description,
                live: c.live,
                cost: c.cost,
                location: c.location,
                instructors: await DatabaseUtility.getHydratedDocuments(
                    c.instructors as unknown as Array<FirebaseFirestore.DocumentReference>
                ),
                dailyTimes: c.daily_times,
                weekday: c.weekday,
            };
        })
    );

    return mappedClasses;
};

export const paymentToken = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .handle(async (request, response, secrets) => {
        const user = await AuthUtility.getUserFromRequest(request, response);
        const braintree = new Braintree(secrets);
        const token = await braintree.getClientToken(user);
        response.send(token);
    });

export const enroll = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .handle<{
        selectedClasses: Array<string>;
        student: StudentForm;
        discountCodes: Array<string>;
        paymentMethod: { nonce: string; deviceData: string };
    }>(async (request, response, secrets) => {
        const {
            selectedClasses,
            student,
            discountCodes,
            paymentMethod: { nonce, deviceData },
        } = request.body.data;

        // 1. Get classes with costs
        const classes = await Promise.all(
            selectedClasses.map(async (id) => await ClassRepository.get(id))
        );

        // 2. Get discounts for coupon codes
        const discounts = (
            await Promise.all(
                discountCodes.map(
                    async (code) => await DiscountRepository.get(code)
                )
            )
        ).filter((d): d is Discount<unknown> => !!d);

        // 3. Calculate the total price
        const classesDiscounts = discounts.filter((d): d is ClassesDiscount =>
            isClassesDiscount(d)
        );

        const classesUpdatedByClassDiscounts = classesDiscounts.reduce(
            (updatedClasses, discount) => discount.apply(updatedClasses),
            classes
        );

        const basketDiscounts = discounts.filter((d): d is BasketDiscount =>
            isBasketDiscount(d)
        );

        const basketTotal = classesUpdatedByClassDiscounts.reduce(
            (total, c) => total + c.cost,
            0
        );

        const finalTotal = basketDiscounts.reduce(
            (total, discount) => discount.apply(total),
            basketTotal
        );

        // 4. Add a "pending" student enrollment transaction to the database

        // 5. Transact with Braintree
        const braintree = new Braintree(secrets);

        const transaction = await braintree.transact({
            amount: finalTotal,
            nonce,
            customer: { email: 'test@email.com' },
            deviceData,
        });

        // 6. Add a "successful" student enrollment transaction to the database
        // 7. Create a student record

        // 8. Add student to the class

        response.send({ success: true, transaction: transaction });
    });

export const roles = Functions.endpoint.handle(async (request, response) => {
    const user = await AuthUtility.getUserFromRequest(request, response);
    const roles = await AuthUtility.getUserRoles(user);
    response.send(roles);
});

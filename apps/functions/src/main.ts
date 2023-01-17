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
import { StudentRepository } from '@sol/student/repository';
import {
    NewStudentDbEntry,
    StudentDbEntry,
    StudentForm,
} from '@sol/student/domain';
import { TableHtml } from '@sol/table/html';
import { Braintree } from '@sol/payments/braintree';
import {
    CLASSES_SUMMER_2023_COLLECTION,
    ClassRepository,
    DiscountRepository,
} from '@sol/classes/repository';
import {
    AbstractDiscount,
    isClassesDiscount,
    isBasketDiscount,
    ClassesAbstractDiscount,
    BasketAbstractDiscount,
    Class,
} from '@sol/classes/domain';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
// import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';

export const roster = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const className = request.query.class as string;

        const students = await StudentRepository.fetchStudents(className);

        const studentRecords =
            RosterReportGenerator.transformStudentEntriesIntoRosterRecords(
                students
            );

        const htmlTable = TableHtml.generateHtmlTableFromRecords({
            records: studentRecords,
            headers: RosterReportGenerator.studentRowHeaders,
            title: `Class Roster for ${className}`,
            styleBuilder: RosterReportGenerator.buildStudentRecordStyle,
        });

        response.send({ html: htmlTable });
    });

export const signIn = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const className = request.query.class as string;

        const students = await StudentRepository.fetchStudents(className);

        const studentRecords =
            RosterReportGenerator.transformStudentEntriesIntoSignInSheet(
                students
            );

        const htmlTable = TableHtml.generateHtmlTableFromRecords({
            records: studentRecords,
            headers: RosterReportGenerator.signInRowHeaders,
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
        const className = request.query.class as string;
        const emailList = await ClassEmailGenerator.createEmailList(className);
        response.send({
            list: emailList,
        });
    });

export const tshirts = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const tshirtList = await StudentTshirtsGenerator.createTshirtList();
        response.send({
            list: tshirtList,
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
    const classes = DatabaseUtility.getDatabase().collection(
        CLASSES_SUMMER_2023_COLLECTION
    );

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
    database: FirebaseFirestore.Firestore,
    classIds?: string[]
): Promise<unknown> => {
    const classes = database.collection(CLASSES_SUMMER_2023_COLLECTION);

    console.log(classes);

    const { classesSummer2023 } = await DatabaseUtility.getHydratedCollection(
        classes
    );

    const mappedClasses = await Promise.all(
        classesSummer2023.map(async (c) => {
            return {
                title: c.name,
                startMs:
                    typeof c !== 'string' &&
                    typeof c.start === 'object' &&
                    c.start &&
                    '_seconds' in c.start
                        ? Number(c.start._seconds) * 1000
                        : undefined,
                endMs:
                    typeof c !== 'string' &&
                    typeof c.end === 'object' &&
                    c.end &&
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
        if (!user) {
            response.status(401).send({ error: 'Unauthorized' });
            return;
        }
        const braintree = new Braintree(secrets);
        const token = await braintree.getClientToken(user);
        response.send(token);
    });

function _getEnrollmentDiscounts(
    discounts: AbstractDiscount<unknown>[],
    classes: Awaited<Class>[]
) {
    const activeDiscounts = discounts.filter((d) => d.active);

    const classesDiscounts = activeDiscounts.filter(
        (d): d is ClassesAbstractDiscount => isClassesDiscount(d)
    );

    const [updatedClasses, classDiscountAmounts] = classesDiscounts.reduce(
        ([updated, amounts], discount) => {
            const appliedDiscount = discount.apply(updated);
            return [
                appliedDiscount.updated,
                [
                    ...amounts,
                    { code: discount.code, amount: appliedDiscount.amount },
                ],
            ] satisfies [Array<Class>, Array<{ code: string; amount: number }>];
        },
        [classes, new Array<{ code: string; amount: number }>()] satisfies [
            Array<Class>,
            Array<{ code: string; amount: number }>
        ]
    );

    const basketDiscounts = activeDiscounts.filter(
        (d): d is BasketAbstractDiscount => isBasketDiscount(d)
    );

    const basketTotal = updatedClasses.reduce(
        (total, c) => total + (c.cost ?? 0),
        0
    );

    const [finalTotal, basketDiscountAmounts] = basketDiscounts.reduce(
        ([updated, amounts], discount) => {
            const appliedDiscount = discount.apply(updated);
            return [
                appliedDiscount.updated,
                [
                    ...amounts,
                    { code: discount.code, amount: appliedDiscount.amount },
                ],
            ] satisfies [number, Array<{ code: string; amount: number }>];
        },
        [basketTotal, new Array<{ code: string; amount: number }>()] satisfies [
            number,
            Array<{ code: string; amount: number }>
        ]
    );

    return {
        updatedClasses,
        finalTotal,
        discountAmounts: [...classDiscountAmounts, ...basketDiscountAmounts],
        originalTotal: classes.reduce((total, c) => total + (c.cost ?? 0), 0),
    };
}

export const enroll = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .handle<{
        selectedClasses: Array<string>;
        student: StudentForm;
        discountCodes: Array<string>;
        paymentMethod: { nonce: string; deviceData: string };
    }>(async (request, response, secrets) => {
        const user = await AuthUtility.getUserFromRequest(request, response);

        if (!user) {
            response.status(401).send({ error: 'User not found' });
            return;
        }

        const {
            selectedClasses,
            student,
            discountCodes,
            paymentMethod: { nonce, deviceData },
        } = request.body.data;

        const classes = await Promise.all(
            selectedClasses.map(async (id) => await ClassRepository.get(id))
        );

        const codedDiscounts = await DiscountRepository.getAllValid(
            discountCodes
        );
        const automaticDiscounts = await DiscountRepository.getAllByProperty(
            'automatic',
            true
        );

        const { finalTotal } = _getEnrollmentDiscounts(codedDiscounts, classes);

        const enrollmentRecord = {
            userId: user.uid,
            studentName: `${student.firstName} ${student.lastName}`,
            contactEmail: student.contactEmail,
            finalCost: finalTotal,
            discountIds: codedDiscounts
                .map((d) => d.id)
                .filter((d): d is string => !!d),
            classIds: classes.map((c) => c.id),
        };

        const studentEnrollmentId = await ClassEnrollmentRepository.create({
            ...enrollmentRecord,
            status: 'pending',
        });

        const braintree = new Braintree(secrets);

        const { success, transaction, errors } = await braintree.transact({
            amount: finalTotal,
            nonce,
            customer: { email: enrollmentRecord.contactEmail },
            deviceData,
        });

        if (success) {
            const studentRef = await StudentRepository.create(
                _mapStudentFormToStudentDbEntry(student)
            );

            await ClassEnrollmentRepository.create({
                ...enrollmentRecord,
                relatedId: studentEnrollmentId,
                studentId: studentRef.id,
                transactionId: transaction.id,
                status: 'enrolled',
            });

            await Promise.all(
                classes.map(async (c) => {
                    await ClassRepository.addStudentToClass(
                        studentRef.id,
                        c.id
                    );
                })
            );

            response.send({
                success,
                email: student.contactEmail,
            });
        } else {
            await ClassEnrollmentRepository.create({
                ...enrollmentRecord,
                relatedId: studentEnrollmentId,
                status: 'failed',
                failures: errors.deepErrors().map((e) => e.message),
            });
            response.send({ success, errors: errors.deepErrors() });
        }
    });

function _mapStudentFormToStudentDbEntry(form: StudentForm): NewStudentDbEntry {
    const entry: NewStudentDbEntry = {
        first_name: form.firstName,
        last_name: form.lastName,
        code_word: form.pickupCodeword,
        primary_email: form.contactEmail,
        ok_to_photograph:
            form.photography === 'yes' || form.photography === 'yesNoName',
        ok_use_name_photographs: form.photography === 'yes',
        sunscreen_bug_spray:
            form.sunscreen || form.deetBugspray || form.naturalBugspray
                ? 'Yes'
                : 'No',
        birth_date: String(form.birthdate),
        emergency_contacts: form.emergencyContacts.map((c) => ({
            first_name: c.name,
            last_name: 'string',
            relationship: c.relationship,
            phone: c.phone,
            email: '',
        })),
        authorized_pick_up_contacts:
            form.authorizedForPickup?.map((c) => ({
                first_name: c.name,
                last_name: 'string',
                relationship: c.relationship,
                phone: c.phone,
                email: '',
            })) ?? [],
        allergies:
            (form.allergies ?? '').trim() === ''
                ? []
                : [
                      {
                          name: '',
                          description: form.allergies ?? '',
                          response: '',
                          important: true,
                      },
                  ],
        medications:
            form.medications?.map((m) => ({
                ...m,
                important: true,
            })) ?? [],
        // TODO- collect t-shirt size
        tshirt_size: '',
    };
    return entry;
}

export const roles = Functions.endpoint.handle(async (request, response) => {
    const user = await AuthUtility.getUserFromRequest(request, response);
    if (!user) {
        response.send({ roles: [] });
        return;
    }
    const roles = await AuthUtility.getUserRoles(user);
    response.send(roles);
});

export const enrollments = Functions.endpoint.handle(
    async (request, response) => {
        const enrollments =
            await ClassEnrollmentRepository.getCurrentUserCompletedEnrollments(
                request,
                response
            );
        response.send(enrollments);
    }
);

export const calculateBasket = Functions.endpoint.handle<{
    codes: Array<string>;
    classIds: Array<string>;
}>(async (request, response) => {
    const { codes, classIds } = request.body.data;
    const discounts = (
        await Promise.all(
            codes.map(async (code) => await DiscountRepository.get(code))
        )
    ).filter((code): code is AbstractDiscount<unknown> => !!code);
    const classes = await Promise.all(
        classIds.map(async (id) => await ClassRepository.get(id))
    );
    const { discountAmounts, finalTotal, originalTotal } =
        _getEnrollmentDiscounts(discounts, classes);
    response.send({ discountAmounts, finalTotal, originalTotal });
});

// © 2021 developed by Katie and David with ❤️❤️❤️

import { AuthUtility, Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import {
    RosterReportGenerator,
    StudentTshirtsGenerator,
} from '@sol/student/reports';
import { ClassEmailGenerator } from '@sol/student/reports';
import { StudentRepository } from '@sol/student/repository';
import { NewStudentDbEntry, StudentForm } from '@sol/student/domain';
import { TableHtml } from '@sol/table/html';
import { Braintree } from '@sol/payments/braintree';
import {
    SUMMER_2023_SEMESTER,
    SemesterRepository,
    DiscountRepository,
} from '@sol/classes/repository';
import {
    Discount,
    isClassesDiscount,
    isBasketDiscount,
    ClassesDiscount,
    BasketDiscount,
    SemesterClass,
    SemesterClassGroup,
} from '@sol/classes/domain';
import {
    ClassEnrollmentDbo,
    ClassEnrollmentRepository,
} from '@sol/classes/enrollment/repository';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Transaction, ValidationErrorsCollection } from 'braintree';

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

export const classes = Functions.endpoint.handle<{
    ids: Array<string>;
}>(async (request, response) => {
    const classes = await SemesterRepository.of(
        SUMMER_2023_SEMESTER
    ).classes.getMany(request.body.data.ids);

    response.send({ classes });
});

export const classGroups = Functions.endpoint.handle<{
    ids: Array<string>;
}>(async (request, response) => {
    const groups = await SemesterRepository.of(
        SUMMER_2023_SEMESTER
    ).groups.getMany(request.body.data.ids);

    response.send({ groups });
});

export const availableEnrollmentClasses = Functions.endpoint.handle(
    async (request, response) => {
        const semester = await SemesterRepository.of(SUMMER_2023_SEMESTER);
        const now = Date.now();
        const classes = await semester.classes.getByStartsAtOrAfter(now);
        const groups = await semester.groups.getByStartsAtOrAfter(now);
        const idsOfClassesInGroups = groups.flatMap((g) =>
            g.classes.map((c) => c.id)
        );
        const classesNotInGroups = classes.filter(
            (c) => !idsOfClassesInGroups.includes(c.id)
        );

        response.send({ classes: classesNotInGroups, groups });
    }
);

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

export const paymentToken = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle(async (request, response, secrets, strings) => {
        const user = await AuthUtility.getUserFromRequest(request, response);
        if (!user) {
            response.status(401).send({ error: 'Unauthorized' });
            return;
        }
        const braintree = new Braintree(secrets, strings);
        const token = await braintree.getClientToken(user);
        response.send(token);
    });

function _getEnrollmentCost(
    discounts: Discount<unknown>[],
    classes: Awaited<SemesterClass>[],
    classGroups: Awaited<SemesterClassGroup>[]
) {
    const activeDiscounts = discounts.filter((d) => d.active);

    const classesDiscounts = activeDiscounts.filter((d): d is ClassesDiscount =>
        isClassesDiscount(d)
    );

    const [
        { classes: updatedClasses, groups: updatedGroups },
        classDiscountAmounts,
    ] = classesDiscounts.reduce(
        ([{ classes, groups }, amounts], discount) => {
            const appliedDiscount = discount.apply({ classes, groups });
            return [
                appliedDiscount.updated,
                [
                    ...amounts,
                    { code: discount.code, amount: appliedDiscount.amount },
                ],
            ] satisfies [
                {
                    classes: Array<SemesterClass>;
                    groups: Array<SemesterClassGroup>;
                },
                Array<{ code: string; amount: number }>
            ];
        },
        [
            { classes, groups: classGroups },
            new Array<{ code: string; amount: number }>(),
        ] satisfies [
            {
                classes: Array<SemesterClass>;
                groups: Array<SemesterClassGroup>;
            },
            Array<{ code: string; amount: number }>
        ]
    );

    const basketDiscounts = activeDiscounts.filter((d): d is BasketDiscount =>
        isBasketDiscount(d)
    );

    const classIdsOfClassesInGroups = classGroups.flatMap((g) =>
        g.classes.map((c) => c.id)
    );
    const classesNotInGroups = updatedClasses.filter(
        (c) => !classIdsOfClassesInGroups.includes(c.id)
    );

    const basketTotal = [...classesNotInGroups, ...updatedGroups].reduce(
        (total, { cost }) => total + (cost ?? 0),
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

    const classGroupsTotal = classGroups.reduce(
        (total, { cost }) => total + (cost ?? 0),
        0
    );
    const classesNotInGroupsTotal = classesNotInGroups.reduce(
        (total, { cost }) => total + (cost ?? 0),
        0
    );

    const originalTotal = classGroupsTotal + classesNotInGroupsTotal;

    return {
        updatedClasses,
        updatedGroups,
        finalTotal,
        discountAmounts: [...classDiscountAmounts, ...basketDiscountAmounts],
        originalTotal,
    };
}

export const enroll = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<{
        selectedClasses: Array<string>;
        selectedClassGroups: Array<string>;
        student: StudentForm;
        discountCodes: Array<string>;
        paymentMethod: { nonce: string; deviceData: string };
        isSignedUpForSolsticeEmails: boolean;
    }>(async (request, response, secrets, strings) => {
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
            isSignedUpForSolsticeEmails,
            selectedClassGroups,
        } = request.body.data;

        const semester = SemesterRepository.of(SUMMER_2023_SEMESTER);

        const classesRepository = semester.classes;

        const classes = await classesRepository.getMany(selectedClasses);

        const classGroups = await semester.groups.getMany(selectedClassGroups);

        const discounts = (
            await Promise.all(
                discountCodes.map(
                    async (code) => await DiscountRepository.get(code)
                )
            )
        ).filter((d): d is Discount<unknown> => !!d);

        const { finalTotal, discountAmounts } = _getEnrollmentCost(
            discounts,
            classes,
            classGroups
        );

        const enrollmentRecord = {
            userId: user.uid,
            studentName: `${student.firstName} ${student.lastName}`,
            contactEmail: student.contactEmail,
            finalCost: finalTotal,
            discountIds: discounts
                .map((d) => d.id)
                .filter((d): d is string => !!d),
            discounts: discountAmounts.map((da) => ({
                description: da.code,
                amount: da.amount,
            })),
            classIds: classes.map((c) => c.id),
            isSignedUpForSolsticeEmails,
        };

        const studentEnrollmentId = await ClassEnrollmentRepository.create({
            ...enrollmentRecord,
            status: 'pending',
        });

        const braintree = new Braintree(secrets, strings);

        let success: boolean;
        let transaction: Transaction | undefined;
        let errors: ValidationErrorsCollection | undefined;
        if (finalTotal > 0) {
            const {
                success: transactionSuccess,
                transaction: theTransaction,
                errors: transactionErrors,
            } = await braintree.transact({
                amount: finalTotal,
                nonce,
                customer: { email: enrollmentRecord.contactEmail },
                deviceData,
            });
            success = transactionSuccess;
            transaction = theTransaction;
            errors = transactionErrors;
        } else {
            success = true;
        }

        if (success) {
            const studentRef = await StudentRepository.create(
                _mapStudentFormToStudentDbEntry(student)
            );

            await ClassEnrollmentRepository.create({
                ...enrollmentRecord,
                relatedId: studentEnrollmentId,
                studentId: studentRef.id,
                transactionId: transaction?.id ?? '',
                status: 'enrolled',
                medicalReleaseSignature: student.medicalReleaseSignature,
                releaseOfLiabilitySignature:
                    student.releaseOfLiabilitySignature,
            });

            await Promise.all(
                classes.map(async (c) => {
                    await classesRepository.addStudentToClass(
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
                failures: errors?.deepErrors().map((e) => e.message) ?? [],
                releaseOfLiabilitySignature:
                    student.releaseOfLiabilitySignature,
                medicalReleaseSignature: student.medicalReleaseSignature,
            });
            response.send({ success, errors: errors?.deepErrors() ?? [] });
        }
    });

function _mapStudentFormToStudentDbEntry(form: StudentForm): NewStudentDbEntry {
    const entry: NewStudentDbEntry = {
        first_name: form.firstName,
        last_name: form.lastName,
        code_word: form.pickupCodeword,
        primary_email: form.contactEmail,
        primary_first_name: form.contactFirstName,
        primary_last_name: form.contactLastName,
        ok_to_photograph:
            form.photography === 'yes' || form.photography === 'yesNoName',
        ok_use_name_photographs: form.photography === 'yes',
        ok_deet_bugspray: form.deetBugspray,
        ok_sunscreen: form.sunscreen,
        ok_natural_bugspray: form.naturalBugspray,
        birth_date: String(form),
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
        allergies: form.allergies ?? '',
        medications: form.medications ?? [],
        tshirt_size: form.tshirtSize,
        pronouns: form.pronouns,
        weightPounds: form.weightImperial,
        heightFeet: form.heightFeet,
        heightInches: form.heightInches,
        primary_phone: form.contactPhone,
        student_email: form.studentEmail,
        student_phone: form.studentPhone,
        student_address: form.address,
        student_city: form.city,
        student_state: form.state,
        student_zip: form.zip,
        school: form.school,
        guardians: form.guardians.map((g) => ({
            first_name: g.guardianName,
            last_name: '',
            email: g.guardianEmail,
            phone: g.guardianPhone,
            relationship: g.guardianRelationship,
            resides_with_student: g.guardianResidesWithStudent,
        })),
        has_life_threatening_allergies: form.hasLifeThreateningAllergies,
        authorized_to_administer_meds: form.authorizedToAdministerMedication,
        medical_notes: form.medicalNotes ?? '',
        insurance_company: form.insuranceCompany,
        insurance_id: form.insuranceId,
        does_not_have_insurance: form.doesNotHaveInsurance,
        doctor: form.doctorName,
        doctor_phone: form.doctorPhone,
        parent_notes: form.notes,
        medical_release_signature: form.medicalReleaseSignature,
        medical_release_signature_date: new Date().getUTCDate().toString(),
        release_of_liability_signature: form.releaseOfLiabilitySignature,
        release_of_liability_signature_date: new Date().getUTCDate().toString(),
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
    classGroupIds: Array<string>;
}>(async (request, response) => {
    const { codes, classIds, classGroupIds } = request.body.data;
    const discounts = (
        await Promise.all(
            codes.map(async (code) => await DiscountRepository.get(code))
        )
    ).filter((code): code is Discount<unknown> => !!code);
    const classes = await Promise.all(
        classIds.map(
            async (id) =>
                await SemesterRepository.of(SUMMER_2023_SEMESTER).classes.get(
                    id
                )
        )
    );
    const groups = await Promise.all(
        classGroupIds.map(
            async (id) =>
                await SemesterRepository.of(SUMMER_2023_SEMESTER).groups.get(id)
        )
    );
    const { discountAmounts, finalTotal, originalTotal } = _getEnrollmentCost(
        discounts,
        classes,
        groups
    );
    response.send({ discountAmounts, finalTotal, originalTotal });
});

export const addEmailToSolsticeList = functions.firestore
    .document('enrollment/{enrollmentId}')
    .onCreate(async (documentSnapshot) => {
        const enrollmentRecord = documentSnapshot.data() as ClassEnrollmentDbo;
        if (
            enrollmentRecord.status === 'enrolled' &&
            !!enrollmentRecord.transactionId &&
            enrollmentRecord.isSignedUpForSolsticeEmails === true
        ) {
            await DatabaseUtility.getDatabase()
                .collection('mailing_lists')
                .doc('summer_solstice_2023')
                .update({
                    emails: admin.firestore.FieldValue.arrayUnion(
                        enrollmentRecord.contactEmail
                    ),
                });
        }
    });

export const createEnrollmentEmail = functions.firestore
    .document('enrollment/{enrollmentId}')
    .onCreate(async (documentSnapshot) => {
        const enrollmentRecord = documentSnapshot.data() as ClassEnrollmentDbo;

        if (
            enrollmentRecord.status === 'enrolled' &&
            !!enrollmentRecord.transactionId
        ) {
            const classes = await SemesterRepository.of(
                SUMMER_2023_SEMESTER
            ).classes.getMany(enrollmentRecord.classIds);

            const classesCost = classes.reduce((total, c) => total + c.cost, 0);
            const totalDiscounts = enrollmentRecord.discounts.reduce(
                (total, d) => total + d.amount,
                0
            );
            const differenceBetweenFinalCostAndOriginalCostWithDiscounts =
                Math.abs(
                    enrollmentRecord.finalCost - (classesCost - totalDiscounts)
                );

            const user = await AuthUtility.getUser(enrollmentRecord.userId);

            await DatabaseUtility.getDatabase()
                .collection('mail')
                .add({
                    to: user.email ?? enrollmentRecord.contactEmail,
                    message: {
                        subject: `Enrollment confirmation for ${enrollmentRecord.studentName}`,
                        html: `<p>Thank you for enrolling ${
                            enrollmentRecord.studentName
                        } for classes with us this summer!</p>
                        <p>You can view all of your enrollments here by logging in with the account you created: <a href="https://mountain-sol-platform.web.app/account/enrollments">https://mountain-sol-platform.web.app/account/enrollments</a>.</p>
                        <p>If you'd like to sign up another student, use the coupon code "SIBLING2023" for a 10% discount on all classes for your second student!</p>
                        <p>If you’re new to Mountain SOL, please review the summer info page here prior to the start of class: <a href="https://www.mountainsol.org/summer">https://www.mountainsol.org/summer</a>.</p>
                        <p>Every student is encouraged to wear good hiking shoes and bring the following items in a backpack:
                        <ul>
                          <li>Water bottle</li>
                          <li>Peanut-free snacks</li>
                          <li>Lunch (if staying for the lunch hour)</li>
                          <li>Bugspray/sunscreen</li>
                          <li>Rain jacket</li>
                        </ul>
                        </p>
                        <p>We’ll send you another email one week before the start of each class with class-specific details about what else to expect and a more specific list for your student’s backpack.</p>
                        <p>In the meantime, please reach out to us or reply to this email with any questions!</p>
                        <p>Below is your receipt for the classes in which they are enrolled:</p>
                        <table style="text-align: left">
                          <thead>
                          <th>
                            Class Name
                          </th>
                          <th>
                            Cost
                          </th>
                          </thead>
                          <tbody>
                            ${classes
                                .map(
                                    (c) =>
                                        `<tr>
                            <td>
                                ${c.title}
                            </td>
                            <td>
                                $${c.cost}
                            </td>
                            </tr>`
                                )
                                .join('')}
                          <tr>
                          ${enrollmentRecord.discounts
                              .map(
                                  (d) =>
                                      `<tr>
                            <td>
                                ${d.description}
                            </td>
                            <td>
                                -$${d.amount}
                            </td>
                            </tr>
                            `
                              )
                              .join('')}
                          ${
                              differenceBetweenFinalCostAndOriginalCostWithDiscounts >
                              0
                                  ? `<tr>
                            <td>
                            Other Savings
                            </td>
                            <td>
                            -$${differenceBetweenFinalCostAndOriginalCostWithDiscounts}
                            </td>
                          </tr>`
                                  : ``
                          }
                          <tr>
                            <td>
                              Total
                            </td>
                            <td>
                              $${enrollmentRecord.finalCost}
                            </td>
                          </tr>
                          </tbody>
                        </table>
                        <p>Transaction ID: ${
                            enrollmentRecord.transactionId
                        }</p>`,
                    },
                });
        }
    });

import { AuthUtility, Functions } from '@sol/firebase/functions';
import { Braintree } from '@sol/payments/braintree';
import {
    StudentDbEntry,
    StudentForm,
} from '@sol/student/domain';
import { DiscountRepository } from '@sol/classes/repository';
import { Discount, EnrollmentUtility } from '@sol/classes/domain';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import { Transaction, ValidationErrorsCollection } from 'braintree';
import { StudentRepository } from '@sol/student/repository';
import { Semester } from '@sol/firebase/classes/semester';
import { _assertUserCanManageStudent, _getClasses, _getClassGroupsFromClasses, _doesStudentInfoRequireReview, _mapStudentFormToStudentDbEntry } from '@sol/firebase/enrollment-functions/shared';
import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';



export const enroll = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<{
        selectedClasses: Array<{
            id: string;
            semesterId: string;
        }>;
        student: StudentForm;
        releaseSignatures: Array<{ name: string; signature: string }>;
        discountCodes: Array<string>;
        paymentMethod?: { nonce: string; deviceData: string };
        userCostsToSelectedClassIds: Record<string, number | undefined>;
        additionalOptionIdsByClassId: { [classId: string]: Array<string> };
        hasConfirmedAccuracy?: boolean;
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
            paymentMethod,
            releaseSignatures,
            userCostsToSelectedClassIds,
            additionalOptionIdsByClassId,
            hasConfirmedAccuracy
        } = request.body.data;

        if (student?.id) {
            await _assertUserCanManageStudent(user, student.id, response);
        }

        const updatedStudentDbEntry = Object.assign(...[
            {},
            _mapStudentFormToStudentDbEntry(student),
            ...(hasConfirmedAccuracy
                ? [{ last_reviewed_student_info_timestamp: new Date().toISOString(), }]
                : []
            )
        ]);
        const okay = hasConfirmedAccuracy || !('id' in updatedStudentDbEntry) || await _assertStudentInfoUpToDate(updatedStudentDbEntry, { request, response });

        if (!okay) {
            response.status(400).send({
                error: 'Student info requires review',
            });
            return;
        }

        const classes = Object.values(
            await _getClasses(selectedClasses)
        ).flatMap((c) => c);

        const classesWithUserCostsApplied = EnrollmentUtility.applyUserCosts(
            classes,
            userCostsToSelectedClassIds
        );

        if ('error' in classesWithUserCostsApplied) {
            response.status(400).send(classesWithUserCostsApplied);
            return;
        }

        const classGroups = Object.values(
            await _getClassGroupsFromClasses(selectedClasses)
        ).flatMap((g) => g);

        const discounts = (
            await Promise.all(
                discountCodes.map(
                    async (code) => await DiscountRepository.get(code)
                )
            )
        ).filter((d): d is Discount<unknown> => !!d);

        const additionalOptionIds = Object.values(
            additionalOptionIdsByClassId
        ).flat();

        const { finalTotal, discountAmounts } =
            EnrollmentUtility.getEnrollmentCost(
                discounts,
                classesWithUserCostsApplied,
                classGroups,
                additionalOptionIds
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
            classes: classes.map((c) => ({
                id: c.id,
                semesterId: c.semesterId,
            })),
            additionalOptionIdsByClassId,
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
            } = paymentMethod
                    ? await braintree.transact({
                        amount: finalTotal,
                        nonce: paymentMethod.nonce,
                        customer: { email: enrollmentRecord.contactEmail },
                        deviceData: paymentMethod.deviceData,
                    })
                    : {
                        success: false,
                        transaction: undefined,
                        errors: undefined,
                    };
            success = transactionSuccess;
            transaction = theTransaction;
            errors = transactionErrors;
        } else {
            success = true;
        }

        if (success) {

            const studentRef = await ('id' in updatedStudentDbEntry
                ? StudentRepository.update(updatedStudentDbEntry)
                : StudentRepository.create(updatedStudentDbEntry));

            await ClassEnrollmentRepository.create({
                ...enrollmentRecord,
                relatedId: studentEnrollmentId,
                studentId: studentRef.id,
                transactionId: transaction?.id ?? '',
                releaseSignatures,
                status: 'enrolled',
            });

            await Promise.all(
                classes.map(async (c) => {
                    await Semester.of(c.semesterId).classes.addStudentToClass(
                        studentRef.id,
                        c.id,
                        additionalOptionIdsByClassId[c.id] ?? []
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
                failures: errors?.deepErrors().map((e) => e.message) ?? [],
                releaseSignatures,
                status: 'failed',
            });
            response.send({ success, errors: errors?.deepErrors() ?? [] });
        }
    });


async function _assertStudentInfoUpToDate(

    studentDbEntry: StudentDbEntry,
    userContext: {
        request: Request;
        response: express.Response;
    }
) {
    const isOutOfDate = await _doesStudentInfoRequireReview(studentDbEntry, userContext);
    return !isOutOfDate;
}
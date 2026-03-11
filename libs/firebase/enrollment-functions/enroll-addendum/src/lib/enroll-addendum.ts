import { AuthUtility, Functions } from '@sol/firebase/functions';
import { Braintree } from '@sol/payments/braintree';
import { StudentForm } from '@sol/student/domain';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import { Transaction, ValidationErrorsCollection } from 'braintree';
import { StudentRepository } from '@sol/student/repository';
import { Semester } from '@sol/firebase/classes/semester';
import {
    _assertUserCanManageStudent,
    _getClasses,
    _calculateEnrollmentCost,
    _mapStudentFormToStudentDbEntry,
} from '@sol/firebase/enrollment-functions/shared';

export const enrollAddendum = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<{
        originalEnrollmentId: string;
        newClasses: Array<{
            id: string;
            semesterId: string;
        }>;
        student: StudentForm;
        discountCodes: Array<string>;
        paymentMethod?: { nonce: string; deviceData: string };
        userCostsToSelectedClassIds: Record<string, number | undefined>;
        newAdditionalOptionIdsByClassId: { [classId: string]: Array<string> };
        expectedTotal?: number;
    }>(async (request, response, secrets, strings) => {
        const user = await AuthUtility.getUserFromRequest(request, response);

        if (!user) {
            response.status(401).send({ error: 'User not found' });
            return;
        }

        const {
            originalEnrollmentId,
            newClasses,
            student,
            discountCodes,
            paymentMethod,
            userCostsToSelectedClassIds,
            newAdditionalOptionIdsByClassId,
            expectedTotal,
        } = request.body.data;

        // Validate original enrollment
        const originalEnrollment =
            await ClassEnrollmentRepository.getById(originalEnrollmentId);

        if (!originalEnrollment) {
            response
                .status(404)
                .send({ error: 'Original enrollment not found' });
            return;
        }

        if (originalEnrollment.userId !== user.uid) {
            response.status(403).send({ error: 'Not authorized' });
            return;
        }

        if (originalEnrollment.status !== 'enrolled') {
            response
                .status(400)
                .send({ error: 'Original enrollment is not active' });
            return;
        }

        if (student?.id) {
            await _assertUserCanManageStudent(user, student.id, response);
        }

        // Determine what's truly new
        const hasNewClasses = newClasses.length > 0;
        const hasNewOptions = Object.values(
            newAdditionalOptionIdsByClassId
        ).some((opts) => opts.length > 0);

        if (!hasNewClasses && !hasNewOptions) {
            // Only student info update, no cost
            const updatedStudentDbEntry =
                _mapStudentFormToStudentDbEntry(student);
            if ('id' in updatedStudentDbEntry) {
                await StudentRepository.update(updatedStudentDbEntry);
            }

            await ClassEnrollmentRepository.create({
                userId: user.uid,
                studentName: `${student.firstName} ${student.lastName}`,
                contactEmail: student.contactEmail,
                finalCost: 0,
                discountIds: [],
                discounts: [],
                classes: [],
                additionalOptionIdsByClassId: {},
                transactionId: '',
                status: 'enrolled',
                studentId: student.id,
                enrollmentType: 'addendum',
                originalEnrollmentId,
            });

            response.send({
                success: true,
                email: student.contactEmail,
            });
            return;
        }

        // Build list of all items to price for the addendum
        // New classes + existing classes that have new options
        const classesToPrice: Array<{
            id: string;
            semesterId: string;
            additionalOptionIds: Array<string>;
        }> = [];
        const overrideCosts: Record<string, number> = {};

        for (const c of newClasses) {
            const allOptionIds = newAdditionalOptionIdsByClassId[c.id] ?? [];
            classesToPrice.push({
                ...c,
                additionalOptionIds: allOptionIds,
            });
        }

        // Existing classes with new options — zero the class cost
        for (const [classId, optionIds] of Object.entries(
            newAdditionalOptionIdsByClassId
        )) {
            if (newClasses.some((nc) => nc.id === classId)) continue;
            if (optionIds.length === 0) continue;

            if (!('classes' in originalEnrollment)) {
                response
                    .status(400)
                    .send({ error: 'Legacy enrollment format not supported' });
                return;
            }
            const originalClass = originalEnrollment.classes.find(
                (c) => c.id === classId
            );
            if (!originalClass) {
                response.status(400).send({
                    error: `Class ${classId} not found in original enrollment`,
                });
                return;
            }
            classesToPrice.push({
                id: classId,
                semesterId: originalClass.semesterId,
                additionalOptionIds: optionIds,
            });
            overrideCosts[classId] = 0;
        }

        // Check new classes aren't full
        if (hasNewClasses) {
            const newClassDetails = Object.values(
                await _getClasses(newClasses)
            ).flatMap((c) => c);
            const fullClasses = newClassDetails.filter(
                (c) => c.pausedForEnrollment
            );
            if (fullClasses.length > 0) {
                response.status(400).send({
                    error: 'One or more selected classes are full',
                    fullClassIds: fullClasses.map((c) => c.id),
                });
                return;
            }
        }

        // Use shared cost calculation (same logic as calculateBasket)
        const costResult = await _calculateEnrollmentCost({
            selectedClasses: classesToPrice,
            discountCodes,
            userCostsToClassIds: userCostsToSelectedClassIds,
            overrideCosts:
                Object.keys(overrideCosts).length > 0
                    ? overrideCosts
                    : undefined,
        });

        if ('error' in costResult) {
            response.status(400).send(costResult);
            return;
        }

        const { finalTotal, discountAmounts } = costResult;

        // Charge-time validation: reject if computed cost doesn't match preview
        if (
            expectedTotal !== undefined &&
            Math.abs(finalTotal - expectedTotal) > 0.01
        ) {
            response.status(409).send({
                error: 'Price changed since preview. Please review the updated cost.',
                expectedTotal,
                computedTotal: finalTotal,
            });
            return;
        }

        // Build the addendum enrollment record
        const addendumClasses = classesToPrice.map((c) => ({
            id: c.id,
            semesterId: c.semesterId,
        }));

        const enrollmentRecord = {
            userId: user.uid,
            studentName: `${student.firstName} ${student.lastName}`,
            contactEmail: student.contactEmail,
            finalCost: finalTotal,
            discountIds: discountCodes,
            discounts: discountAmounts.map((da) => ({
                description: da.code,
                amount: da.amount,
            })),
            classes: addendumClasses,
            additionalOptionIdsByClassId: newAdditionalOptionIdsByClassId,
            enrollmentType: 'addendum' as const,
            originalEnrollmentId,
        };

        const pendingEnrollmentId = await ClassEnrollmentRepository.create({
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
            // Update student info
            const updatedStudentDbEntry =
                _mapStudentFormToStudentDbEntry(student);
            if ('id' in updatedStudentDbEntry) {
                await StudentRepository.update(updatedStudentDbEntry);
            }

            await ClassEnrollmentRepository.create({
                ...enrollmentRecord,
                relatedId: pendingEnrollmentId,
                studentId: student.id,
                transactionId: transaction?.id ?? '',
                status: 'enrolled',
            });

            // Add student to NEW classes
            const classEnrollmentResults = await Promise.allSettled(
                newClasses.map(async (c) => {
                    await Semester.of(c.semesterId).classes.addStudentToClass(
                        student.id!,
                        c.id,
                        newAdditionalOptionIdsByClassId[c.id] ?? []
                    );
                    return c.id;
                })
            );

            // Add student to NEW options on EXISTING classes
            const existingClassOptionResults = await Promise.allSettled(
                Object.entries(newAdditionalOptionIdsByClassId)
                    .filter(
                        ([classId]) =>
                            !newClasses.some((nc) => nc.id === classId)
                    )
                    .filter(([, optionIds]) => optionIds.length > 0)
                    .map(async ([classId, optionIds]) => {
                        if (!('classes' in originalEnrollment)) {
                            throw new Error('Legacy format not supported');
                        }
                        const originalClass =
                            originalEnrollment.classes.find(
                                (c) => c.id === classId
                            );
                        if (!originalClass) {
                            throw new Error(
                                `Class ${classId} not found in original enrollment`
                            );
                        }
                        await Semester.of(
                            originalClass.semesterId
                        ).classes.addStudentToClass(
                            student.id!,
                            classId,
                            optionIds
                        );
                        return classId;
                    })
            );

            const allResults = [
                ...classEnrollmentResults,
                ...existingClassOptionResults,
            ];
            const failedClasses = allResults
                .filter(
                    (r): r is PromiseRejectedResult =>
                        r.status === 'rejected'
                )
                .map((r) => r.reason?.message ?? 'Unknown error');

            if (failedClasses.length > 0) {
                console.error(
                    'Some addendum class enrollments failed after payment:',
                    failedClasses
                );
            }

            response.send({
                success,
                email: student.contactEmail,
                ...(failedClasses.length > 0 ? { failedClasses } : {}),
            });
        } else {
            await ClassEnrollmentRepository.create({
                ...enrollmentRecord,
                relatedId: pendingEnrollmentId,
                failures:
                    errors?.deepErrors().map((e) => e.message) ?? [],
                status: 'failed',
            });
            response.send({
                success,
                errors: errors?.deepErrors() ?? [],
            });
        }
    });

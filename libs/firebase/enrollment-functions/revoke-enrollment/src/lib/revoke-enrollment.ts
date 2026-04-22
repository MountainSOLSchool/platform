import { Functions, Role } from '@sol/firebase/functions';
import { Braintree } from '@sol/payments/braintree';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import { Semester } from '@sol/firebase/classes/semester';
import type {
    RevokeEnrollmentRequest,
    RevokeEnrollmentResponse,
} from '@sol/ts/firebase/api-types';

export const revokeEnrollment = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<RevokeEnrollmentRequest>(async (request, response, secrets, strings) => {
        const { enrollmentId, classIdsToRevoke, refundAmount } = request.body.data;

        if (!enrollmentId) {
            response.status(400).send({ error: 'enrollmentId is required' });
            return;
        }

        const enrollment = await ClassEnrollmentRepository.getById(enrollmentId);

        if (!enrollment) {
            response.status(404).send({ error: 'Enrollment not found' });
            return;
        }

        if (enrollment.status !== 'enrolled') {
            response.status(400).send({ error: 'Enrollment is not in enrolled status' });
            return;
        }

        const allClasses = 'classes' in enrollment
            ? enrollment.classes
            : (enrollment as { classIds: string[] }).classIds.map((id) => ({ id, semesterId: '' }));

        const classesToRevoke = classIdsToRevoke?.length
            ? allClasses.filter((c) => classIdsToRevoke.includes(c.id))
            : allClasses;

        const isFullRevocation = classesToRevoke.length >= allClasses.length;
        const effectiveRefundAmount = refundAmount ?? enrollment.finalCost;

        let refunded = false;

        if (enrollment.transactionId && effectiveRefundAmount > 0) {
            const braintree = new Braintree(secrets, strings);
            const result = isFullRevocation
                ? await braintree.refund(enrollment.transactionId)
                : await braintree.refund(enrollment.transactionId, effectiveRefundAmount);

            if (!result.success) {
                const details = result.errors?.deepErrors().map((e) => e.message) ?? [];
                const isSettlementIssue = details.some((d) =>
                    d.toLowerCase().includes('settled')
                );
                response.status(400).send({
                    error: isSettlementIssue
                        ? 'Transaction has not settled yet. Partial refunds require a settled transaction. Please try again later or use a full revocation (void).'
                        : 'Refund failed: ' + details.join('; '),
                });
                return;
            }

            refunded = true;
        }

        if (enrollment.studentId) {
            await Promise.allSettled(
                classesToRevoke
                    .filter((c) => c.semesterId)
                    .map((c) =>
                        Semester.of(c.semesterId).classes.removeStudentFromClass(
                            enrollment.studentId!,
                            c.id,
                            enrollment.additionalOptionIdsByClassId[c.id] ?? []
                        )
                    )
            );
        }

        if (isFullRevocation) {
            await ClassEnrollmentRepository.updateStatus(enrollmentId, 'revoked');
        } else {
            const remainingClasses = allClasses.filter(
                (c) => !classIdsToRevoke!.includes(c.id)
            );
            const remainingOptions: Record<string, Array<string>> = {};
            for (const c of remainingClasses) {
                if (enrollment.additionalOptionIdsByClassId[c.id]) {
                    remainingOptions[c.id] =
                        enrollment.additionalOptionIdsByClassId[c.id];
                }
            }
            const newCost = enrollment.finalCost - effectiveRefundAmount;
            await ClassEnrollmentRepository.updateEnrollmentClasses(
                enrollmentId,
                remainingClasses,
                remainingOptions,
                newCost
            );
        }

        const result: RevokeEnrollmentResponse = {
            success: true,
            refunded,
            refundAmount: effectiveRefundAmount,
        };
        response.send(result);
    });

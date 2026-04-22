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
        const { enrollmentId } = request.body.data;

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

        let refunded = false;
        const refundAmount = enrollment.finalCost;

        if (enrollment.transactionId && enrollment.finalCost > 0) {
            const braintree = new Braintree(secrets, strings);
            const result = await braintree.refund(enrollment.transactionId);

            if (!result.success) {
                response.status(500).send({
                    error: 'Refund failed',
                    details: result.errors?.deepErrors().map((e) => e.message) ?? [],
                });
                return;
            }

            refunded = true;
        }

        const classes = 'classes' in enrollment
            ? enrollment.classes
            : (enrollment as { classIds: string[] }).classIds.map((id) => ({ id, semesterId: '' }));

        if (enrollment.studentId) {
            await Promise.allSettled(
                classes
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

        await ClassEnrollmentRepository.updateStatus(enrollmentId, 'revoked');

        const result: RevokeEnrollmentResponse = {
            success: true,
            refunded,
            refundAmount,
        };
        response.send(result);
    });

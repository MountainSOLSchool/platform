import { Functions, Role } from '@sol/firebase/functions';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import {
    _getClasses,
    _calculateEnrollmentCost,
} from '@sol/firebase/enrollment-functions/shared';
import type {
    PreviewPartialRevokeRequest,
    PreviewPartialRevokeResponse,
} from '@sol/ts/firebase/api-types';

export const previewPartialRevoke = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<PreviewPartialRevokeRequest>(async (request, response) => {
        const { enrollmentId, classIdsToRevoke } = request.body.data;

        if (!enrollmentId || !classIdsToRevoke?.length) {
            response.status(400).send({
                error: 'enrollmentId and classIdsToRevoke are required',
            });
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
            : (enrollment as { classIds: string[] }).classIds.map((id) => ({
                  id,
                  semesterId: '',
              }));

        const classesBySemester = await _getClasses(allClasses);
        const allClassDetails = Object.values(classesBySemester).flat();

        const classNames = allClassDetails.map((c) => ({
            id: c.id,
            semesterId: c.semesterId,
            name: c.title,
        }));

        const remainingClasses = allClasses.filter(
            (c) => !classIdsToRevoke.includes(c.id)
        );

        let recalculatedCost = 0;

        if (remainingClasses.length > 0) {
            const remainingWithOptions = remainingClasses.map((c) => ({
                ...c,
                additionalOptionIds:
                    enrollment.additionalOptionIdsByClassId[c.id] ?? [],
            }));

            const costResult = await _calculateEnrollmentCost({
                selectedClasses: remainingWithOptions,
                discountCodes: enrollment.discountIds,
                userCostsToClassIds: {},
            });

            if (!('error' in costResult)) {
                recalculatedCost = costResult.finalTotal;
            }
        }

        const suggestedRefund = Math.max(
            0,
            enrollment.finalCost - recalculatedCost
        );

        const result: PreviewPartialRevokeResponse = {
            originalCost: enrollment.finalCost,
            recalculatedCost,
            suggestedRefund,
            classNames,
        };
        response.send(result);
    });

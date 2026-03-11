import { AuthUtility, Functions } from '@sol/firebase/functions';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import { _getSemestersAvailableToEnroll } from '@sol/firebase/enrollment-functions/shared';

export const getEnrollmentForAddendum = Functions.endpoint.handle<{
    enrollmentId: string;
}>(async (request, response) => {
    const user = await AuthUtility.getUserFromRequest(request, response);

    if (!user) {
        response.status(401).send({ error: 'User not found' });
        return;
    }

    const { enrollmentId } = request.body.data;

    const enrollment = await ClassEnrollmentRepository.getById(enrollmentId);

    if (!enrollment) {
        response.status(404).send({ error: 'Enrollment not found' });
        return;
    }

    if (enrollment.userId !== user.uid) {
        response.status(403).send({ error: 'Not authorized' });
        return;
    }

    if (enrollment.status !== 'enrolled') {
        response.status(400).send({ error: 'Enrollment is not active' });
        return;
    }

    if (!('classes' in enrollment)) {
        response
            .status(400)
            .send({ error: 'Legacy enrollment format not supported for addendums' });
        return;
    }

    // Check which semesters in this enrollment are still open for registration
    const availableSemesters = await _getSemestersAvailableToEnroll();
    const availableSemesterIds = availableSemesters.map((s) => s.id);

    const enrollmentSemesterIds = [
        ...new Set(enrollment.classes.map((c) => c.semesterId)),
    ];
    const openSemesterIds = enrollmentSemesterIds.filter((id) =>
        availableSemesterIds.includes(id)
    );

    if (openSemesterIds.length === 0) {
        response
            .status(400)
            .send({ error: 'No semesters in this enrollment are still open for registration' });
        return;
    }

    // Get all prior addendums for this enrollment to know total existing selections
    const allAddendums = await ClassEnrollmentRepository.getAddendumsByOriginalId(enrollmentId);

    // Combine all classes and options from original + all addendums
    const allEnrolledClasses = [
        ...enrollment.classes,
        ...allAddendums.flatMap((a) =>
            'classes' in a ? a.classes : []
        ),
    ];
    const allAdditionalOptionIdsByClassId: Record<string, Array<string>> = {};

    // Merge from original enrollment
    for (const [classId, optionIds] of Object.entries(
        enrollment.additionalOptionIdsByClassId ?? {}
    )) {
        allAdditionalOptionIdsByClassId[classId] = [...(optionIds ?? [])];
    }
    // Merge from addendums
    for (const addendum of allAddendums) {
        for (const [classId, optionIds] of Object.entries(
            addendum.additionalOptionIdsByClassId ?? {}
        )) {
            if (!allAdditionalOptionIdsByClassId[classId]) {
                allAdditionalOptionIdsByClassId[classId] = [];
            }
            allAdditionalOptionIdsByClassId[classId] = [
                ...new Set([
                    ...allAdditionalOptionIdsByClassId[classId],
                    ...(optionIds ?? []),
                ]),
            ];
        }
    }

    response.send({
        enrollment: {
            id: enrollment.id,
            studentId: enrollment.studentId,
            studentName: enrollment.studentName,
            classes: allEnrolledClasses,
            additionalOptionIdsByClassId: allAdditionalOptionIdsByClassId,
            openSemesterIds,
        },
    });
});

import { AuthUtility, Functions } from '@sol/firebase/functions';
import { Enrollment } from '@sol/student/domain';
import { DatabaseUtility } from '@sol/firebase/database';
import { _assertUserCanManageStudent } from '@sol/firebase/enrollment-functions/shared';

export const updateEnrollmentDraft = Functions.endpoint.handle<
    Partial<Enrollment>
>(async (request, response) => {
    const user = await AuthUtility.getUserFromRequest(request, response);

    if (!user) {
        // getUserFromRequest already sent a 403.
        return;
    }

    const enrollmentDraft = request.body.data;

    if (enrollmentDraft.student?.id) {
        await _assertUserCanManageStudent(
            user,
            enrollmentDraft.student.id,
            response
        );
    }

    const draftDoc = DatabaseUtility.getDatabase()
        .collection('enrollment_draft')
        .doc(user.uid);

    const doesDocExist = (await draftDoc.get()).exists;
    if (!doesDocExist) {
        await draftDoc.set(enrollmentDraft);
    } else {
        await draftDoc.update(enrollmentDraft);
    }

    response.send({ success: true });
});

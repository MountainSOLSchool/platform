import {
    _assertUserCanManageStudent,
    _doesStudentInfoRequireReview,
    _mapStudentFormToStudentDbEntry,
} from '@sol/firebase/enrollment-functions/shared';
import { AuthUtility, Functions } from '@sol/firebase/functions';

export const doesStudentInfoRequireReview = Functions.endpoint.handle<{
    studentId: string;
}>(async (request, response) => {
    const user = await AuthUtility.getUserFromRequest(request, response);

    if (!user) {
        // getUserFromRequest already sent a 403.
        return;
    }

    const { studentId } = request.body.data;

    await _assertUserCanManageStudent(user, studentId, response);

    response.send({
        isOutOfDate: await _doesStudentInfoRequireReview(studentId, {
            request,
            response,
        }),
    });
});

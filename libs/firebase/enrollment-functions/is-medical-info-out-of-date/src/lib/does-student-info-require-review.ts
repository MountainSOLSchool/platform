import { AuthUtility, Functions } from '@sol/firebase/functions';
import { StudentForm } from '@sol/student/domain';
import { _assertUserCanManageStudent, _doesStudentInfoRequireReview, _mapStudentFormToStudentDbEntry } from '@sol/firebase/enrollment-functions/shared';

export const doesStudentInfoRequireReview = Functions.endpoint.handle<{
    student: StudentForm;
}>(
    async (request, response) => {
        const user = await AuthUtility.getUserFromRequest(request, response);

        if (!user) {
            response.status(401).send({ error: 'User not found' });
            return;
        }

        const {
            student,
        } = request.body.data;

        if (student?.id) {
            await _assertUserCanManageStudent(user, student.id, response);
        }

        const updatedStudentDbEntry = _mapStudentFormToStudentDbEntry(student);

        response.send({
            isOutOfDate: 'id' in updatedStudentDbEntry && await _doesStudentInfoRequireReview(updatedStudentDbEntry)
        });
    }
);

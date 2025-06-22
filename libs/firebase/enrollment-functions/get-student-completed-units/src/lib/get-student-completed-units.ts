import { _assertUserCanManageStudent } from '@sol/firebase/enrollment-functions/shared';
import { StudentRepository } from '@sol/student/repository';
import { AuthUtility, Functions } from '@sol/firebase/functions';

export const getStudentCompletedUnits = Functions.endpoint.handle<{
    studentId: string;
}>(async (request, response) => {
    const user = await AuthUtility.getUserFromRequest(request, response);
    if (!user) {
        response.send({ studentIds: [] });
        return;
    }
    const { studentId } = request.body.data;

    await _assertUserCanManageStudent(user, studentId, response);

    const student = await StudentRepository.get(studentId);

    if (!student) {
        response.status(404).send();
        return;
    }
    response.send({
        student: {
            name: student.first_name,
            completed_units: student.completed_units?.map((ref: any) => ref.id),
        },
    });
});

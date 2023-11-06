import { Functions, Role } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';
import { Semester } from '@sol/firebase/classes/semester';
import { StudentHealthTableFactory } from '@sol/student/reports';

async function getClassStudentHealthTable(classId: string) {
    const students =
        await StudentRepository.enrolledInActiveSemester().getInClass(classId);

    const className = await Semester.active()
        .classes.get(classId)
        .then((c) => c.title);

    return new StudentHealthTableFactory().build(students, [className]);
}

export const studentHealth = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<unknown, { classId: string }>(async (request, response) => {
        const classId = request.query.classId;

        const htmlTable = await getClassStudentHealthTable(classId);

        response.send({ html: htmlTable });
    });

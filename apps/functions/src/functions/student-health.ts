import { V1Functions, V1Role } from '@sol/firebase/functions';
import { V1StudentRepository } from '@sol/student/repository';
import { V1Semester } from '@sol/firebase/classes/semester';
import { StudentHealthTableFactory } from '@sol/student/reports';
import { SpecificSemesterRepository } from '@sol/classes/repository';

async function getClassStudentHealthTable(classId: string, semesterId: string) {
    const students = await V1StudentRepository.of(
        SpecificSemesterRepository.of(semesterId)
    ).getInClass(classId);

    const className = await V1Semester.of(semesterId)
        .classes.get(classId)
        .then((c) => c.title);

    return new StudentHealthTableFactory().build(students, [className]);
}

export const studentHealth = V1Functions.endpoint
    .restrictedToRoles(V1Role.Admin)
    .handle<
        unknown,
        { classId: string; semesterId: string }
    >(async (request, response) => {
        const { classId, semesterId } = request.query;

        const htmlTable = await getClassStudentHealthTable(classId, semesterId);

        response.send({ html: htmlTable });
    });

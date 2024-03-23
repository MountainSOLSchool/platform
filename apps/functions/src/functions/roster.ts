import { StudentRepository } from '@sol/student/repository';
import { Functions, Role } from '@sol/firebase/functions';
import { Semester } from '@sol/firebase/classes/semester';
import { RosterTableFactory } from '@sol/student/reports';
import { SpecificSemesterRepository } from '@sol/classes/repository';

async function getClassRosterTable(classId: string, semesterId: string) {
    const students = await StudentRepository.of(
        SpecificSemesterRepository.of(semesterId)
    ).getInClass(classId);

    const className = await Semester.of(semesterId)
        .classes.get(classId)
        .then((c) => c.title);

    return new RosterTableFactory().build(students, [className]);
}

export const roster = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<
        unknown,
        { classId: string; semesterId: string }
    >(async (request, response) => {
        const { classId, semesterId } = request.query;

        const htmlTable = await getClassRosterTable(classId, semesterId);

        response.send({ html: htmlTable });
    });

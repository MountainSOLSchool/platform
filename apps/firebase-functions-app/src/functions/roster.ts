import { StudentRepository } from '@sol/student/repository';
import { Functions, Role } from '@sol/firebase/functions';
import { Semester } from '@sol/firebase/classes/semester';
import { RosterTableFactory } from '@sol/student/reports';

async function getClassRosterTable(classId: string) {
    const students =
        await StudentRepository.enrolledInActiveSemester().getInClass(classId);

    const className = await Semester.active()
        .classes.get(classId)
        .then((c) => c.title);

    return new RosterTableFactory().build(students, [className]);
}

export const roster = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<unknown, { classId: string }>(async (request, response) => {
        const classId = request.query.classId;

        const htmlTable = await getClassRosterTable(classId);

        response.send({ html: htmlTable });
    });

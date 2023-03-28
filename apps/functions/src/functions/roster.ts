import { StudentRepository } from '@sol/student/repository';
import { RosterReportGenerator } from '@sol/student/reports';
import { TableHtml } from '@sol/table/html';
import { Functions, Role } from '@sol/firebase/functions';
import {
    SemesterRepository,
    SUMMER_2023_SEMESTER,
} from '@sol/classes/repository';

async function getClassRosterTable(classId: string) {
    const students = await StudentRepository.fetchStudents(classId);

    const studentRecords =
        RosterReportGenerator.transformStudentEntriesIntoRosterRecords(
            students
        );

    const className = await SemesterRepository.of(SUMMER_2023_SEMESTER)
        .classes.get(classId)
        .then((c) => c.title);

    return TableHtml.generateHtmlTableFromRecords({
        records: studentRecords,
        headers: RosterReportGenerator.studentRowHeaders,
        title: `Class Roster for ${className}`,
        styleBuilder: RosterReportGenerator.buildStudentRecordStyle,
    });
}

export const roster = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<unknown, { classId: string }>(async (request, response) => {
        const classId = request.query.classId;

        const htmlTable = await getClassRosterTable(classId);

        response.send({ html: htmlTable });
    });

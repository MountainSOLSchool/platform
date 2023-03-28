import { StudentRepository } from '@sol/student/repository';
import { RosterReportGenerator } from '@sol/student/reports';
import { TableHtml } from '@sol/table/html';
import { Functions, Role } from '@sol/firebase/functions';

async function getClassRosterTable(classId: string) {
    const students = await StudentRepository.fetchStudents(classId);

    const studentRecords =
        RosterReportGenerator.transformStudentEntriesIntoRosterRecords(
            students
        );

    return TableHtml.generateHtmlTableFromRecords({
        records: studentRecords,
        headers: RosterReportGenerator.studentRowHeaders,
        title: `Class Roster for ${classId}`,
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

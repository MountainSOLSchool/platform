import { StudentRepository } from '@sol/student/repository';
import { RosterReportGenerator } from '@sol/student/reports';
import { TableHtml } from '@sol/table/html';
import { Functions, Role } from '@sol/firebase/functions';

async function getClassRosterTable(className: string) {
    const students = await StudentRepository.fetchStudents(className);

    const studentRecords =
        RosterReportGenerator.transformStudentEntriesIntoRosterRecords(
            students
        );

    return TableHtml.generateHtmlTableFromRecords({
        records: studentRecords,
        headers: RosterReportGenerator.studentRowHeaders,
        title: `Class Roster for ${className}`,
        styleBuilder: RosterReportGenerator.buildStudentRecordStyle,
    });
}

export const roster = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const className = request.query.class as string;

        const htmlTable = await getClassRosterTable(className);

        response.send({ html: htmlTable });
    });

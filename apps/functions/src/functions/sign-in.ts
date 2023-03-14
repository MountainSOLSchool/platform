import { Functions, Role } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';
import { RosterReportGenerator } from '@sol/student/reports';
import { TableHtml } from '@sol/table/html';

async function getClassSignInTable(className: string) {
    const students = await StudentRepository.fetchStudents(className);

    const studentRecords =
        RosterReportGenerator.transformStudentEntriesIntoSignInSheet(students);

    const htmlTable = TableHtml.generateHtmlTableFromRecords({
        records: studentRecords,
        headers: RosterReportGenerator.signInRowHeaders,
        title: `Sign In/Out for ${className}`,
    });
    return htmlTable;
}

export const signIn = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const className = request.query.class as string;

        const htmlTable = await getClassSignInTable(className);

        response.send({ html: htmlTable });
    });

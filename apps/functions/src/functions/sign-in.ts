import { Functions, Role } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';
import { RosterReportGenerator } from '@sol/student/reports';
import { TableHtml } from '@sol/table/html';
import {
    SemesterRepository,
    SUMMER_2023_SEMESTER,
} from '@sol/classes/repository';

async function getClassSignInTable(classId: string) {
    const students = await StudentRepository.getEnrolled(classId);

    const studentRecords =
        RosterReportGenerator.transformStudentEntriesIntoSignInSheet(students);

    const className = await SemesterRepository.of(SUMMER_2023_SEMESTER)
        .classes.get(classId)
        .then((c) => c.title);

    const htmlTable = TableHtml.generateHtmlTableFromRecords({
        records: studentRecords,
        headers: RosterReportGenerator.signInRowHeaders,
        title: `Sign In/Out for ${className}`,
    });
    return htmlTable;
}

export const signIn = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<unknown, { classId: string }>(async (request, response) => {
        const classId = request.query.classId;

        const htmlTable = await getClassSignInTable(classId);

        response.send({ html: htmlTable });
    });

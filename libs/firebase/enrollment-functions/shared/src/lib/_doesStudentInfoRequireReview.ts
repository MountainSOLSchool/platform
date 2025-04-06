import { StudentDbEntry } from "@sol/student/domain";
import { StudentRepository } from "@sol/student/repository";
import { ClassEnrollmentRepository } from "@sol/classes/enrollment/repository";
import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';
import { SemesterEnrollment } from "@sol/classes/domain";

export async function _doesStudentInfoRequireReview(studentDbEntry: StudentDbEntry, userContext: {
    request: Request,
    response: express.Response
}): Promise<boolean> {

    const currentStudentDbEntry = await StudentRepository.get(studentDbEntry.id);

    if (!currentStudentDbEntry) {
        return false;
    }

    const userEnrollments = await ClassEnrollmentRepository.getCurrentUserCompletedEnrollments(userContext.request, userContext.response);
    const [earliestStudentEnrollment] = userEnrollments
        .filter(enrollment => enrollment.studentId === currentStudentDbEntry.id)
        .sort((a, b) => a.timestamp._seconds - b.timestamp._seconds) as Array<SemesterEnrollment | undefined>;
    const earliestStudentEnrollmentTimestamp = earliestStudentEnrollment?.timestamp._seconds ?? 0;

    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    return (currentStudentDbEntry.last_reviewed_student_info_timestamp && new Date(currentStudentDbEntry.last_reviewed_student_info_timestamp) < twoYearsAgo) ||
        earliestStudentEnrollmentTimestamp < twoYearsAgo.getTime() / 1000;
}
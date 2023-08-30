import { StudentRepository } from '@sol/student/repository';

export class ClassEmailGenerator {
    static async createEmailList(classId: string) {
        const students =
            await StudentRepository.enrolledInActiveSemester().getInClass(
                classId
            );
        return students.map(
            (student) =>
                `${student.primary_first_name} ${student.primary_last_name} <${student.primary_email}>`
        );
    }
}

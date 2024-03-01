import { SpecificSemesterRepository } from '@sol/classes/repository';
import { StudentRepository } from '@sol/student/repository';

export class ClassEmailGenerator {
    static async createEmailList(classId: string, semesterId: string) {
        const students = await StudentRepository.of(
            SpecificSemesterRepository.of(semesterId)
        ).getInClass(classId);
        return students.map(
            (student) =>
                `${student.primary_first_name} ${student.primary_last_name} <${student.primary_email}>`
        );
    }
}

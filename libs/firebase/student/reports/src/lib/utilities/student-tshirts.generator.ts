import {
    SemesterRepository,
    SUMMER_2023_SEMESTER,
} from '@sol/classes/repository';
import { StudentDbEntry } from '@sol/student/domain';

export class StudentTshirtsGenerator {
    static async createTshirtList() {
        const students = await SemesterRepository.of(
            SUMMER_2023_SEMESTER
        ).students.getEnrolled();
        const uniqueStudentsByNameAndBirthdate: Map<string, StudentDbEntry> =
            students.reduce(
                (unique, student) =>
                    unique.set(
                        `${student.first_name}${student.last_name}${student.birth_date}`,
                        student
                    ),
                new Map<string, StudentDbEntry>()
            );
        return Array.from(uniqueStudentsByNameAndBirthdate.values()).map(
            (student) => ({
                firstName: student.first_name,
                lastName: student.last_name,
                size: student.tshirt_size,
            })
        );
    }
}

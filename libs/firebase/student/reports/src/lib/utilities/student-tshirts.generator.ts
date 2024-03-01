import { StudentDbEntry } from '@sol/student/domain';
import { Semester } from '@sol/firebase/classes/semester';

export class StudentTshirtsGenerator {
    static async createTshirtList(semseterId: string) {
        const students = await Semester.of(semseterId).students.getAll();
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

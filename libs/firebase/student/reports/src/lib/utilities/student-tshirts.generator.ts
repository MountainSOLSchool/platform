import { StudentRepository } from '@sol/student/repository';

export class StudentTshirtsGenerator {
    static async createTshirtList() {
        const students = await StudentRepository.fetchStudents();
        return students.map((student) => ({
            firstName: student.first_name,
            lastName: student.last_name,
            size: student.tshirt_size,
        }));
    }
}

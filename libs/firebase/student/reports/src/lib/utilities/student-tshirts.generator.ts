import {
    SemesterRepository,
    SUMMER_2023_SEMESTER,
} from '@sol/classes/repository';

export class StudentTshirtsGenerator {
    static async createTshirtList() {
        const students = await SemesterRepository.of(
            SUMMER_2023_SEMESTER
        ).students.getEnrolled();
        return students.map((student) => ({
            firstName: student.first_name,
            lastName: student.last_name,
            size: student.tshirt_size,
        }));
    }
}

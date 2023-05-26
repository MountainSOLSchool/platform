import { StudentRepository } from '@sol/student/repository';
import { SUMMER_2023_SEMESTER } from '@sol/classes/repository';

export class ClassEmailGenerator {
    static async createEmailList(className: string) {
        const students = await StudentRepository.of(
            SUMMER_2023_SEMESTER
        ).getEnrolled(className);
        return students.map((student) => {
            const primaryContact = student.emergency_contacts?.[0];
            return `${primaryContact ? primaryContact.first_name + ' ' : ''}${
                primaryContact ? primaryContact.last_name + ' ' : ''
            }<${student.primary_email}>`;
        });
    }
}

import { StudentRepository } from '@sol/student/repository';

export class ClassEmailGenerator {
    static async createEmailList(className: string) {
        const students = await StudentRepository.getEnrolled(className);
        return students.map((student) => {
            const primaryContact = student.emergency_contacts?.[0];
            return `${primaryContact ? primaryContact.first_name + ' ' : ''}${
                primaryContact ? primaryContact.last_name + ' ' : ''
            }<${student.primary_email}>`;
        });
    }
}

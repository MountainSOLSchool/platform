import { StudentRepository } from '@sol/student/repository';
import * as admin from 'firebase-admin';

export class ClassEmailGenerator {
    private studentRepositoryUtility: StudentRepository;

    constructor(private readonly database: admin.firestore.Firestore) {
        this.studentRepositoryUtility = new StudentRepository(database);
    }

    public async createEmailList(className: string) {
        const students = await this.studentRepositoryUtility.fetchStudents(
            className
        );
        return students.map((student) => {
            const primaryContact = student.emergency_contacts?.[0];
            return `${primaryContact ? primaryContact.first_name + ' ' : ''}${
                primaryContact ? primaryContact.last_name + ' ' : ''
            }<${student.primary_email}>`;
        });
    }
}

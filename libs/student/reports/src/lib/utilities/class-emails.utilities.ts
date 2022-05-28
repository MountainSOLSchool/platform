import { StudentRepositoryUtility } from '@sol/student/persistence';
import * as admin from 'firebase-admin';

export class ClassEmailGenerator {
    private studentRepositoryUtility: StudentRepositoryUtility;

    constructor(private readonly database: admin.firestore.Firestore) {
        this.studentRepositoryUtility = new StudentRepositoryUtility(database);
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

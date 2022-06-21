import { StudentRepositoryUtility } from '@sol/student/persistence';
import * as admin from 'firebase-admin';

export class StudentTshirtsGenerator {
    private studentRepositoryUtility: StudentRepositoryUtility;

    constructor(private readonly database: admin.firestore.Firestore) {
        this.studentRepositoryUtility = new StudentRepositoryUtility(database);
    }

    public async createTshirtList() {
        const students = await this.studentRepositoryUtility.fetchStudents();
        return students.map((student) => ({
            firstName: student.first_name,
            lastName: student.last_name,
            size: student.tshirt_size,
        }));
    }
}

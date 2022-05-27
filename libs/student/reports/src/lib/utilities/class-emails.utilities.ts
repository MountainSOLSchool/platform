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
        return students
            .map(
                (student) =>
                    student.guardians?.map(
                        (guardian) =>
                            `${guardian.first_name} ${guardian.last_name} <${guardian.email}>`
                    ) ?? []
            )
            .reduce((aggregated, emails) => [...aggregated, ...emails], []);
    }
}

import * as admin from 'firebase-admin';
import { StudentUtility } from './student.utility';

export class ClassEmailGenerator {
    private studentUtility: StudentUtility;

    constructor(private readonly database: admin.firestore.Firestore) {
        this.studentUtility = new StudentUtility(database);
    }

    public async createEmailList(className: string) {
        const students = await this.studentUtility.fetchStudents(className);
        console.log(students);
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

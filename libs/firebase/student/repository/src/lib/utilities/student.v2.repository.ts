import { StudentDbEntry } from '@sol/student/domain';
import { DatabaseV2Utility } from '@sol/firebase/database';

export class StudentV2Repository {
    private static get database() {
        return DatabaseV2Utility.getDatabase();
    }

    static async get(id: string): Promise<StudentDbEntry | undefined> {
        return (
            await DatabaseV2Utility.getHydratedDocuments<StudentDbEntry>([
                this.database.collection('students').doc(id),
            ])
        )[0];
    }
}

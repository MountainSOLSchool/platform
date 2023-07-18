import { SemesterRepository } from './semester.repository';
import { DatabaseUtility } from '@sol/firebase/database';

export class ActiveSemesterRepository extends SemesterRepository {
    static of(): ActiveSemesterRepository {
        return new ActiveSemesterRepository();
    }

    async getPath(): Promise<string> {
        const activeSemesterDoc = await DatabaseUtility.getDocumentRef(
            `config/activeSemester`
        );
        const activeSemester = await activeSemesterDoc.get();
        const activeSemesterId = activeSemester.data()?.id;
        return `${this.getBasePath()}/${activeSemesterId}`;
    }
}

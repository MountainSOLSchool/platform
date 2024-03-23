import { SemesterRepository } from './semester.repository';
import { V1DatabaseUtility } from '@sol/firebase/database';

export class ActiveSemesterRepository extends SemesterRepository {
    static of(): ActiveSemesterRepository {
        return new ActiveSemesterRepository();
    }

    async getId(): Promise<string> {
        const activeSemesterDoc = await V1DatabaseUtility.getDocumentRef(
            `config/activeSemester`
        );
        const activeSemester = await activeSemesterDoc.get();
        return activeSemester.data()?.id;
    }

    async getPath(): Promise<string> {
        const activeSemesterDoc = await V1DatabaseUtility.getDocumentRef(
            `config/activeSemester`
        );
        const activeSemester = await activeSemesterDoc.get();
        const activeSemesterId = activeSemester.data()?.id;
        return `${this.getBasePath()}/${activeSemesterId}`;
    }
}

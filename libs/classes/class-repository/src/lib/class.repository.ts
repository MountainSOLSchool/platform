import { Class } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';

export class ClassRepository {
    static async get(id: string): Promise<Class> {
        const document = await DatabaseUtility.getDocumentRef(`classes/${id}`);
        const [data] = await DatabaseUtility.getHydratedDocuments([document]);
        return data as Class;
    }
}

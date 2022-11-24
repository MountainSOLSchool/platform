import { Discount } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';

export class DiscountRepository {
    static async get(code: string): Promise<Discount | undefined> {
        const document = await DatabaseUtility.fetchFirstMatchingDocument(
            DatabaseUtility.getDatabase().collection('discounts'),
            ['code', '==', code]
        );
        const data = document?.data();
        return data as Discount | undefined;
    }
}

import { Discount, DiscountDbo, DiscountFactory } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';

export class DiscountRepository {
    static async get(code: string): Promise<Discount<unknown> | undefined> {
        const document = await DatabaseUtility.fetchFirstMatchingDocument(
            DatabaseUtility.getDatabase().collection('discounts'),
            ['code', '==', code]
        );
        const data = document?.data();
        return data ? DiscountFactory.fromDbo(data as DiscountDbo) : undefined;
    }
}

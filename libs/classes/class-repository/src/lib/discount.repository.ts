import {
    AbstractDiscount,
    Discount,
    DiscountFactory,
} from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';

export class DiscountRepository {
    static async get(
        code: string
    ): Promise<AbstractDiscount<unknown> | undefined> {
        const document = await DatabaseUtility.fetchFirstMatchingDocument(
            DatabaseUtility.getDatabase().collection('discounts'),
            ['code', '==', code]
        );
        const data = document?.data();
        return data ? DiscountFactory.fromDbo(data as Discount) : undefined;
    }
    static async getAllByProperty(
        propertyName: string,
        propertyValue: unknown
    ): Promise<Array<AbstractDiscount<unknown>>> {
        const documents = await DatabaseUtility.fetchAllMatchingDocuments(
            DatabaseUtility.getDatabase().collection('discounts'),
            [propertyName, '==', propertyValue]
        );
        return documents
            .map((doc) => doc.data())
            .map((dbo) => DiscountFactory.fromDbo(dbo as Discount));
    }

    static async getAllValid(
        codes: Array<string>
    ): Promise<Array<AbstractDiscount<unknown>>> {
        const discounts = await Promise.all(codes.map(DiscountRepository.get));
        return discounts.filter((d): d is AbstractDiscount<unknown> => !!d);
    }
}

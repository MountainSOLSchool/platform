import { Discount, DiscountDbo, DiscountFactory } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';
import { StudentDbEntry } from '@sol/student/domain';

export class ClassEnrollmentRepository {
    static async get(code: string): Promise<Discount<unknown> | undefined> {
        const document = await DatabaseUtility.fetchFirstMatchingDocument(
            DatabaseUtility.getDatabase().collection('discounts'),
            ['code', '==', code]
        );
        const data = document?.data();
        return data ? DiscountFactory.fromDbo(data as DiscountDbo) : undefined;
    }

    static async create(
        student: StudentDbEntry,
        classes,
        total,
        discounts
    ): string {}
}

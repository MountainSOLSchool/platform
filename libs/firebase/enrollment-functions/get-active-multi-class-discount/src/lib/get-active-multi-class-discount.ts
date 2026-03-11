import { Functions } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type { GetActiveMultiClassDiscountResponse } from '@sol/ts/firebase/api-types';

export const getActiveMultiClassDiscount = Functions.endpoint
    .handle(async (_request, response) => {
        const db = DatabaseUtility.getDatabase();

        const snapshot = await db
            .collection('discounts')
            .where('type', '==', 'buy-x-class-type-percent')
            .where('active', '==', true)
            .limit(1)
            .get();

        const doc = snapshot.docs[0];
        const result: GetActiveMultiClassDiscountResponse = doc
            ? {
                  discount: {
                      classTypes: doc.data()['classTypes'] ?? [],
                      minimum: doc.data()['minimum'] ?? 0,
                      percent: doc.data()['percent'] ?? 0,
                      code: doc.data()['code'] ?? '',
                  },
              }
            : { discount: null };

        response.send(result);
    });

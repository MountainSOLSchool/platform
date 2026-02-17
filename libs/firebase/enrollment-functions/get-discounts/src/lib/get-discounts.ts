import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    DiscountAdmin,
    GetDiscountsResponse,
} from '@sol/ts/firebase/api-types';

export const getDiscounts = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<void>(async (_request, response) => {
        const db = DatabaseUtility.getDatabase();
        const snapshot = await db.collection('discounts').get();

        const discounts: DiscountAdmin[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                code: data['code'] ?? '',
                type: data['type'] ?? 'amount',
                active: data['active'] ?? false,
                amount: data['amount'],
                percent: data['percent'],
                date: data['date']?._seconds
                    ? new Date(data['date']._seconds * 1000).toISOString()
                    : data['date'],
                classOrGroupIds: data['classOrGroupIds'],
                classTypes: data['classTypes'],
                minimum: data['minimum'],
            };
        });

        const result: GetDiscountsResponse = { discounts };
        response.send(result);
    });

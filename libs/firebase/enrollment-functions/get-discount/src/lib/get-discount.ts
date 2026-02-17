import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    DiscountAdmin,
    GetDiscountRequest,
    GetDiscountResponse,
} from '@sol/ts/firebase/api-types';

export const getDiscount = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<GetDiscountRequest>(async (request, response) => {
        const { id } = request.body.data;

        if (!id) {
            response.status(400).send({ error: 'id is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const doc = await db.collection('discounts').doc(id).get();

        if (!doc.exists) {
            const result: GetDiscountResponse = { discount: null };
            response.send(result);
            return;
        }

        const data = doc.data()!;
        const discount: DiscountAdmin = {
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

        const result: GetDiscountResponse = { discount };
        response.send(result);
    });

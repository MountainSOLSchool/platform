import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    CreateDiscountRequest,
    CreateDiscountResponse,
} from '@sol/ts/firebase/api-types';
import admin from 'firebase-admin';

export const createDiscount = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<CreateDiscountRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.code || !data.type) {
            response
                .status(400)
                .send({ error: 'code and type are required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();

        const doc: Record<string, unknown> = {
            code: data.code.toUpperCase(),
            type: data.type,
            active: data.active ?? false,
        };

        if (data.amount !== undefined) doc['amount'] = data.amount;
        if (data.percent !== undefined) doc['percent'] = data.percent;
        if (data.date) {
            doc['date'] = admin.firestore.Timestamp.fromDate(
                new Date(data.date)
            );
        }
        if (data.classOrGroupIds) doc['classOrGroupIds'] = data.classOrGroupIds;
        if (data.classTypes) doc['classTypes'] = data.classTypes;
        if (data.minimum !== undefined) doc['minimum'] = data.minimum;

        const docRef = await db.collection('discounts').add(doc);

        const result: CreateDiscountResponse = {
            success: true,
            discountId: docRef.id,
        };
        response.send(result);
    });

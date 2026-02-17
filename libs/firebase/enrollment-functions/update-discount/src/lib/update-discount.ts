import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    UpdateDiscountRequest,
    UpdateDiscountResponse,
} from '@sol/ts/firebase/api-types';
import admin from 'firebase-admin';

export const updateDiscount = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<UpdateDiscountRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.id) {
            response.status(400).send({ error: 'id is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const docRef = db.collection('discounts').doc(data.id);
        const existing = await docRef.get();

        if (!existing.exists) {
            response.status(404).send({ error: 'Discount not found' });
            return;
        }

        const code = data.code.toUpperCase();

        const duplicates = await db
            .collection('discounts')
            .where('code', '==', code)
            .limit(2)
            .get();

        const hasDuplicate = duplicates.docs.some((doc) => doc.id !== data.id);
        if (hasDuplicate) {
            response.send({
                success: false,
                error: 'DUPLICATE_CODE',
            } satisfies UpdateDiscountResponse);
            return;
        }

        const doc: Record<string, unknown> = {
            code,
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

        await docRef.set(doc, { merge: false });

        const result: UpdateDiscountResponse = { success: true };
        response.send(result);
    });

import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    DeleteDiscountRequest,
    DeleteDiscountResponse,
} from '@sol/ts/firebase/api-types';

export const deleteDiscount = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<DeleteDiscountRequest>(async (request, response) => {
        const { id } = request.body.data;

        if (!id) {
            response.status(400).send({ error: 'id is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const docRef = db.collection('discounts').doc(id);
        const existing = await docRef.get();

        if (!existing.exists) {
            response.status(404).send({ error: 'Discount not found' });
            return;
        }

        await docRef.delete();

        const result: DeleteDiscountResponse = { success: true };
        response.send(result);
    });

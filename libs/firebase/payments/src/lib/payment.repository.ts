import { DatabaseUtility } from '@sol/firebase/database';
import { type Firestore } from 'firebase-admin/firestore';
import { PaymentDbo } from '@sol/payments/domain';

export class PaymentRepository {
    private static get database(): Firestore {
        return DatabaseUtility.getDatabase();
    }

    static async create(
        payment: Omit<PaymentDbo, 'timestamp'>
    ): Promise<string> {
        const { id } = await this.database
            .collection('payments')
            .add({ ...payment, timestamp: new Date() });
        return id;
    }

    static async update(
        id: string,
        updates: Partial<PaymentDbo>
    ): Promise<void> {
        await this.database.collection('payments').doc(id).update(updates);
    }

    static async get(id: string): Promise<PaymentDbo | undefined> {
        const doc = await this.database.collection('payments').doc(id).get();
        if (!doc.exists) {
            return undefined;
        }
        return doc.data() as PaymentDbo;
    }
}

import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    UpdateEnrollmentMessagesRequest,
    UpdateEnrollmentMessagesResponse,
} from '@sol/ts/firebase/api-types';

export const updateEnrollmentMessages = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<UpdateEnrollmentMessagesRequest>(async (request, response) => {
        const { messages } = request.body.data;

        if (!Array.isArray(messages)) {
            response.status(400).send({ error: 'messages array is required' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const collectionRef = db.collection(
            'config/enrollmentMessages/messages'
        );

        // Delete all existing messages
        const existing = await collectionRef.get();
        const batch = db.batch();
        existing.docs.forEach((doc) => batch.delete(doc.ref));

        // Write all new messages
        messages.forEach((msg, index) => {
            const docRef = msg.id
                ? collectionRef.doc(msg.id)
                : collectionRef.doc();
            batch.set(docRef, {
                text: msg.text,
                severity: msg.severity,
                active: msg.active,
                startDate: msg.startDate || null,
                endDate: msg.endDate || null,
                sortOrder: index,
            });
        });

        await batch.commit();

        const result: UpdateEnrollmentMessagesResponse = { success: true };
        response.send(result);
    });

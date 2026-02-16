import { Functions } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    EnrollmentMessage,
    GetEnrollmentMessagesResponse,
} from '@sol/ts/firebase/api-types';

export const getEnrollmentMessages = Functions.endpoint.handle<void>(
    async (_request, response) => {
        const db = DatabaseUtility.getDatabase();
        const snapshot = await db
            .collection('config/enrollmentMessages/messages')
            .orderBy('sortOrder', 'asc')
            .get();

        const now = new Date().toISOString();

        const messages: EnrollmentMessage[] = snapshot.docs
            .map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    text: data['text'] ?? '',
                    severity: data['severity'] ?? 'info',
                    active: data['active'] ?? false,
                    startDate: data['startDate'],
                    endDate: data['endDate'],
                    sortOrder: data['sortOrder'] ?? 0,
                };
            })
            .filter((msg) => {
                if (!msg.active) return false;
                if (msg.startDate && msg.startDate > now) return false;
                if (msg.endDate && msg.endDate < now) return false;
                return true;
            });

        const result: GetEnrollmentMessagesResponse = { messages };
        response.send(result);
    }
);

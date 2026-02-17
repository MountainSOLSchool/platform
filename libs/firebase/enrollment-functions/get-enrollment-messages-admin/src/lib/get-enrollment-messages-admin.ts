import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    EnrollmentMessage,
    GetEnrollmentMessagesAdminResponse,
} from '@sol/ts/firebase/api-types';

export const getEnrollmentMessagesAdmin = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<void>(async (_request, response) => {
        const db = DatabaseUtility.getDatabase();
        const snapshot = await db
            .collection('config/enrollmentMessages/messages')
            .orderBy('sortOrder', 'asc')
            .get();

        const messages: EnrollmentMessage[] = snapshot.docs.map((doc) => {
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
        });

        const result: GetEnrollmentMessagesAdminResponse = { messages };
        response.send(result);
    });

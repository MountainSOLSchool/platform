import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type { GetMedicEnrollmentsRequest, GetMedicEnrollmentsResponse } from '@sol/ts/firebase/api-types';

export const getMedicEnrollments = Functions.endpoint
    .restrictedToRoles(Role.MedicAdmin)
    .handle<GetMedicEnrollmentsRequest>(async (request, response) => {
        const data = request.body.data;
        const db = DatabaseUtility.getDatabase();

        try {
            let query: FirebaseFirestore.Query = db.collection('medic_enrollments');

            if (data.classId) {
                query = query.where('classId', '==', data.classId);
            }

            const snapshot = await query.orderBy('timestamp', 'desc').get();

            const enrollments = snapshot.docs.map((doc) => {
                const d = doc.data();
                return {
                    id: doc.id,
                    classId: d.classId,
                    className: d.className,
                    studentName: d.studentName,
                    studentEmail: d.studentEmail,
                    transactionId: d.transactionId,
                    amount: d.amount,
                    status: d.status,
                    timestamp: d.timestamp?.toDate?.()?.toISOString?.() ?? '',
                };
            });

            const result: GetMedicEnrollmentsResponse = { enrollments };
            response.send(result);
        } catch (error) {
            console.error('Error fetching medic enrollments:', error);
            response.status(500).send({
                error: 'Failed to fetch enrollments. The database index may still be building.',
            });
        }
    });

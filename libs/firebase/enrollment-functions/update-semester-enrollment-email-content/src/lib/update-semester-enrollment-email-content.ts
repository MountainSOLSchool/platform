import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    UpdateSemesterEnrollmentEmailContentRequest,
    UpdateSemesterEnrollmentEmailContentResponse,
} from '@sol/ts/firebase/api-types';

export const updateSemesterEnrollmentEmailContent = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<UpdateSemesterEnrollmentEmailContentRequest>(
        async (request, response) => {
            const { semesterId, content } = request.body.data;

            if (!semesterId) {
                response.status(400).send({ error: 'semesterId is required' });
                return;
            }

            if (typeof content !== 'string') {
                response
                    .status(400)
                    .send({ error: 'content must be a string' });
                return;
            }

            const db = DatabaseUtility.getDatabase();
            const semesterRef = db.doc(`semesters/${semesterId}`);

            const semesterDoc = await semesterRef.get();
            if (!semesterDoc.exists) {
                response.status(404).send({ error: 'Semester not found' });
                return;
            }

            await semesterRef.update({
                enrollmentEmailContent: content,
            });

            const result: UpdateSemesterEnrollmentEmailContentResponse = {
                success: true,
            };
            response.send(result);
        }
    );

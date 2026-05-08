import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    GetSemesterEnrollmentEmailContentRequest,
    GetSemesterEnrollmentEmailContentResponse,
} from '@sol/ts/firebase/api-types';

export const getSemesterEnrollmentEmailContent = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<GetSemesterEnrollmentEmailContentRequest>(
        async (request, response) => {
            const { semesterId } = request.body.data;

            if (!semesterId) {
                response.status(400).send({ error: 'semesterId is required' });
                return;
            }

            const db = DatabaseUtility.getDatabase();
            const semesterDoc = await db.doc(`semesters/${semesterId}`).get();

            if (!semesterDoc.exists) {
                response.status(404).send({ error: 'Semester not found' });
                return;
            }

            const data = semesterDoc.data();
            const content =
                typeof data?.enrollmentEmailContent === 'string'
                    ? data.enrollmentEmailContent
                    : null;

            const result: GetSemesterEnrollmentEmailContentResponse = {
                content,
            };
            response.send(result);
        }
    );

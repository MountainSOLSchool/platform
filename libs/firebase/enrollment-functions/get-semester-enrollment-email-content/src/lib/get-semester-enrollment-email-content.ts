import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    GetSemesterEnrollmentEmailContentRequest,
    GetSemesterEnrollmentEmailContentResponse,
    SemesterEmailAttachment,
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
            const semesterName =
                (data?.displayName as string | undefined) ?? semesterId;
            const content =
                typeof data?.enrollmentEmailContent === 'string'
                    ? data.enrollmentEmailContent
                    : null;

            const rawAttachments = data?.enrollmentEmailAttachments;
            const attachments: Array<SemesterEmailAttachment> = Array.isArray(
                rawAttachments
            )
                ? (rawAttachments as Array<SemesterEmailAttachment>)
                : [];

            const result: GetSemesterEnrollmentEmailContentResponse = {
                semesterName,
                content,
                attachments,
            };
            response.send(result);
        }
    );

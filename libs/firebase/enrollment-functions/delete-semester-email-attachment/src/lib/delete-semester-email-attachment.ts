import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    DeleteSemesterEmailAttachmentRequest,
    DeleteSemesterEmailAttachmentResponse,
    SemesterEmailAttachment,
} from '@sol/ts/firebase/api-types';
import admin from 'firebase-admin';

export const deleteSemesterEmailAttachment = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<DeleteSemesterEmailAttachmentRequest>(async (request, response) => {
        const { semesterId, storagePath } = request.body.data;

        if (!semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }
        if (!storagePath) {
            response.status(400).send({ error: 'storagePath is required' });
            return;
        }

        // Path safety: must be under this semester's email-attachments
        // directory. Stops a caller from passing some other doc's path.
        const expectedPrefix = `semesters/${semesterId}/email-attachments/`;
        if (!storagePath.startsWith(expectedPrefix)) {
            response.status(400).send({
                error: 'storagePath does not belong to this semester',
            });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const semesterRef = db.doc(`semesters/${semesterId}`);

        const updatedAttachments = await db.runTransaction(async (tx) => {
            const fresh = await tx.get(semesterRef);
            if (!fresh.exists) {
                throw new Error('Semester not found');
            }
            const data = fresh.data() ?? {};
            const existing = Array.isArray(data.enrollmentEmailAttachments)
                ? (data.enrollmentEmailAttachments as Array<SemesterEmailAttachment>)
                : [];
            const next = existing.filter((a) => a.storagePath !== storagePath);
            tx.update(semesterRef, {
                enrollmentEmailAttachments: next,
            });
            return next;
        });

        // Storage deletion is best-effort: if the file is already gone,
        // continue. Don't surface that as a failure to the admin.
        try {
            await admin.storage().bucket().file(storagePath).delete();
        } catch (err) {
            console.warn(
                `[deleteSemesterEmailAttachment] Storage delete failed for ${storagePath} (continuing):`,
                err
            );
        }

        const result: DeleteSemesterEmailAttachmentResponse = {
            attachments: updatedAttachments,
        };
        response.send(result);
    });

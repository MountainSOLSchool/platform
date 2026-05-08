import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import type {
    UploadSemesterEmailAttachmentRequest,
    UploadSemesterEmailAttachmentResponse,
    SemesterEmailAttachment,
} from '@sol/ts/firebase/api-types';
import admin from 'firebase-admin';

const MAX_FILENAME_LENGTH = 100;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

function sanitizeFilename(name: string): string {
    const trimmed = name.trim().slice(-MAX_FILENAME_LENGTH);
    // Replace any character that isn't alphanumeric, dot, hyphen, underscore, or space.
    const cleaned = trimmed.replace(/[^a-zA-Z0-9._\- ]/g, '_');
    return cleaned.replace(/\s+/g, '_');
}

export const uploadSemesterEmailAttachment = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<UploadSemesterEmailAttachmentRequest>(async (request, response) => {
        const { semesterId, filename, fileBase64 } = request.body.data;

        if (!semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }
        if (!filename) {
            response.status(400).send({ error: 'filename is required' });
            return;
        }
        if (!fileBase64) {
            response.status(400).send({ error: 'fileBase64 is required' });
            return;
        }

        const buffer = Buffer.from(fileBase64, 'base64');
        if (buffer.byteLength > MAX_FILE_BYTES) {
            response.status(400).send({
                error: `File too large (${buffer.byteLength} bytes). Limit is ${MAX_FILE_BYTES}.`,
            });
            return;
        }

        // Light magic-byte sniff: PDF starts with "%PDF-"
        if (
            buffer.length < 5 ||
            buffer.subarray(0, 5).toString('ascii') !== '%PDF-'
        ) {
            response
                .status(400)
                .send({ error: 'Only PDF files are accepted.' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const semesterRef = db.doc(`semesters/${semesterId}`);
        const semesterDoc = await semesterRef.get();
        if (!semesterDoc.exists) {
            response.status(404).send({ error: 'Semester not found' });
            return;
        }

        const safeName = sanitizeFilename(filename);
        const timestamp = Date.now();
        const storagePath = `semesters/${semesterId}/email-attachments/${timestamp}_${safeName}`;

        const bucket = admin.storage().bucket();
        const file = bucket.file(storagePath);

        await file.save(buffer, {
            metadata: { contentType: 'application/pdf' },
        });
        await file.makePublic();

        const url = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;

        const newAttachment: SemesterEmailAttachment = {
            name: safeName,
            url,
            storagePath,
        };

        // Atomically append. We re-read inside the transaction to avoid
        // racing concurrent uploads/deletes.
        const updatedAttachments = await db.runTransaction(async (tx) => {
            const fresh = await tx.get(semesterRef);
            const data = fresh.data() ?? {};
            const existing = Array.isArray(data.enrollmentEmailAttachments)
                ? (data.enrollmentEmailAttachments as Array<SemesterEmailAttachment>)
                : [];
            const next = [...existing, newAttachment];
            tx.update(semesterRef, {
                enrollmentEmailAttachments: next,
            });
            return next;
        });

        const result: UploadSemesterEmailAttachmentResponse = {
            attachment: newAttachment,
            attachments: updatedAttachments,
        };
        response.send(result);
    });

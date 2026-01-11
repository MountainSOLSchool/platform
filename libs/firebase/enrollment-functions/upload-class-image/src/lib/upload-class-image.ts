import { Functions, Role } from '@sol/firebase/functions';
import type {
    UploadClassImageRequest,
    UploadClassImageResponse,
} from '@sol/ts/firebase/api-types';
import admin from 'firebase-admin';

export type { UploadClassImageRequest, UploadClassImageResponse };

export const uploadClassImage = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<UploadClassImageRequest>(async (request, response) => {
        const { semesterId, classId, imageBase64, contentType } = request.body.data;

        if (!semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }

        if (!imageBase64) {
            response.status(400).send({ error: 'imageBase64 is required' });
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(contentType)) {
            response.status(400).send({
                error: `Invalid content type. Allowed: ${allowedTypes.join(', ')}`,
            });
            return;
        }

        const bucket = admin.storage().bucket();
        const timestamp = Date.now();
        const extension = contentType.split('/')[1] || 'jpg';
        const fileName = classId
            ? `classes/${semesterId}/${classId}/thumbnail_${timestamp}.${extension}`
            : `classes/${semesterId}/temp_${timestamp}.${extension}`;

        const file = bucket.file(fileName);
        const buffer = Buffer.from(imageBase64, 'base64');

        await file.save(buffer, {
            metadata: {
                contentType,
            },
        });

        await file.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        const result: UploadClassImageResponse = {
            success: true,
            url: publicUrl,
        };

        response.send(result);
    });

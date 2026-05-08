import { AuthUtility, Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import {
    previewEnrollmentEmail,
    type EmailAttachment,
} from '@sol/ts/enrollment-email-template';
import type {
    SemesterEmailAttachment,
    SendTestEnrollmentEmailRequest,
    SendTestEnrollmentEmailResponse,
} from '@sol/ts/firebase/api-types';

export const sendTestEnrollmentEmail = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<SendTestEnrollmentEmailRequest>(async (request, response) => {
        const { semesterId } = request.body.data;

        if (!semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }

        const callingUser = await AuthUtility.getUserFromRequest(
            request,
            response
        );
        if (!callingUser) {
            return;
        }
        const sentTo = callingUser.email;
        if (!sentTo) {
            response
                .status(400)
                .send({ error: 'Calling admin has no email on file.' });
            return;
        }

        const db = DatabaseUtility.getDatabase();
        const semesterDoc = await db.doc(`semesters/${semesterId}`).get();
        if (!semesterDoc.exists) {
            response.status(404).send({ error: 'Semester not found' });
            return;
        }

        const data = semesterDoc.data() ?? {};
        const semesterName =
            (data.displayName as string | undefined) ?? 'This Semester';
        const enrollmentEmailContent =
            typeof data.enrollmentEmailContent === 'string'
                ? data.enrollmentEmailContent
                : '';
        const rawAttachments = data.enrollmentEmailAttachments;
        const attachmentRecords: Array<SemesterEmailAttachment> = Array.isArray(
            rawAttachments
        )
            ? (rawAttachments as Array<SemesterEmailAttachment>)
            : [];
        const attachmentsForEmail: Array<EmailAttachment> =
            attachmentRecords.map((a) => ({ name: a.name, url: a.url }));

        const { html, text } = previewEnrollmentEmail({
            semesterName,
            enrollmentEmailContent,
            attachments: attachmentsForEmail,
        });

        const subject = `[TEST] Class confirmation preview — ${semesterName}`;
        const messageId = `test-${semesterId}-${Date.now()}`;

        const mailDoc = await db.collection('mail').add({
            to: sentTo,
            message: {
                subject,
                from: 'Mountain SOL School <info@mountainsol.org>',
                replyTo: 'Mountain SOL School <info@mountainsol.org>',
                messageId: `<${messageId}@mountainsol.org>`,
                headers: {
                    'Auto-Submitted': 'auto-generated',
                    'X-Mountain-SOL-Test': 'true',
                },
                html,
                text,
                ...(attachmentsForEmail.length
                    ? {
                          attachments: attachmentsForEmail.map((a) => ({
                              filename: a.name,
                              path: a.url,
                          })),
                      }
                    : {}),
            },
        });

        console.info(
            `[sendTestEnrollmentEmail] Queued mail/${mailDoc.id} for semester ${semesterId} to admin ${sentTo}`
        );

        const result: SendTestEnrollmentEmailResponse = {
            success: true,
            mailDocId: mailDoc.id,
            sentTo,
        };
        response.send(result);
    });

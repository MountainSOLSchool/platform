import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { AuthUtility } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import { Semester } from '@sol/firebase/classes/semester';
import { SemesterClass } from '@sol/classes/domain';
import {
    _getClasses,
    _getSemestersAvailableToEnroll,
} from '@sol/firebase/enrollment-functions/shared';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import {
    renderEnrollmentEmail,
    type EmailAttachment,
    type EmailSemester,
} from '@sol/ts/enrollment-email-template';

interface SemesterFromAvailable {
    id: string;
    name: string;
    enrollmentEmailContent?: string;
    enrollmentEmailAttachments?: Array<EmailAttachment>;
}

export const createEnrollmentEmail = onDocumentCreated(
    'enrollment/{enrollmentId}',
    async (event) => {
        const enrollmentId = event.params.enrollmentId;
        const enrollmentRecord =
            event.data && (event.data.data() as ClassEnrollmentDbo);

        if (!enrollmentRecord) {
            console.warn(
                `[createEnrollmentEmail] Skipped: no enrollment data for ${enrollmentId}`
            );
            return;
        }

        const hasPaymentOrFree =
            !!enrollmentRecord.transactionId ||
            enrollmentRecord.finalCost === 0;
        const hasClasses =
            'classIds' in enrollmentRecord || 'classes' in enrollmentRecord;

        if (
            enrollmentRecord.status !== 'enrolled' ||
            !hasPaymentOrFree ||
            !hasClasses
        ) {
            console.info(
                `[createEnrollmentEmail] Skipped ${enrollmentId}: status=${enrollmentRecord.status}, hasPaymentOrFree=${hasPaymentOrFree}, hasClasses=${hasClasses}`
            );
            return;
        }

        try {
            const semesters =
                (await _getSemestersAvailableToEnroll()) as Array<SemesterFromAvailable>;
            const semestersById = semesters.reduce(
                (acc, s) => ({ ...acc, [s.id]: s }),
                {} as Record<string, SemesterFromAvailable>
            );

            const classes =
                'classes' in enrollmentRecord
                    ? Object.values(
                          await _getClasses(enrollmentRecord.classes)
                      ).flatMap((cl) => cl)
                    : await Semester.active().classes.getMany(
                          enrollmentRecord.classIds
                      );

            // For addendum enrollments, determine which classes are existing
            // (only new options added) vs truly new
            let existingClassIds: Set<string> = new Set();
            if (
                enrollmentRecord.enrollmentType === 'addendum' &&
                enrollmentRecord.originalEnrollmentId
            ) {
                const originalEnrollment =
                    await ClassEnrollmentRepository.getById(
                        enrollmentRecord.originalEnrollmentId
                    );
                if (originalEnrollment && 'classes' in originalEnrollment) {
                    existingClassIds = new Set(
                        originalEnrollment.classes.map((c) => c.id)
                    );
                }
            }

            const classesWithOptions = classes.map((c) => {
                const optionDetails =
                    c.additionalOptions?.filter((option) =>
                        enrollmentRecord.additionalOptionIdsByClassId[
                            c.id
                        ]?.includes(option.id)
                    ) || [];
                const isExistingClass = existingClassIds.has(c.id);
                return {
                    ...c,
                    cost: isExistingClass ? 0 : c.cost,
                    additionalOptions: optionDetails,
                    isExistingClass,
                };
            });

            const classesCost = classesWithOptions.reduce((total, c) => {
                const optionsCost = c.additionalOptions.reduce(
                    (sum, opt) => sum + (opt.cost || 0),
                    0
                );
                return total + c.cost + optionsCost;
            }, 0);

            const totalDiscounts = enrollmentRecord.discounts.reduce(
                (total, d) => total + d.amount,
                0
            );
            const costAdjustment =
                enrollmentRecord.finalCost - (classesCost - totalDiscounts);
            const user = await AuthUtility.getUser(enrollmentRecord.userId);

            const recipient = user.email ?? enrollmentRecord.contactEmail;
            if (!recipient) {
                console.error(
                    `[createEnrollmentEmail] Cannot send for ${enrollmentId}: no recipient email (userId=${enrollmentRecord.userId}, no contactEmail on record)`
                );
                return;
            }

            const isAddendum = enrollmentRecord.enrollmentType === 'addendum';

            const semestersInEnrollment = collectSemestersInEnrollment(
                classesWithOptions,
                semestersById
            );

            const aggregatedAttachments = aggregateAttachments(
                semestersInEnrollment
            );

            const { html, text } = renderEnrollmentEmail({
                studentName: enrollmentRecord.studentName,
                transactionId: enrollmentRecord.transactionId,
                finalCost: enrollmentRecord.finalCost,
                discounts: enrollmentRecord.discounts,
                classes: classesWithOptions.map((c) => ({
                    title: c.title,
                    semesterId: c.semesterId,
                    baseCost: c.cost,
                    isExistingClass: c.isExistingClass ?? false,
                    options: c.additionalOptions.map((opt) => ({
                        description: opt.description,
                        cost: opt.cost,
                    })),
                })),
                semesters: semestersInEnrollment.map(
                    (s): EmailSemester => ({
                        id: s.id,
                        name: s.name,
                        enrollmentEmailContent: s.enrollmentEmailContent,
                    })
                ),
                costAdjustment,
                isAddendum,
                attachments: aggregatedAttachments,
            });

            const subject = isAddendum
                ? `Enrollment addendum for ${enrollmentRecord.studentName}`
                : `Class confirmation for ${enrollmentRecord.studentName}`;

            const messageIdLocalPart =
                enrollmentRecord.transactionId ?? `enrollment-${enrollmentId}`;

            const mailDoc = await DatabaseUtility.getDatabase()
                .collection('mail')
                .add({
                    to: recipient,
                    message: {
                        subject,
                        from: `Mountain SOL School <info@mountainsol.org>`,
                        replyTo: `Mountain SOL School <info@mountainsol.org>`,
                        messageId: `<${messageIdLocalPart}.${Date.now()}@mountainsol.org>`,
                        headers: {
                            'Auto-Submitted': 'auto-generated',
                        },
                        html,
                        text,
                        ...(aggregatedAttachments.length
                            ? {
                                  attachments: aggregatedAttachments.map(
                                      (a) => ({
                                          filename: a.name,
                                          path: a.url,
                                      })
                                  ),
                              }
                            : {}),
                    },
                });

            console.info(
                `[createEnrollmentEmail] Queued mail/${mailDoc.id} for enrollment ${enrollmentId} to ${recipient} with ${aggregatedAttachments.length} attachment(s)`
            );
        } catch (error) {
            console.error(
                `[createEnrollmentEmail] Failed for enrollment ${enrollmentId}:`,
                error
            );
            throw error;
        }
    }
);

function collectSemestersInEnrollment(
    classesWithOptions: Array<SemesterClass & { isExistingClass?: boolean }>,
    semestersById: Record<string, SemesterFromAvailable>
): Array<SemesterFromAvailable> {
    const seen = new Set<string>();
    const ordered: Array<SemesterFromAvailable> = [];
    for (const c of classesWithOptions) {
        if (!c.semesterId || seen.has(c.semesterId)) continue;
        seen.add(c.semesterId);
        const semester = semestersById[c.semesterId];
        if (semester) ordered.push(semester);
    }
    return ordered;
}

/**
 * Flatten attachments from all semesters in the enrollment, deduped by URL,
 * preserving the per-semester order.
 */
function aggregateAttachments(
    semesters: Array<SemesterFromAvailable>
): Array<EmailAttachment> {
    const seen = new Set<string>();
    const out: Array<EmailAttachment> = [];
    for (const s of semesters) {
        for (const a of s.enrollmentEmailAttachments ?? []) {
            if (seen.has(a.url)) continue;
            seen.add(a.url);
            out.push({ name: a.name, url: a.url });
        }
    }
    return out;
}

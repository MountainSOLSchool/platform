import { marked } from 'marked';

export interface EmailEnrollmentClass {
    title: string;
    semesterId: string;
    baseCost: number;
    isExistingClass: boolean;
    options: Array<{ description: string; cost: number }>;
}

export interface EmailSemester {
    id: string;
    name: string;
    enrollmentEmailContent?: string;
}

export interface EmailDiscount {
    description: string;
    amount: number;
}

export interface EmailAttachment {
    name: string;
    url: string;
}

export interface RenderEnrollmentEmailInput {
    studentName: string;
    transactionId?: string;
    finalCost: number;
    discounts: Array<EmailDiscount>;
    classes: Array<EmailEnrollmentClass>;
    /**
     * Distinct semesters referenced by this enrollment, in the order they
     * should appear in the per-semester "what to bring" sections.
     */
    semesters: Array<EmailSemester>;
    /**
     * Difference between final cost and (sum of class costs - sum of discounts).
     * Renders as an "Other Adjustments" row when non-zero.
     */
    costAdjustment: number;
    isAddendum: boolean;
    attachments?: Array<EmailAttachment>;
}

export interface EnrollmentEmailContent {
    html: string;
    text: string;
}

const STYLES = `
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #f5f5f5; }
    .indent { padding-left: 20px; color: #666; }
    .total-row td { font-weight: bold; border-top: 2px solid #333; }
    .discount-row { color: #2d862d; }
    .existing-class { color: #666; font-style: italic; }
    .attachments { margin: 16px 0; }
    .attachments li { margin: 4px 0; }
`;

function renderSemesterContentHtml(
    semester: EmailSemester,
    showSemesterHeader: boolean
): string {
    if (!semester.enrollmentEmailContent?.trim()) {
        return '';
    }
    const heading = showSemesterHeader
        ? `<h3 style="margin-bottom: 4px;">${semester.name}</h3>`
        : '';
    const rendered = marked.parse(semester.enrollmentEmailContent, {
        async: false,
    }) as string;
    return `${heading}<div>${rendered}</div>`;
}

function renderSemesterContentText(
    semester: EmailSemester,
    showSemesterHeader: boolean
): string {
    if (!semester.enrollmentEmailContent?.trim()) {
        return '';
    }
    const heading = showSemesterHeader ? `${semester.name}\n` : '';
    return `${heading}${semester.enrollmentEmailContent.trim()}\n`;
}

function renderAttachmentsHtml(attachments: Array<EmailAttachment>): string {
    if (!attachments.length) return '';
    const items = attachments
        .map(
            (a) =>
                `<li><a href="${a.url}" target="_blank" rel="noopener">${a.name}</a></li>`
        )
        .join('');
    return `
        <div class="content-section">
            <h3 style="margin-bottom: 4px;">Attached documents</h3>
            <p>The following documents are attached to this email and also available at these links:</p>
            <ul class="attachments">${items}</ul>
        </div>`;
}

function renderAttachmentsText(attachments: Array<EmailAttachment>): string {
    if (!attachments.length) return '';
    const items = attachments.map((a) => `• ${a.name}: ${a.url}`).join('\n');
    return `\nAttached documents (also linked below for reference):\n${items}\n`;
}

export function renderEnrollmentEmail(
    input: RenderEnrollmentEmailInput
): EnrollmentEmailContent {
    const {
        studentName,
        transactionId,
        finalCost,
        discounts,
        classes,
        semesters,
        costAdjustment,
        isAddendum,
        attachments = [],
    } = input;

    const semesterNamesById = semesters.reduce(
        (acc, s) => ({ ...acc, [s.id]: s.name }),
        {} as Record<string, string>
    );

    const classesContent = classes.map((c) => ({
        title: c.title,
        semester: semesterNamesById[c.semesterId] ?? '--',
        baseCost: c.baseCost,
        isExistingClass: c.isExistingClass,
        options: c.options,
    }));

    const introText = isAddendum
        ? `<p>This is a confirmation of changes to ${studentName}'s enrollment.</p>`
        : `<p>Hey there! Thanks for signing up ${studentName} for classes!</p>`;

    const semestersWithContent = semesters.filter((s) =>
        s.enrollmentEmailContent?.trim()
    );
    const showSemesterHeaders = semestersWithContent.length > 1;
    const semesterSectionsHtml = isAddendum
        ? ''
        : semestersWithContent
              .map((s) => renderSemesterContentHtml(s, showSemesterHeaders))
              .join('');
    const backpackSection = isAddendum
        ? ''
        : `${semesterSectionsHtml}
                <p>Got questions? Just reply to this email or reach out to your instructor directly!</p>`;

    const attachmentsHtml = renderAttachmentsHtml(attachments);

    const receiptLabel = isAddendum ? 'Additional charges' : 'receipt';
    const totalLabel = isAddendum ? 'Amount Due' : 'Total';

    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <style>${STYLES}</style>
            </head>
            <body>
                ${introText}

                <p>You can check out all your enrollments anytime by logging in here:
                    <a href="https://enrollment.mountainsol.org/account/enrollments">https://enrollment.mountainsol.org/account/enrollments</a>
                </p>

                ${backpackSection}

                ${attachmentsHtml}

                <p>Here's your ${receiptLabel}:</p>

                <table>
                <thead>
                <tr>
                    <th>Class</th>
                    <th>Semester</th>
                    <th>Details</th>
                    <th>Cost</th>
                </tr>
                </thead>
                <tbody>
                    ${classesContent
                        .map(
                            (c) => `
                    ${
                        c.isExistingClass
                            ? `<tr class="existing-class">
                        <td>${c.title}</td>
                        <td>${c.semester}</td>
                        <td>Already enrolled</td>
                        <td>--</td>
                    </tr>`
                            : `<tr>
                        <td>${c.title}</td>
                        <td>${c.semester}</td>
                        <td>Base registration</td>
                        <td>$${c.baseCost}</td>
                    </tr>`
                    }
                    ${c.options
                        .map(
                            (opt) => `
                    <tr>
                        <td></td>
                        <td></td>
                        <td class="indent">+ ${opt.description}</td>
                        <td>+$${opt.cost}</td>
                    </tr>`
                        )
                        .join('')}`
                        )
                        .join('')}
                ${discounts
                    .map(
                        (d) => `
                    <tr class="discount-row">
                        <td colspan="3">${d.description}</td>
                        <td>-$${d.amount.toFixed(2)}</td>
                    </tr>`
                    )
                    .join('')}
                ${
                    costAdjustment !== 0
                        ? `
                    <tr class="discount-row">
                        <td colspan="3">Other Adjustments</td>
                        <td>${costAdjustment > 0 ? '+' : '-'}$${Math.abs(costAdjustment).toFixed(2)}</td>
                    </tr>`
                        : ''
                }
                <tr class="total-row">
                    <td colspan="3">${totalLabel}</td>
                    <td>$${finalCost.toFixed(2)}</td>
                </tr>
                </tbody>
                </table>

                <p>Transaction ID: ${transactionId || 'N/A'}</p>
            </body>
        </html>`;

    const introTextPlain = isAddendum
        ? `This is a confirmation of changes to ${studentName}'s enrollment.`
        : `Hey there! Thanks for signing up ${studentName} for classes!`;

    const semesterSectionsPlain = isAddendum
        ? ''
        : semestersWithContent
              .map((s) => renderSemesterContentText(s, showSemesterHeaders))
              .join('\n');
    const backpackSectionPlain = isAddendum
        ? ''
        : `
${semesterSectionsPlain}
Got questions? Just reply to this email or reach out to your instructor directly!
`;

    const attachmentsTextSection = renderAttachmentsText(attachments);

    const text = `${introTextPlain}

You can check out all your enrollments anytime by logging in here:
https://enrollment.mountainsol.org/account/enrollments
${backpackSectionPlain}${attachmentsTextSection}
Here's your ${receiptLabel}:

${classesContent
    .map(
        (c) => `
${c.title}
Semester: ${c.semester}
${c.isExistingClass ? 'Already enrolled' : `Base registration: $${c.baseCost}`}${c.options
            .map((opt) => `\n+ ${opt.description}: +$${opt.cost}`)
            .join('')}
`
    )
    .join('\n')}
${discounts.map((d) => `${d.description}: -$${d.amount.toFixed(2)}`).join('\n')}
${
    costAdjustment !== 0
        ? `Other Adjustments: ${costAdjustment > 0 ? '+' : '-'}$${Math.abs(costAdjustment).toFixed(2)}`
        : ''
}

${totalLabel}: $${finalCost.toFixed(2)}

Transaction ID: ${transactionId || 'N/A'}`;

    return { html, text };
}

/**
 * Render a preview of the enrollment confirmation email using sample data.
 * Used by the admin editor so staff see exactly what parents will see.
 *
 * The single-semester case is what most enrollments hit. The multi-semester
 * "section per semester" rendering is documented in the editor copy and
 * exercised by the real trigger when applicable; the preview keeps things
 * simple by always showing one semester (the one being edited).
 */
export function previewEnrollmentEmail(args: {
    semesterName: string;
    enrollmentEmailContent: string;
    attachments?: Array<EmailAttachment>;
}): EnrollmentEmailContent {
    return renderEnrollmentEmail({
        studentName: 'Sample Student',
        transactionId: 'PREVIEW',
        finalCost: 130,
        discounts: [],
        classes: [
            {
                title: 'Sample Class',
                semesterId: 'preview-semester',
                baseCost: 130,
                isExistingClass: false,
                options: [],
            },
        ],
        semesters: [
            {
                id: 'preview-semester',
                name: args.semesterName || 'This Semester',
                enrollmentEmailContent: args.enrollmentEmailContent,
            },
        ],
        costAdjustment: 0,
        isAddendum: false,
        attachments: args.attachments,
    });
}

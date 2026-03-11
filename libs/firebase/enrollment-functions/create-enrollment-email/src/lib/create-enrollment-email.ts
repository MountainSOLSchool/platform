import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { AuthUtility } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import { Semester } from '@sol/firebase/classes/semester';
import { SemesterClass } from '@sol/classes/domain';
import { _getClasses, _getSemestersAvailableToEnroll } from '@sol/firebase/enrollment-functions/shared';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';

export const createEnrollmentEmail = onDocumentCreated(
    'enrollment/{enrollmentId}',
    async (event) => {
        const enrollmentRecord =
            event.data && (event.data.data() as ClassEnrollmentDbo);

        if (
            enrollmentRecord &&
            enrollmentRecord.status === 'enrolled' &&
            (!!enrollmentRecord.transactionId ||
                enrollmentRecord.finalCost === 0) &&
            ('classIds' in enrollmentRecord || 'classes' in enrollmentRecord)
        ) {
            const semesters = await _getSemestersAvailableToEnroll();
            const semesterNamesById = semesters.reduce(
                (acc, s) => ({ ...acc, [s.id]: s.name }),
                {} as Record<string, string>
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
                    // For addendum: zero out base cost for existing classes
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
            const differenceBetweenFinalCostAndOriginalCostWithDiscounts =
                enrollmentRecord.finalCost - (classesCost - totalDiscounts);
            const user = await AuthUtility.getUser(enrollmentRecord.userId);

            const isAddendum = enrollmentRecord.enrollmentType === 'addendum';

            const { html, text } = generateEmailContent(
                enrollmentRecord,
                classesWithOptions,
                semesterNamesById,
                differenceBetweenFinalCostAndOriginalCostWithDiscounts,
                isAddendum
            );

            await DatabaseUtility.getDatabase()
                .collection('mail')
                .add({
                    to: user.email ?? enrollmentRecord.contactEmail,
                    message: {
                        subject: isAddendum
                            ? `Enrollment addendum for ${enrollmentRecord.studentName}`
                            : `Class confirmation for ${enrollmentRecord.studentName}`,
                        from: `Mountain SOL School <info@mountainsol.org>`,
                        replyTo: `Mountain SOL School <info@mountainsol.org>`,
                        messageId: `<${enrollmentRecord.transactionId}.${Date.now()}@mountainsol.org>`,
                        html,
                        text,
                    },
                });
        }
    }
);

interface EmailContent {
    html: string;
    text: string;
}

function generateEmailContent(
    enrollmentRecord: ClassEnrollmentDbo,
    classesWithOptions: Array<
        SemesterClass & {
            additionalOptions: Array<{
                id: string;
                description: string;
                cost: number;
                studentsIds?: Array<string>;
            }>;
            isExistingClass?: boolean;
        }
    >,
    semesterNamesById: Record<string, string>,
    differenceBetweenFinalCostAndOriginalCostWithDiscounts: number,
    isAddendum = false
): EmailContent {
    const backpackItems = [
        'Water bottle',
        'Peanut-free snack',
        'Bugspray/sunscreen',
        'Rain jacket',
    ];

    const classesContent = classesWithOptions.map((c) => ({
        title: c.title,
        semester: semesterNamesById[c.semesterId] ?? '--',
        baseCost: c.cost,
        isExistingClass: c.isExistingClass ?? false,
        options: c.additionalOptions.map((opt) => ({
            description: opt.description,
            cost: opt.cost,
        })),
    }));

    const styles = `
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f5f5f5; }
        .indent { padding-left: 20px; color: #666; }
        .total-row td { font-weight: bold; border-top: 2px solid #333; }
        .discount-row { color: #2d862d; }
        .existing-class { color: #666; font-style: italic; }
    `;

    const introText = isAddendum
        ? `<p>This is a confirmation of changes to ${enrollmentRecord.studentName}'s enrollment.</p>`
        : `<p>Hey there! Thanks for signing up ${enrollmentRecord.studentName} for classes!</p>`;

    const backpackSection = isAddendum
        ? ''
        : `<p>Here's a quick reminder of what your student should bring in their backpack:
                <ul>
                ${backpackItems.map((item) => `<li>${item}</li>`).join('\n')}
                </ul>
                </p>

                <p>Got questions? Just reply to this email or reach out to your instructor directly!</p>`;

    const receiptLabel = isAddendum ? 'Additional charges' : 'receipt';
    const totalLabel = isAddendum ? 'Amount Due' : 'Total';

    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <style>${styles}</style>
            </head>
            <body>
                ${introText}

                <p>You can check out all your enrollments anytime by logging in here:
                    <a href="https://enrollment.mountainsol.org/account/enrollments">https://enrollment.mountainsol.org/account/enrollments</a>
                </p>

                ${backpackSection}

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
                    ${c.isExistingClass
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
                ${enrollmentRecord.discounts
            .map(
                (d) => `
                    <tr class="discount-row">
                        <td colspan="3">${d.description}</td>
                        <td>-$${d.amount.toFixed(2)}</td>
                    </tr>`
            )
            .join('')}
                ${differenceBetweenFinalCostAndOriginalCostWithDiscounts != 0
            ? `
                    <tr class="discount-row">
                        <td colspan="3">Other Adjustments</td>
                        <td>${differenceBetweenFinalCostAndOriginalCostWithDiscounts > 0 ? '+' : '-'}$${Math.abs(
                differenceBetweenFinalCostAndOriginalCostWithDiscounts
            ).toFixed(2)}</td>
                    </tr>`
            : ''
        }
                <tr class="total-row">
                    <td colspan="3">${totalLabel}</td>
                    <td>$${enrollmentRecord.finalCost.toFixed(2)}</td>
                </tr>
                </tbody>
                </table>

                <p>Transaction ID: ${enrollmentRecord.transactionId || 'N/A'}</p>
            </body>
        </html>`;

    // Plain Text Version
    const introTextPlain = isAddendum
        ? `This is a confirmation of changes to ${enrollmentRecord.studentName}'s enrollment.`
        : `Hey there! Thanks for signing up ${enrollmentRecord.studentName} for classes!`;

    const backpackSectionPlain = isAddendum
        ? ''
        : `
Here's a quick reminder of what your student should bring in their backpack:
${backpackItems.map((item) => `• ${item}`).join('\n')}

Got questions? Just reply to this email or reach out to your instructor directly!
`;

    const text = `${introTextPlain}

You can check out all your enrollments anytime by logging in here:
https://enrollment.mountainsol.org/account/enrollments
${backpackSectionPlain}
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
${enrollmentRecord.discounts
            .map((d) => `${d.description}: -$${d.amount.toFixed(2)}`)
            .join('\n')}
${differenceBetweenFinalCostAndOriginalCostWithDiscounts != 0
            ? `Other Adjustments: ${differenceBetweenFinalCostAndOriginalCostWithDiscounts > 0
                ? '+'
                : '-'
            }$${Math.abs(differenceBetweenFinalCostAndOriginalCostWithDiscounts).toFixed(2)}`
            : ''
        }

${totalLabel}: $${enrollmentRecord.finalCost.toFixed(2)}

Transaction ID: ${enrollmentRecord.transactionId || 'N/A'}`;

    return { html, text };
}

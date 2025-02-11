import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { AuthUtility } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import { Semester } from '@sol/firebase/classes/semester';
import { SemesterClass } from '@sol/classes/domain';
import { _getClasses, _getSemestersAvailableToEnroll } from '@sol/firebase/enrollment-functions/shared';

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

            const classesWithOptions = classes.map((c) => {
                const optionDetails =
                    c.additionalOptions?.filter((option) =>
                        enrollmentRecord.additionalOptionIdsByClassId[
                            c.id
                        ]?.includes(option.id)
                    ) || [];
                return {
                    ...c,
                    additionalOptions: optionDetails,
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

            const { html, text } = generateEmailContent(
                enrollmentRecord,
                classesWithOptions,
                semesterNamesById,
                differenceBetweenFinalCostAndOriginalCostWithDiscounts
            );

            await DatabaseUtility.getDatabase()
                .collection('mail')
                .add({
                    to: user.email ?? enrollmentRecord.contactEmail,
                    message: {
                        subject: `Class confirmation for ${enrollmentRecord.studentName}`,
                        messageId: `<enrollment-confirmation-${enrollmentRecord.transactionId}@mountainsol.org>`,
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
        }
    >,
    semesterNamesById: Record<string, string>,
    differenceBetweenFinalCostAndOriginalCostWithDiscounts: number
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
    `;

    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <style>${styles}</style>
            </head>
            <body>
                <p>Hey there! Thanks for signing up ${enrollmentRecord.studentName} for classes!</p>

                <p>You can check out all your enrollments anytime by logging in here: 
                    <a href="https://enrollment.mountainsol.org/account/enrollments">https://enrollment.mountainsol.org/account/enrollments</a>
                </p>

                <p>Here's a quick reminder of what your student should bring in their backpack:
                <ul>
                ${backpackItems.map((item) => `<li>${item}</li>`).join('\n')}
                </ul>
                </p>

                <p>Got questions? Just reply to this email or reach out to your instructor directly!</p>

                <p>Here's your receipt:</p>

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
                    <tr>
                        <td>${c.title}</td>
                        <td>${c.semester}</td>
                        <td>Base registration</td>
                        <td>$${c.baseCost}</td>
                    </tr>
                    ${c.options
                        .map(
                            (opt) => `
                    <tr>
                        <td></td>
                        <td></td>
                        <td class="indent">+ ${opt.description}</td>
                        <td>$${opt.cost}</td>
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
                    <td colspan="3">Total</td>
                    <td>$${enrollmentRecord.finalCost.toFixed(2)}</td>
                </tr>
                </tbody>
                </table>

                <p>Transaction ID: ${enrollmentRecord.transactionId || 'N/A'}</p>
            </body>
        </html>`;

    // Plain Text Version
    const text = `Hey there! Thanks for signing up ${enrollmentRecord.studentName} for classes!

You can check out all your enrollments anytime by logging in here: 
https://enrollment.mountainsol.org/account/enrollments

Here's a quick reminder of what your student should bring in their backpack:
${backpackItems.map((item) => `• ${item}`).join('\n')}

Got questions? Just reply to this email or reach out to your instructor directly!

Here's your receipt:

${classesContent
            .map(
                (c) => `
${c.title}
Semester: ${c.semester}
Base registration: $${c.baseCost}${c.options
                        .map((opt) => `\n+ ${opt.description}: $${opt.cost}`)
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

Total: $${enrollmentRecord.finalCost.toFixed(2)}

Transaction ID: ${enrollmentRecord.transactionId || 'N/A'}`;

    return { html, text };
}

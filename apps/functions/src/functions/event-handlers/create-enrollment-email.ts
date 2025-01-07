import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { AuthUtility } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import { Semester } from '@sol/firebase/classes/semester';
import { _getClasses } from '../shared/_getClasses';
import { _getSemestersAvailableToEnroll } from '../shared/_getSemestersAvailableToEnroll';

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

            const classesCost = classes.reduce((total, c) => total + c.cost, 0);
            const totalDiscounts = enrollmentRecord.discounts.reduce(
                (total, d) => total + d.amount,
                0
            );
            const differenceBetweenFinalCostAndOriginalCostWithDiscounts =
                Math.abs(
                    enrollmentRecord.finalCost - (classesCost - totalDiscounts)
                );

            const user = await AuthUtility.getUser(enrollmentRecord.userId);

            await DatabaseUtility.getDatabase()
                .collection('mail')
                .add({
                    to: user.email ?? enrollmentRecord.contactEmail,
                    message: {
                        subject: `Enrollment confirmation for ${enrollmentRecord.studentName}`,
                        html: `<p>Thank you for enrolling ${
                            enrollmentRecord.studentName
                        } for classes with us!</p>
                        <p>You can view all of your enrollments here by logging in with the account you created: <a href="https://enrollment.mountainsol.org/account/enrollments">https://enrollment.mountainsol.org/account/enrollments</a>.</p>
                        <p>Every student is encouraged to wear good hiking shoes and bring the following items in a backpack:
                        <ul>
                          <li>Water bottle</li>
                          <li>Peanut-free snack</li>
                          <li>Bugspray/sunscreen</li>
                          <li>Rain jacket</li>
                        </ul>
                        </p>
                        <p>Please feel free to reach out to your class instructor or reply to this email with any questions!</p>
                        <p>Below is your receipt for the classes in which they are enrolled:</p>
                        <table style="text-align: left">
                          <thead>
                          <th>
                            Class Name
                          </th>
                          <th>
                            Semester
                          </th>
                          <th>
                            Cost
                          </th>
                          </thead>
                          <tbody>
                            ${classes
                                .map(
                                    (c) =>
                                        `<tr>
                            <td>
                                ${c.title}
                            </td>
                            <td>
                                ${semesterNamesById[c.semesterId] ?? '--'}
                            </td>
                            <td>
                                $${c.cost}
                            </td>
                            </tr>`
                                )
                                .join('')}
                          <tr>
                          ${enrollmentRecord.discounts
                              .map(
                                  (d) =>
                                      `<tr>
                            <td>
                                ${d.description}
                            </td>
                            <td>
                                -$${d.amount.toFixed(2)}
                            </td>
                            </tr>
                            `
                              )
                              .join('')}
                          ${
                              differenceBetweenFinalCostAndOriginalCostWithDiscounts >
                              0
                                  ? `<tr>
                            <td>
                            Other Adjustments
                            </td>
                            <td>
                            -$${differenceBetweenFinalCostAndOriginalCostWithDiscounts}
                            </td>
                          </tr>`
                                  : ``
                          }
                          <tr>
                            <td>
                              Total
                            </td>
                            <td>
                              $${enrollmentRecord.finalCost.toFixed(2)}
                            </td>
                          </tr>
                          </tbody>
                        </table>
                        <p>Transaction ID: ${
                            enrollmentRecord.transactionId
                        }</p>`,
                    },
                });
        }
    }
);

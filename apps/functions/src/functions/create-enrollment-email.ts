import { firestore } from 'firebase-functions/v1';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { AuthUtility } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import { Semester } from '@sol/firebase/classes/semester';

export const createEnrollmentEmail = firestore
    .document('enrollment/{enrollmentId}')
    .onCreate(async (documentSnapshot) => {
        const enrollmentRecord = documentSnapshot.data() as ClassEnrollmentDbo;

        if (
            enrollmentRecord.status === 'enrolled' &&
            (!!enrollmentRecord.transactionId ||
                enrollmentRecord.finalCost === 0) &&
            'classIds' in enrollmentRecord
        ) {
            // TODO: get by semester instead
            const classes = await Semester.active().classes.getMany(
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
                        <p>You can view all of your enrollments here by logging in with the account you created: <a href="https://mountain-sol-platform.web.app/account/enrollments">https://mountain-sol-platform.web.app/account/enrollments</a>.</p>
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
                                -$${d.amount}
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
                              $${enrollmentRecord.finalCost}
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
    });

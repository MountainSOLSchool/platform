import * as functions from 'firebase-functions';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import {
    SemesterRepository,
    SUMMER_2023_SEMESTER,
} from '@sol/classes/repository';
import { AuthUtility } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';

export const createEnrollmentEmail = functions.firestore
    .document('enrollment/{enrollmentId}')
    .onCreate(async (documentSnapshot) => {
        const enrollmentRecord = documentSnapshot.data() as ClassEnrollmentDbo;

        if (
            enrollmentRecord.status === 'enrolled' &&
            (!!enrollmentRecord.transactionId ||
                enrollmentRecord.finalCost === 0)
        ) {
            const classes = await SemesterRepository.of(
                SUMMER_2023_SEMESTER
            ).classes.getMany(enrollmentRecord.classIds);

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
                        } for classes with us this summer!</p>
                        <p>You can view all of your enrollments here by logging in with the account you created: <a href="https://mountain-sol-platform.web.app/account/enrollments">https://mountain-sol-platform.web.app/account/enrollments</a>.</p>
                        <p>If you'd like to sign up another student, use the coupon code "SIBLING2023" for a 10% discount on all classes for your second student!</p>
                        <p>If you’re new to Mountain SOL, please review the summer info page here prior to the start of class: <a href="https://www.mountainsol.org/summer">https://www.mountainsol.org/summer</a>.</p>
                        <p>Every student is encouraged to wear good hiking shoes and bring the following items in a backpack:
                        <ul>
                          <li>Water bottle</li>
                          <li>Peanut-free snacks</li>
                          <li>Lunch (if staying for the lunch hour)</li>
                          <li>Bugspray/sunscreen</li>
                          <li>Rain jacket</li>
                        </ul>
                        </p>
                        <p>We’ll send you another email one week before the start of each class with class-specific details about what else to expect and a more specific list for your student’s backpack.</p>
                        <p>In the meantime, please reach out to us or reply to this email with any questions!</p>
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
                            Other Savings
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

import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { DatabaseUtility } from '@sol/firebase/database';
import * as admin from 'firebase-admin';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

export const addEmailToSolsticeList = onDocumentCreated(
    'enrollment/{enrollmentId}',
    async (documentSnapshot) => {
        const enrollmentRecord =
            documentSnapshot.data as unknown as ClassEnrollmentDbo;
        if (
            enrollmentRecord &&
            enrollmentRecord.status === 'enrolled' &&
            !!enrollmentRecord.transactionId &&
            enrollmentRecord.isSignedUpForSolsticeEmails === true
        ) {
            await DatabaseUtility.getDatabase()
                .collection('mailing_lists')
                .doc('summer_solstice_2023')
                .update({
                    emails: admin.firestore.FieldValue.arrayUnion(
                        enrollmentRecord.contactEmail
                    ),
                });
        }
    }
);

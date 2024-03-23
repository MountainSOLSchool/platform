import { firestore } from 'firebase-functions/v2';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { DatabaseUtility } from '@sol/firebase/database';
import { FieldValue } from 'firebase-admin/firestore';

export const addEmailToSolsticeList = firestore.onDocumentCreated(
    'enrollment/{enrollmentId}',
    async (event) => {
        const enrollmentRecord =
            !!event.data && (event.data.data() as ClassEnrollmentDbo);
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
                    emails: FieldValue.arrayUnion(
                        enrollmentRecord.contactEmail
                    ),
                });
        }
    }
);

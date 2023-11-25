import { firestore } from 'firebase-functions/v1';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { DatabaseUtility } from '@sol/firebase/database';
import { FieldValue } from 'firebase-admin/firestore';

export const addEmailToSolsticeList = firestore
    .document('enrollment/{enrollmentId}')
    .onCreate(async (documentSnapshot) => {
        const enrollmentRecord = documentSnapshot.data() as ClassEnrollmentDbo;
        if (
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
    });

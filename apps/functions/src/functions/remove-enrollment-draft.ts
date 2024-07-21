import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { DatabaseUtility } from '@sol/firebase/database';
import { _getClasses } from './_getClasses';
import { _getSemestersAvailableToEnroll } from './_getSemestersAvailableToEnroll';

export const removeEnrollmentDraft = onDocumentCreated(
    'enrollment/{enrollmentId}',
    async (event) => {
        const enrollmentRecord =
            event.data && (event.data.data() as ClassEnrollmentDbo);

        if (enrollmentRecord && enrollmentRecord.status === 'enrolled') {
            const draftDoc = DatabaseUtility.getDatabase()
                .collection('enrollment_draft')
                .doc(enrollmentRecord.userId);

            const doesDocExist = (await draftDoc.get()).exists;
            if (doesDocExist) {
                await draftDoc.delete();
            }
        }
    }
);

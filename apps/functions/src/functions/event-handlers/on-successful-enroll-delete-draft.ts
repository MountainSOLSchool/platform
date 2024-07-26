import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { DatabaseUtility } from '@sol/firebase/database';
import { _deleteEnrollmentDraft } from '../shared/_delete-enrollment-draft';

export const onSuccessfulEnrollDeleteDraft = onDocumentCreated(
    'enrollment/{enrollmentId}',
    async (event) => {
        const enrollmentRecord =
            event.data && (event.data.data() as ClassEnrollmentDbo);

        if (enrollmentRecord && enrollmentRecord.status === 'enrolled') {
          _deleteEnrollmentDraft(enrollmentRecord.userId);
        }
    }
);

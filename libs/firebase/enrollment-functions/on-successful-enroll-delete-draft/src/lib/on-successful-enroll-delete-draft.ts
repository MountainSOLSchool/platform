import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { ClassEnrollmentDbo } from '@sol/classes/enrollment/repository';
import { _deleteEnrollmentDraft } from '@sol/firebase/enrollment-functions/shared';

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

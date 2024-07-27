import { DatabaseUtility } from '@sol/firebase/database';

export const _deleteEnrollmentDraft = async (userId: string) => {
    const draftDoc = DatabaseUtility.getDatabase()
        .collection('enrollment_draft')
        .doc(userId);

    const doesDocExist = (await draftDoc.get()).exists;
    if (doesDocExist) {
        await draftDoc.delete();
    }
};

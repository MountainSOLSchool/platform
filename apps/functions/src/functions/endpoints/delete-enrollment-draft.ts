import { AuthUtility, Functions } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';

export const deleteEnrollmentDraft = Functions.endpoint.handle(
    async (request, response) => {
        const user = await AuthUtility.getUserFromRequest(request, response);

        if (!user) {
            response.status(401).send({ error: 'User not found' });
            return;
        }

        const draftDoc = DatabaseUtility.getDatabase()
            .collection('enrollment_draft')
            .doc(user.uid);

        const doesDocExist = (await draftDoc.get()).exists;

        if (doesDocExist) {
            await draftDoc.delete();
        }

        response.send({
            success: true,
        });
    }
);

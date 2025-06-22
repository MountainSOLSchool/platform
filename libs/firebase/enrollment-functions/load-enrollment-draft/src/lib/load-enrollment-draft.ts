import { DatabaseUtility } from '@sol/firebase/database';
import { AuthUtility, Functions } from '@sol/firebase/functions';

export const loadEnrollmentDraft = Functions.endpoint.handle(
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

        const draft = doesDocExist ? (await draftDoc.get()).data() : undefined;

        response.send({
            draft,
        });
    }
);

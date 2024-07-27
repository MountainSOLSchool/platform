import { AuthUtility, Functions } from '@sol/firebase/functions';
import { _deleteEnrollmentDraft } from '../shared/_deleteEnrollmentDraft';

export const deleteEnrollmentDraft = Functions.endpoint.handle(
    async (request, response) => {
        const user = await AuthUtility.getUserFromRequest(request, response);

        if (!user) {
            response.status(401).send({ error: 'User not found' });
            return;
        }

        _deleteEnrollmentDraft(user.uid);

        response.send({
            success: true,
        });
    }
);

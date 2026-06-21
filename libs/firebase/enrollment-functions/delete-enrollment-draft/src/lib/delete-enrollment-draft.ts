import { AuthUtility, Functions } from '@sol/firebase/functions';
import { _deleteEnrollmentDraft } from '@sol/firebase/enrollment-functions/shared';

export const deleteEnrollmentDraft = Functions.endpoint.handle(
    async (request, response) => {
        const user = await AuthUtility.getUserFromRequest(request, response);

        if (!user) {
            // getUserFromRequest already sent a 403.
            return;
        }

        _deleteEnrollmentDraft(user.uid);

        response.send({
            success: true,
        });
    }
);

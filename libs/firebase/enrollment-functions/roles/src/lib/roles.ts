import { AuthUtility, Functions } from '@sol/firebase/functions';

export const roles = Functions.endpoint.handle(async (request, response) => {
    const user = await AuthUtility.getUserFromRequest(request, response);
    if (!user) {
        // getUserFromRequest already sent a 403.
        return;
    }
    const roles = await AuthUtility.getUserRoles(user);

    response.send(roles);
});

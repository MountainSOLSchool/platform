import { V1AuthUtility, V1Functions } from '@sol/firebase/functions';

export const roles = V1Functions.endpoint.handle(async (request, response) => {
    const user = await V1AuthUtility.getUserFromRequest(request, response);
    if (!user) {
        response.send({ roles: [] });
        return;
    }
    const roles = await V1AuthUtility.getUserRoles(user);
    response.send(roles);
});

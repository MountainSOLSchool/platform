import { Functions, Role } from '@sol/firebase/functions';
import type {
    ContactAudienceRequest,
    ContactAudienceResponse,
} from '@sol/ts/firebase/api-types';
import { resolveAudience } from './audience-resolver';

export const contactAudiences = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<ContactAudienceRequest>(async (request, response) => {
        const { selector, includeAllGuardians } = request.body.data ?? {};

        if (!selector?.type) {
            response.status(400).send({ error: 'selector is required' });
            return;
        }

        const result: ContactAudienceResponse = await resolveAudience(
            selector,
            includeAllGuardians ?? false
        );

        response.send(result);
    });

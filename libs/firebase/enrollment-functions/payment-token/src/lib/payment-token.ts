import { AuthUtility, Functions } from '@sol/firebase/functions';
import { Braintree } from '@sol/payments/braintree';

export const paymentToken = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<{
        anonymous?: boolean;
    }>(async (request, response, secrets, strings) => {
        const { anonymous = false } = request.body.data || {};
        
        const braintree = new Braintree(secrets, strings);
        
        if (anonymous) {
            const token = await braintree.getAnonymousClientToken();
            response.send(token);
            return;
        }
        
        const user = await AuthUtility.getUserFromRequest(request, response);
        if (!user) {
            response.status(401).send({ error: 'Unauthorized' });
            return;
        }
        
        const token = await braintree.getClientToken(user);
        response.send(token);
    });
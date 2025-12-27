import { Functions } from '@sol/firebase/functions';
import { Braintree } from '@sol/payments/braintree';
import { ServicePaymentRequest } from '@sol/payments/domain';
import { ServicePaymentHandler } from '@sol/firebase/payments';

export const payment = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<ServicePaymentRequest>(async (request, response, secrets, strings) => {
        try {
            const braintree = new Braintree(secrets, strings);
            const handler = new ServicePaymentHandler(braintree);

            const result = await handler.handle(request.body.data);

            if (result.success) {
                response.send(result);
            } else {
                response.status(400).send(result);
            }
        } catch (error) {
            console.error('Error processing payment:', error);

            if (error instanceof Error && error.message.includes('token_issuance')) {
                response.status(503).send({
                    success: false,
                    error: 'Temporary payment processing issue. Please try again.',
                    retry: true,
                });
            } else {
                response.status(500).send({
                    success: false,
                    error: 'An unexpected error occurred while processing your payment.',
                });
            }
        }
    });

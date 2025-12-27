import { Functions } from '@sol/firebase/functions';
import { Braintree } from '@sol/payments/braintree';
import { DonationRequest } from '@sol/payments/domain';
import { DonationHandler } from '@sol/firebase/payments';

interface LegacyDonationRequest {
    amount: number;
    paymentMethodNonce: string;
    deviceData: string;
    paymentMethodType: string;
    donorName: string;
    donorEmail: string;
    donorAddress?: string;
    referralSource?: string;
}

export const donate = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<LegacyDonationRequest>(async (request, response, secrets, strings) => {
        try {
            const {
                amount,
                paymentMethodNonce,
                deviceData,
                paymentMethodType,
                donorName,
                donorEmail,
                donorAddress,
                referralSource,
            } = request.body.data;

            const donationRequest: DonationRequest = {
                amount,
                paymentMethodNonce,
                deviceData,
                paymentMethodType,
                payerName: donorName,
                payerEmail: donorEmail,
                payerAddress: donorAddress,
                referralSource,
            };

            const braintree = new Braintree(secrets, strings);
            const handler = new DonationHandler(braintree);

            const result = await handler.handle(donationRequest);

            if (result.success) {
                response.send({
                    success: true,
                    donationId: result.paymentId,
                    transactionId: result.transactionId,
                    amount: result.amount,
                });
            } else {
                response.status(400).send({
                    success: false,
                    errors: result.errors,
                    message: result.message,
                });
            }
        } catch (error) {
            console.error('Error processing donation:', error);

            if (error instanceof Error && error.message.includes('token_issuance')) {
                response.status(503).send({
                    success: false,
                    error: 'Temporary payment processing issue. Please try again.',
                    retry: true,
                });
            } else {
                response.status(500).send({
                    success: false,
                    error: 'An unexpected error occurred while processing your donation.',
                });
            }
        }
    });

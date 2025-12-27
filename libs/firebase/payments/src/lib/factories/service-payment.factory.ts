import {
    PaymentFactory,
    PaymentDbo,
    PaymentEmailStrategy,
    ServicePaymentRequest,
    ValidationResult,
    validationSuccess,
    validationFailure,
} from '@sol/payments/domain';
import { ServicePaymentEmailStrategy } from '../email-strategies/service-payment.email-strategy';

export class ServicePaymentFactory
    implements PaymentFactory<ServicePaymentRequest>
{
    validate(request: ServicePaymentRequest): ValidationResult {
        const errors: string[] = [];

        if (!request.amount || request.amount <= 0 || request.amount > 9999) {
            errors.push(
                'Invalid payment amount. Please enter an amount between $1 and $9,999.'
            );
        }

        if (!request.paymentMethodNonce) {
            errors.push('Payment method is required.');
        }

        if (!request.payerName?.trim()) {
            errors.push('Name is required.');
        }

        if (!request.payerEmail?.trim()) {
            errors.push('Email is required.');
        }

        if (!request.payerAddress?.trim()) {
            errors.push('Address is required.');
        }

        if (!request.purpose?.trim()) {
            errors.push('Purpose is required.');
        }

        return errors.length === 0
            ? validationSuccess()
            : validationFailure(errors);
    }

    createPayment(
        request: ServicePaymentRequest
    ): Omit<PaymentDbo, 'timestamp'> {
        const isVenmo = request.paymentMethodType === 'VenmoAccount';

        return {
            amount: request.amount,
            currency: 'USD',
            paymentMethod: isVenmo ? 'venmo' : 'card',
            paymentType: 'service_payment',
            status: 'pending',
            source: 'payment_page',
            payerName: request.payerName,
            payerEmail: request.payerEmail,
            payerAddress: request.payerAddress,
            purpose: request.purpose,
            invoiceNumber: request.invoiceNumber,
        };
    }

    getEmailStrategy(): PaymentEmailStrategy {
        return new ServicePaymentEmailStrategy();
    }
}

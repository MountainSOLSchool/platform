import {
    PaymentFactory,
    PaymentDbo,
    PaymentEmailStrategy,
    BasePaymentRequest,
    ValidationResult,
    validationSuccess,
    validationFailure,
} from '@sol/payments/domain';
import { MedicPaymentEmailStrategy } from '../email-strategies/medic.email-strategy';

export interface MedicClassDetails {
    className: string;
    location?: string;
    date?: string;
    time?: string;
}

export class MedicPaymentFactory
    implements PaymentFactory<BasePaymentRequest>
{
    constructor(private readonly classDetails?: MedicClassDetails) {}

    validate(request: BasePaymentRequest): ValidationResult {
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

        return errors.length === 0
            ? validationSuccess()
            : validationFailure(errors);
    }

    createPayment(
        request: BasePaymentRequest
    ): Omit<PaymentDbo, 'timestamp'> {
        const isVenmo = request.paymentMethodType === 'VenmoAccount';

        return {
            amount: request.amount,
            currency: 'USD',
            paymentMethod: isVenmo ? 'venmo' : 'card',
            paymentType: 'service_payment',
            status: 'pending',
            source: 'medic_signup',
            payerName: request.payerName,
            payerEmail: request.payerEmail,
            purpose: 'medic_class',
        };
    }

    getEmailStrategy(): PaymentEmailStrategy {
        return new MedicPaymentEmailStrategy(this.classDetails);
    }
}

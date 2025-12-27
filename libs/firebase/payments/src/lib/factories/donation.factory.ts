import {
    PaymentFactory,
    PaymentDbo,
    PaymentEmailStrategy,
    DonationRequest,
    ValidationResult,
    validationSuccess,
    validationFailure,
} from '@sol/payments/domain';
import { DonationEmailStrategy } from '../email-strategies/donation.email-strategy';

export class DonationFactory implements PaymentFactory<DonationRequest> {
    validate(request: DonationRequest): ValidationResult {
        const errors: string[] = [];

        if (!request.amount || request.amount <= 0 || request.amount > 9999) {
            errors.push(
                'Invalid donation amount. Please donate an amount under $10,000.'
            );
        }

        if (!request.paymentMethodNonce) {
            errors.push('Payment method is required.');
        }

        if (!request.payerName?.trim()) {
            errors.push('Donor name is required.');
        }

        if (!request.payerEmail?.trim()) {
            errors.push('Donor email is required.');
        }

        return errors.length === 0
            ? validationSuccess()
            : validationFailure(errors);
    }

    createPayment(request: DonationRequest): Omit<PaymentDbo, 'timestamp'> {
        const isVenmo = request.paymentMethodType === 'VenmoAccount';

        return {
            amount: request.amount,
            currency: 'USD',
            paymentMethod: isVenmo ? 'venmo' : 'card',
            paymentType: 'donation',
            status: 'pending',
            source: 'donation_page',
            payerName: request.payerName,
            payerEmail: request.payerEmail,
            payerAddress: request.payerAddress,
            referralSource: request.referralSource,
        };
    }

    getEmailStrategy(): PaymentEmailStrategy {
        return new DonationEmailStrategy();
    }
}

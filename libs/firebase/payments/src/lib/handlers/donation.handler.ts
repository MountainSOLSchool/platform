import { PaymentFactory, DonationRequest } from '@sol/payments/domain';
import { PaymentHandler } from '../payment-handler';
import { DonationFactory } from '../factories/donation.factory';

export class DonationHandler extends PaymentHandler<DonationRequest> {
    protected getFactory(): PaymentFactory<DonationRequest> {
        return new DonationFactory();
    }
}

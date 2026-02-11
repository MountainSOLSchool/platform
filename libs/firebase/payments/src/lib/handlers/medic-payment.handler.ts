import { PaymentFactory, BasePaymentRequest } from '@sol/payments/domain';
import { Braintree } from '@sol/payments/braintree';
import { PaymentHandler } from '../payment-handler';
import { MedicPaymentFactory, MedicClassDetails } from '../factories/medic-payment.factory';

export class MedicPaymentHandler extends PaymentHandler<BasePaymentRequest> {
    readonly #classDetails?: MedicClassDetails;

    constructor(braintree: Braintree, classDetails?: MedicClassDetails) {
        super(braintree);
        this.#classDetails = classDetails;
    }

    protected getFactory(): PaymentFactory<BasePaymentRequest> {
        return new MedicPaymentFactory(this.#classDetails);
    }
}

import { PaymentFactory, BasePaymentRequest } from '@sol/payments/domain';
import { PaymentHandler } from '../payment-handler';
import { MedicPaymentFactory } from '../factories/medic-payment.factory';

export class MedicPaymentHandler extends PaymentHandler<BasePaymentRequest> {
    protected getFactory(): PaymentFactory<BasePaymentRequest> {
        return new MedicPaymentFactory();
    }
}

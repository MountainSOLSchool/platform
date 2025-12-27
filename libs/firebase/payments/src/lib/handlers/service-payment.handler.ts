import { PaymentFactory, ServicePaymentRequest } from '@sol/payments/domain';
import { PaymentHandler } from '../payment-handler';
import { ServicePaymentFactory } from '../factories/service-payment.factory';

export class ServicePaymentHandler extends PaymentHandler<ServicePaymentRequest> {
    protected getFactory(): PaymentFactory<ServicePaymentRequest> {
        return new ServicePaymentFactory();
    }
}

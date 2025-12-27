import { PaymentDbo } from './payment.dbo';
import { PaymentEmailStrategy } from './payment-email.strategy';
import { ValidationResult } from './validation';

export interface PaymentFactory<TRequest> {
    validate(request: TRequest): ValidationResult;
    createPayment(request: TRequest): Omit<PaymentDbo, 'timestamp'>;
    getEmailStrategy(): PaymentEmailStrategy;
}

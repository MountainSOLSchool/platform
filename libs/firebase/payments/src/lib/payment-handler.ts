import { Braintree } from '@sol/payments/braintree';
import { DatabaseUtility } from '@sol/firebase/database';
import {
    PaymentFactory,
    PaymentResult,
    BasePaymentRequest,
    PaymentDbo,
} from '@sol/payments/domain';
import { PaymentRepository } from './payment.repository';

interface TransactionResult {
    success: boolean;
    transactionId?: string;
    errors?: string[];
}

export abstract class PaymentHandler<
    TRequest extends BasePaymentRequest,
> {
    constructor(protected readonly braintree: Braintree) {}

    protected abstract getFactory(): PaymentFactory<TRequest>;

    async handle(request: TRequest): Promise<PaymentResult> {
        const factory = this.getFactory();

        const validation = factory.validate(request);
        if (!validation.valid) {
            return {
                success: false,
                errors: validation.errors,
                message: validation.errors[0] ?? 'Validation failed',
            };
        }

        const paymentData = factory.createPayment(request);
        const paymentId = await PaymentRepository.create(paymentData);

        const txResult = await this.processTransaction(request, paymentData);
        if (!txResult.success) {
            await PaymentRepository.update(paymentId, {
                status: 'failed',
                errors: txResult.errors,
            });
            return {
                success: false,
                errors: txResult.errors ?? ['Transaction failed'],
                message: 'Unable to process payment. Please try again.',
            };
        }

        await PaymentRepository.update(paymentId, {
            status: 'completed',
            transactionId: txResult.transactionId,
            completedAt: new Date(),
        });

        await this.sendConfirmationEmail(
            { ...paymentData, timestamp: new Date() },
            txResult.transactionId!,
            factory
        );

        return {
            success: true,
            paymentId,
            transactionId: txResult.transactionId!,
            amount: request.amount,
        };
    }

    private async processTransaction(
        request: TRequest,
        payment: Omit<PaymentDbo, 'timestamp'>
    ): Promise<TransactionResult> {
        const isVenmo = request.paymentMethodType === 'VenmoAccount';

        try {
            const result = isVenmo
                ? await this.braintree.transactWithVenmo({
                      amount: request.amount,
                      nonce: request.paymentMethodNonce,
                      deviceData: request.deviceData,
                      customFields: {
                          purpose: payment.paymentType,
                      },
                  })
                : await this.braintree.transact({
                      amount: request.amount,
                      nonce: request.paymentMethodNonce,
                      deviceData: request.deviceData,
                      customer: { email: request.payerEmail },
                  });

            if (result.success && result.transaction) {
                return {
                    success: true,
                    transactionId: result.transaction.id,
                };
            }

            const errorMessages =
                result.errors?.deepErrors().map((e) => e.message) ?? [
                    'Transaction failed',
                ];
            return {
                success: false,
                errors: errorMessages,
            };
        } catch (error) {
            console.error('Payment transaction error:', error);
            return {
                success: false,
                errors: ['An unexpected error occurred during payment processing'],
            };
        }
    }

    private async sendConfirmationEmail(
        payment: PaymentDbo,
        transactionId: string,
        factory: PaymentFactory<TRequest>
    ): Promise<void> {
        const strategy = factory.getEmailStrategy();
        const { html, text } = strategy.generateContent({
            recipientName: payment.payerName,
            recipientEmail: payment.payerEmail,
            amount: payment.amount,
            transactionId,
            paymentMethod: payment.paymentMethod,
            address: payment.payerAddress,
            invoiceNumber: payment.invoiceNumber,
            purpose: payment.purpose,
            referralSource: payment.referralSource,
        });
        const subject = strategy.getSubject();

        await DatabaseUtility.getDatabase()
            .collection('mail')
            .add({
                to: payment.payerEmail,
                message: {
                    subject,
                    from: 'Mountain SOL School <info@mountainsol.org>',
                    replyTo: 'Mountain SOL School <info@mountainsol.org>',
                    messageId: `<${transactionId}.${Date.now()}@mountainsol.org>`,
                    html,
                    text,
                },
            });
    }
}

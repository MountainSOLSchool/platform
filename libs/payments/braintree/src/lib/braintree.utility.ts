import { BraintreeGateway, Environment } from 'braintree';
import { QualifiedTransaction } from '@sol/payments/transactions';

export class Braintree {
    constructor(
        private readonly secrets: Record<
            typeof Braintree.SECRET_NAMES[number],
            string
        >
    ) {
        this.gateway = new BraintreeGateway({
            environment: Environment.Sandbox,
            merchantId: secrets['BRAINTREE_MERCHANT_ID'],
            publicKey: secrets['BRAINTREE_PUBLIC_KEY'],
            privateKey: secrets['BRAINTREE_PRIVATE_KEY'],
        });
    }

    static SECRET_NAMES = [
        'BRAINTREE_MERCHANT_ID',
        'BRAINTREE_PUBLIC_KEY',
        'BRAINTREE_PRIVATE_KEY',
    ] as const;

    private gateway: BraintreeGateway;

    public async getClientToken() {
        return (await this.gateway.clientToken.generate({})).clientToken;
    }

    public async transact(transaction: QualifiedTransaction) {
        return await this.gateway.transaction.sale({
            amount: String(transaction.amount),
            paymentMethodNonce: transaction.nonce,
            options: {
                submitForSettlement: true,
            },
            customer: transaction.customer,
            deviceData: transaction.deviceData,
        });
    }
}

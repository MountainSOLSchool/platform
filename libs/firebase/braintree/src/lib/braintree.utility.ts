import { Customer, BraintreeGateway, Environment } from 'braintree';
import { PreparedTransaction } from '@sol/payments/transactions';
import admin from 'firebase-admin';

export class Braintree {
    constructor(
        private readonly secrets: Record<
            (typeof Braintree.SECRET_NAMES)[number],
            string
        >,
        private readonly strings: Record<
            (typeof Braintree.STRING_NAMES)[number],
            string
        >
    ) {
        const isProd = this.strings.BRAINTREE_ENV === 'PROD';
        const envSuffix = isProd ? '_PROD' : '';
        this.gateway = new BraintreeGateway({
            environment: isProd ? Environment.Production : Environment.Sandbox,
            merchantId: secrets[`BRAINTREE_MERCHANT_ID${envSuffix}`],
            publicKey: secrets[`BRAINTREE_PUBLIC_KEY${envSuffix}`],
            privateKey: secrets[`BRAINTREE_PRIVATE_KEY${envSuffix}`],
        });
    }

    static SECRET_NAMES = [
        'BRAINTREE_MERCHANT_ID',
        'BRAINTREE_PUBLIC_KEY',
        'BRAINTREE_PRIVATE_KEY',
        'BRAINTREE_MERCHANT_ID_PROD',
        'BRAINTREE_PUBLIC_KEY_PROD',
        'BRAINTREE_PRIVATE_KEY_PROD',
    ] as const;

    static STRING_NAMES = ['BRAINTREE_ENV'] as const;

    private gateway: BraintreeGateway;

    public async getClientToken(user: admin.auth.UserRecord) {
        let customer: Customer | undefined;
        try {
            customer = await this.gateway.customer.find(user.uid);
        } catch (e) {
            console.error(e);
        }
        if (!customer) {
            const { customer: created } = await this.gateway.customer.create({
                id: user.uid,
                email: user.email,
            });
            customer = created;
        }
        const response = await this.gateway.clientToken.generate({
            customerId: customer.id,
        });
        return response.clientToken;
    }

    public async transact(transaction: PreparedTransaction) {
        return await this.gateway.transaction.sale({
            amount: transaction.amount.toFixed(2),
            paymentMethodNonce: transaction.nonce,
            options: {
                submitForSettlement: true,
            },
            customer: transaction.customer,
            deviceData: transaction.deviceData,
        });
    }
}

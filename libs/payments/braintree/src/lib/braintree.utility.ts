import { BraintreeGateway, Environment } from 'braintree';
import { PreparedTransaction } from '@sol/payments/transactions';
import { type auth } from 'firebase-admin';

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

    public async getClientToken(user: auth.UserRecord) {
        let customer: braintree.Customer | undefined;
        try {
            customer = await this.gateway.customer.find(user.uid);
        } catch (e) {
            console.log(e);
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

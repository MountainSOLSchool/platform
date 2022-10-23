import * as braintree from 'braintree';

export class Braintree {
    constructor(
        private readonly secrets: Record<
            typeof Braintree.SECRET_NAMES[number],
            string
        >
    ) {
        this.gateway = new braintree.BraintreeGateway({
            environment: braintree.Environment.Sandbox,
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

    private gateway: braintree.BraintreeGateway;

    public async getClientToken() {
        return (await this.gateway.clientToken.generate({})).clientToken;
    }
}

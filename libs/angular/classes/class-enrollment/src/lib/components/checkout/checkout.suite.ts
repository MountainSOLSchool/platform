import { create, enforce, test } from 'vest';

export const createCheckoutSuite = () =>
    create('checkout', (checkout: { hasPaymentMethod: boolean }) => {
        test('hasPaymentMethod', 'Please select a payment method', () => {
            enforce(checkout.hasPaymentMethod).isTruthy();
        });
    });

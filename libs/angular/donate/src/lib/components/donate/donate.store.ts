import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { cardPaymentMethodPayload } from 'braintree-web-drop-in';

interface State {
    paymentMethod:
        | {
              nonce: string;
              deviceData: string;
              paymentDetails: cardPaymentMethodPayload['details'];
          }
        | undefined;
    name: string;
    email: string;
    amount: number;
}

@Injectable()
export class DonateStore extends ComponentStore<State> {
    constructor() {
        super({
            paymentMethod: undefined,
        });
    }
}

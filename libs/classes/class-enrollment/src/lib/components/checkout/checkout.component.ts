import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { PaymentCollectorComponent } from '@sol/payments/braintree-client';
import {
    QualifiedTransaction,
    UnqualifiedTransaction,
} from '@sol/payments/transactions';
import { PaymentMethodPayload } from 'braintree-web-drop-in';
import { ButtonModule } from 'primeng/button';
import { map, Observable, Subject } from 'rxjs';

@Component({
    standalone: true,
    imports: [CommonModule, PaymentCollectorComponent, ButtonModule],
    templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
    private _payClick = new Subject<void>();
    public readonly testTransaction$: Observable<UnqualifiedTransaction> =
        this._payClick.pipe(
            map(() => ({
                amount: 10,
                customer: { email: 'test@email.com' },
            }))
        );

    pay() {
        this._payClick.next();
    }

    handleUncommittedTransaction(transaction: QualifiedTransaction) {
        console.log(transaction);
    }
}

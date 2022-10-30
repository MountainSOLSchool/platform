import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PaymentCollectorComponent } from '@sol/payments/braintree-client';
import {
    PreparedTransaction,
    UnpreparedTransaction,
} from '@sol/payments/transactions';
import { ButtonModule } from 'primeng/button';
import { map, Observable, tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

@Component({
    standalone: true,
    imports: [CommonModule, PaymentCollectorComponent, ButtonModule],
    templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);

    public readonly testTransaction$: Observable<UnpreparedTransaction> =
        this.workflow.nextClick$.pipe(
            tap(() => console.log('nexty')),
            map(() => ({
                amount: 10,
                customer: { email: 'test@email.com' },
            }))
        );

    handleUncommittedTransaction(transaction: PreparedTransaction) {
        console.log('handled');
        this.workflow.completeCheckout(transaction);
    }
}

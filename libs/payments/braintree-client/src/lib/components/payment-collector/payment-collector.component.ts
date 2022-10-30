import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, Output } from '@angular/core';
import {
    PreparedTransaction,
    UnpreparedTransaction,
} from '@sol/payments/transactions';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable, tap } from 'rxjs';
import { PaymentCollectorStore } from './payment-collector.store';

@Component({
    standalone: true,
    imports: [CommonModule, SkeletonModule],
    selector: 'sol-payment-collector',
    templateUrl: './payment-collector.component.html',
})
export class PaymentCollectorComponent implements OnInit {
    store = inject(PaymentCollectorStore);

    @Input() set prepare(
        transaction: UnpreparedTransaction | null | undefined
    ) {
        if (transaction) {
            this.store.prepareTransaction(transaction);
        }
    }

    @Output() uncommittedTransaction: Observable<PreparedTransaction> =
        this.store
            .selectUncommittedTransaction()
            .pipe(
                tap(() =>
                    this.store.patchState({ uncommittedTransaction: undefined })
                )
            );

    readonly COLLECTOR_ELEMENT_SELECTOR = 'payment-collector';

    readonly loading$ = this.store.select(({ token }) => !token);

    ngOnInit(): void {
        this.store.initialize(this.COLLECTOR_ELEMENT_SELECTOR);
    }
}

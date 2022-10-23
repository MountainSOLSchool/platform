import { Component, inject, Input, OnInit, Output } from '@angular/core';
import {
    QualifiedTransaction,
    UnqualifiedTransaction,
} from '@sol/payments/transactions';
import { Observable } from 'rxjs';
import { PaymentCollectorStore } from './payment-collector.store';

@Component({
    standalone: true,
    imports: [PaymentCollectorStore],
    selector: 'sol-payment-collector',
    templateUrl: './payment-collector.component.html',
})
export class PaymentCollectorComponent implements OnInit {
    store = inject(PaymentCollectorStore);

    @Input() set prepare(
        transaction: UnqualifiedTransaction | null | undefined
    ) {
        if (transaction) {
            this.store.prepareTransaction(transaction);
        }
    }

    @Output() uncommittedTransaction: Observable<QualifiedTransaction> =
        this.store.selectUncommittedTransaction();

    readonly COLLECTOR_ELEMENT_SELECTOR = 'payment-collector';

    ngOnInit(): void {
        this.store.initialize(this.COLLECTOR_ELEMENT_SELECTOR);
    }
}

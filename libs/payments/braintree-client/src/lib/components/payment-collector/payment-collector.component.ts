import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Output } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { PaymentMethodPayload } from 'braintree-web-drop-in';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable, of } from 'rxjs';
import { PaymentCollectorStore } from './payment-collector.store';

export type PaymentCollector = {
    collectPaymentMethod: () => Observable<{
        nonce: string;
        deviceData: string;
        paymentDetails: PaymentMethodPayload['details'];
    }>;
};

@Component({
    standalone: true,
    imports: [CommonModule, SkeletonModule],
    selector: 'sol-payment-collector',
    templateUrl: './payment-collector.component.html',
    providers: [provideComponentStore(PaymentCollectorStore)],
})
export class PaymentCollectorComponent implements OnInit {
    store = inject(PaymentCollectorStore);

    @Output() paymentMethod: Observable<{
        nonce: string;
        deviceData: string;
        paymentDetails: PaymentMethodPayload['details'];
    }> = this.store.selectPaymentMethod();

    readonly COLLECTOR_ELEMENT_SELECTOR = 'payment-collector';

    readonly loading$ = this.store.select(({ token }) => !token);

    ngOnInit(): void {
        this.store.initialize(this.COLLECTOR_ELEMENT_SELECTOR);
    }
}

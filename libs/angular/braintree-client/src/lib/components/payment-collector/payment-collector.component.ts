import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { cardPaymentMethodPayload } from 'braintree-web-drop-in';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable } from 'rxjs';
import { PaymentCollectorStore } from './payment-collector.store';

export type PaymentCollector = {
    collectPaymentMethod: () => Observable<{
        nonce: string;
        deviceData: string;
        paymentDetails: cardPaymentMethodPayload['details'];
    }>;
};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, SkeletonModule],
    selector: 'sol-payment-collector',
    templateUrl: './payment-collector.component.html',
    providers: [provideComponentStore(PaymentCollectorStore)],
})
export class PaymentCollectorComponent implements OnInit {
    store = inject(PaymentCollectorStore);

    @Input() set randomValueThatResetsPaymentCollector(token: string) {
        this.store.resetDropInInstance();
    }

    @Input() anonymous = false;
    @Input() paymentMethods: string[] = ['card', 'paypal', 'venmo'];

    @Output() paymentMethod: Observable<
        | {
              nonce: string;
              deviceData: string;
              paymentDetails: cardPaymentMethodPayload['details'];
          }
        | undefined
    > = this.store.selectPaymentMethod();

    readonly COLLECTOR_ELEMENT_SELECTOR = 'payment-collector';

    readonly loading$ = this.store.select(({ token }) => !token);

    ngOnInit(): void {
        this.store.initialize({
            elementSelector: this.COLLECTOR_ELEMENT_SELECTOR,
            anonymous: this.anonymous,
            paymentMethods: this.paymentMethods,
        });
    }
}

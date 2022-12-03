import { CommonModule } from '@angular/common';
import { Component, inject, Injectable, Output } from '@angular/core';
import { ComponentStore, provideComponentStore } from '@ngrx/component-store';
import {
    PaymentCollector,
    PaymentCollectorComponent,
} from '@sol/payments/braintree-client';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, of, switchMap, tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

@Injectable()
class CheckoutStore extends ComponentStore<{
    collector: PaymentCollector | undefined;
}> {
    readonly workflow = inject(EnrollmentWorkflowStore);

    constructor() {
        super({
            collector: undefined,
        });
    }

    readonly collect = this.effect((collect$) => {
        return collect$.pipe(
            switchMap(
                () =>
                    this.get()
                        .collector?.collectPaymentMethod()
                        .pipe(
                            tap((paymentMethod) => {
                                this.workflow.patchState({
                                    paymentMethod,
                                });
                            })
                        ) ?? of()
            )
        );
    });
}

@Component({
    standalone: true,
    imports: [
        CommonModule,
        PaymentCollectorComponent,
        ButtonModule,
        InputTextModule,
        ChipModule,
    ],
    selector: 'sol-checkout',
    templateUrl: './checkout.component.html',
    providers: [provideComponentStore(CheckoutStore)],
})
export class CheckoutComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);
    private readonly store = inject(CheckoutStore);

    discountCodes$ = this.workflow.select((s) => s.discountCodes);

    @Output() validityChange = this.workflow.select((s) => !!s.paymentMethod);

    paymentCollector: PaymentCollector | undefined;

    validatePaymentMethod = () => {
        this.store.collect();
    };

    setPaymentCollector(collector: PaymentCollector) {
        this.paymentCollector = collector;
    }

    applyDiscountCode(code: string) {
        this.workflow.patchState((s) => ({
            ...s,
            discountCodes: Array.from(new Set([...s.discountCodes, code])),
        }));
    }
}

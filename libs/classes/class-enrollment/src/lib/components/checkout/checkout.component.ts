import { CommonModule } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { ComponentStore, provideComponentStore } from '@ngrx/component-store';
import {
    PaymentCollector,
    PaymentCollectorComponent,
} from '@sol/payments/braintree-client';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { of, switchMap, tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

@Injectable()
class CheckoutStore extends ComponentStore<{
    collector: PaymentCollector | undefined;
    nonce: string | undefined;
    discountCodes: Array<string>;
}> {
    readonly workflow = inject(EnrollmentWorkflowStore);

    constructor() {
        super({ nonce: undefined, collector: undefined, discountCodes: [] });
    }

    readonly next = this.effect(() => {
        return this.workflow.nextClick$.pipe(
            tap(() => console.log('handling')),
            switchMap(
                () =>
                    this.get()
                        .collector?.collectPaymentMethod()
                        .pipe(
                            tap((paymentMethod) =>
                                this.workflow.completeStep({
                                    paymentMethod,
                                    discountCodes: this.get().discountCodes,
                                })
                            )
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
    templateUrl: './checkout.component.html',
    providers: [provideComponentStore(CheckoutStore)],
})
export class CheckoutComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);
    private readonly store = inject(CheckoutStore);

    discountCodes$ = this.store.select((s) => s.discountCodes);

    // TODO: preserve payment method selection when returning

    setPaymentCollector(collector: PaymentCollector) {
        this.store.patchState({ collector });
    }

    applyDiscountCode(code: string) {
        this.store.patchState((s) => ({
            discountCodes: Array.from(new Set([...s.discountCodes, code])),
        }));
    }
}

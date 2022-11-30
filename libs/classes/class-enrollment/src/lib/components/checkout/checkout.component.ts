import { CdkStepper } from '@angular/cdk/stepper';
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
import { BehaviorSubject, map, of, Subject, switchMap, tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { PaymentMethodPayload } from 'braintree-web-drop-in';

@Injectable()
class CheckoutStore extends ComponentStore<{
    collector: PaymentCollector | undefined;
    paymentMethod:
        | {
              nonce: string;
              deviceData: string;
              paymentDetails: PaymentMethodPayload['details'];
          }
        | undefined;
}> {
    readonly workflow = inject(EnrollmentWorkflowStore);

    constructor() {
        super({
            collector: undefined,
            paymentMethod: undefined,
        });
    }

    readonly collect = this.effect((collect$) => {
        return collect$.pipe(
            tap(() => console.log('handling')),
            switchMap(
                () =>
                    this.get()
                        .collector?.collectPaymentMethod()
                        .pipe(
                            tap((paymentMethod) =>
                                this.workflow.completeStep({
                                    paymentMethod,
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
    selector: 'sol-checkout',
    templateUrl: './checkout.component.html',
    providers: [provideComponentStore(CheckoutStore)],
})
export class CheckoutComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);
    private readonly store = inject(CheckoutStore);

    discountCodes$ = this.workflow.select((s) => s.enrollment.discountCodes);

    @Output() validityChange = this.workflow.select(
        (s) => !!s.enrollment.paymentMethod
    );

    paymentCollector: PaymentCollector | undefined;

    validatePaymentMethod = () => {
        this.store.collect();
        return true;
    };

    setPaymentCollector(collector: PaymentCollector) {
        this.store.patchState({ collector });
        this.paymentCollector = collector;
    }

    applyDiscountCode(code: string) {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                discountCodes: Array.from(
                    new Set([...s.enrollment.discountCodes, code])
                ),
            },
        }));
    }
}

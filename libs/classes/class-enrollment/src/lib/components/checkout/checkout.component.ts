import { CommonModule } from '@angular/common';
import { Component, inject, Input, Output } from '@angular/core';
import {
    PaymentCollector,
    PaymentCollectorComponent,
} from '@sol/payments/braintree-client';
import { PaymentMethodPayload } from 'braintree-web-drop-in';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { MessagesComponent } from '@sol/form/validity';
import { create, enforce, test } from 'vest';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { LetModule } from '@rx-angular/template/let';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        PaymentCollectorComponent,
        ButtonModule,
        InputTextModule,
        ChipModule,
        MessagesComponent,
        LetModule,
    ],
    selector: 'sol-checkout',
    templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);
    private readonly user$ = inject(AngularFireAuth).user;

    readonly discountCodes$ = this.workflow.select((s) => s.discountCodes);
    readonly hasPaymentMethod$ = this.workflow.select((s) => {
        console.log(s.paymentMethod);
        return !!s.paymentMethod;
    });
    private readonly interacted$ = new BehaviorSubject(false);

    private readonly suite = create(
        'checkout',
        (checkout: { hasPaymentMethod: boolean }) => {
            test('hasPaymentMethod', 'Please select a payment method', () => {
                enforce(checkout.hasPaymentMethod).isTruthy();
            });
        }
    );

    readonly errors$ = this.hasPaymentMethod$.pipe(
        map((hasPaymentMethod) => {
            return this.suite({
                hasPaymentMethod,
            }).getErrors();
        })
    );

    readonly viewModel$ = combineLatest([
        this.errors$,
        this.interacted$,
        this.discountCodes$,
        this.user$,
    ]).pipe(
        map(([errors, interacted, discountCodes, user]) => {
            return {
                errors: interacted ? errors : {},
                discountCodes,
                hasCreatedAccount: !!user,
            };
        })
    );

    @Input() set interacted(value: boolean) {
        this.interacted$.next(value);
    }

    @Output() validityChange = this.errors$.pipe(
        map((errors) => Object.keys(errors).length === 0)
    );

    paymentCollector: PaymentCollector | undefined;

    setPaymentMethod(
        paymentMethod:
            | {
                  nonce: string;
                  deviceData: string;
                  paymentDetails: PaymentMethodPayload['details'];
              }
            | undefined
    ) {
        this.workflow.patchState({
            paymentMethod,
        });
    }

    applyDiscountCode(code: string) {
        this.workflow.patchState((s) => ({
            ...s,
            discountCodes: Array.from(new Set([...s.discountCodes, code])),
        }));
    }
}

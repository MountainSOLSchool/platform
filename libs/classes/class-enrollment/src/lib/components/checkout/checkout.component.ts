import { CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import {
    PaymentCollector,
    PaymentCollectorComponent,
} from '@sol/payments/braintree-client';
import { PaymentMethodPayload } from 'braintree-web-drop-in';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

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
})
export class CheckoutComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);

    discountCodes$ = this.workflow.select((s) => s.discountCodes);

    @Output() validityChange = this.workflow.select((s) => !!s.paymentMethod);

    paymentCollector: PaymentCollector | undefined;

    setPaymentMethod(paymentMethod: {
        nonce: string;
        deviceData: string;
        paymentDetails: PaymentMethodPayload['details'];
    }) {
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

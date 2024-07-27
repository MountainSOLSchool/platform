import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
} from '@angular/core';
import { PaymentCollectorComponent } from '@sol/payments/braintree-client';
import { cardPaymentMethodPayload } from 'braintree-web-drop-in';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { MessagesComponent } from '@sol/form/validity';
import { create, enforce, test } from 'vest';
import { BehaviorSubject, combineLatest, map, skip, startWith } from 'rxjs';
import { RxLet } from '@rx-angular/template/let';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { UserService } from '@sol/auth/user';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        PaymentCollectorComponent,
        ButtonModule,
        InputTextModule,
        ChipModule,
        MessagesComponent,
        RxLet,
    ],
    selector: 'sol-checkout',
    templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);
    private readonly user$ = inject(UserService).getUser();
    private readonly functions = inject(FirebaseFunctionsService);

    readonly discountCodes$ = this.workflow.select(
        (s) => s.enrollment.discountCodes
    );
    readonly hasPaymentMethod$ = this.workflow
        .select((s) => {
            return s.enrollment.paymentMethod;
        })
        .pipe(
            skip(1),
            map((paymentMethod) => !!paymentMethod),
            startWith(false)
        );
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

    @Input() randomValueThatResetsPaymentCollector = Math.random().toString();

    @Output() validityChange = this.errors$.pipe(
        map((errors) => Object.keys(errors).length === 0)
    );

    setPaymentMethod(
        paymentMethod:
            | {
                  nonce: string;
                  deviceData: string;
                  paymentDetails: cardPaymentMethodPayload['details'];
              }
            | undefined
    ) {
        this.workflow.patchState((s) => ({
            enrollment: { ...s.enrollment, paymentMethod },
        }));
    }
}

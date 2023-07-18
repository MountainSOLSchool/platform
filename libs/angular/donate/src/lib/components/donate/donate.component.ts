import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PaymentCollectorComponent } from '@sol/payments/braintree-client';
import { cardPaymentMethodPayload } from 'braintree-web-drop-in';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesComponent } from '@sol/form/validity';
import { create, enforce, test } from 'vest';
import { BehaviorSubject, combineLatest, map, skip, startWith } from 'rxjs';
import { LetModule } from '@rx-angular/template/let';
import { DonateStore } from './donate.store';
import { provideComponentStore } from '@ngrx/component-store';
import { InputMaskModule } from 'primeng/inputmask';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        PaymentCollectorComponent,
        ButtonModule,
        InputTextModule,
        ChipModule,
        MessagesComponent,
        LetModule,
        InputMaskModule,
        ReactiveFormsModule,
    ],
    providers: [provideComponentStore(DonateStore)],
    selector: 'sol-donate',
    templateUrl: './donate.component.html',
})
export class DonateComponent {
    private readonly store = inject(DonateStore);

    readonly hasPaymentMethod$ = this.store
        .select((s) => {
            return s.paymentMethod;
        })
        .pipe(
            skip(1),
            map((paymentMethod) => !!paymentMethod),
            startWith(false)
        );

    private readonly suite = create(
        'donate',
        (form: { hasPaymentMethod: boolean }) => {
            test('hasPaymentMethod', 'Please select a payment method', () => {
                enforce(form.hasPaymentMethod).isTruthy();
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

    private readonly triedToPay$ = new BehaviorSubject(false);

    readonly viewModel$ = combineLatest([
        this.errors$,
        this.store.state$,
        this.triedToPay$,
    ]).pipe(
        map(([errors, triedToPay]) => {
            return {
                errors: triedToPay ? errors : {},
            };
        })
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
        this.store.patchState({
            paymentMethod,
        });
    }
}

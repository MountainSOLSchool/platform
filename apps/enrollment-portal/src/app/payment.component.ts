import {
    Component,
    inject,
    signal,
    computed,
    linkedSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { PaymentCollectorComponent } from '@sol/payments/braintree-client';
import { UserService } from '@sol/auth/user';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { toSignal } from '@angular/core/rxjs-interop';
import * as browserDetection from '@braintree/browser-detection';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'sol-payment',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        PaymentCollectorComponent,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
    ],
    template: `
        <div class="form-container">
            <mat-card class="form-card">
                <mat-card-header>
                    <mat-card-title>Make a Payment</mat-card-title>
                </mat-card-header>

                <mat-card-content>
                    @if (errorMessage()) {
                        <div class="error-banner">
                            <mat-icon>error</mat-icon>
                            <span>{{ errorMessage() }}</span>
                        </div>
                    }

                    @if (!paymentComplete()) {
                        <form class="form-content">
                            <div class="form-field">
                                <label class="field-label required"
                                    >Full Name</label
                                >
                                <input
                                    type="text"
                                    [(ngModel)]="payerName"
                                    name="payerName"
                                    placeholder="Enter your full name"
                                    class="form-input"
                                />
                            </div>

                            <div class="form-field">
                                <label class="field-label required"
                                    >Email Address</label
                                >
                                <input
                                    type="email"
                                    [(ngModel)]="payerEmail"
                                    name="payerEmail"
                                    placeholder="your.email@example.com"
                                    class="form-input"
                                />
                            </div>

                            <div class="form-field">
                                <label class="field-label required"
                                    >Street Address</label
                                >
                                <input
                                    type="text"
                                    [(ngModel)]="street"
                                    name="street"
                                    placeholder="123 Main St"
                                    class="form-input"
                                />
                            </div>

                            <div class="address-row">
                                <div class="form-field city-field">
                                    <label class="field-label required"
                                        >City</label
                                    >
                                    <input
                                        type="text"
                                        [(ngModel)]="city"
                                        name="city"
                                        placeholder="City"
                                        class="form-input"
                                    />
                                </div>

                                <div class="form-field state-field">
                                    <label class="field-label required"
                                        >State</label
                                    >
                                    <input
                                        type="text"
                                        [(ngModel)]="state"
                                        name="state"
                                        placeholder="CA"
                                        maxlength="2"
                                        class="form-input uppercase"
                                    />
                                </div>

                                <div class="form-field zip-field">
                                    <label class="field-label required"
                                        >ZIP</label
                                    >
                                    <input
                                        type="text"
                                        [(ngModel)]="zip"
                                        name="zip"
                                        placeholder="12345"
                                        maxlength="5"
                                        class="form-input"
                                    />
                                </div>
                            </div>

                            <div class="form-field">
                                <label class="field-label"
                                    >Invoice Number (optional)</label
                                >
                                <input
                                    type="text"
                                    [(ngModel)]="invoiceNumber"
                                    name="invoiceNumber"
                                    placeholder="e.g., INV-2024-001"
                                    class="form-input"
                                />
                            </div>

                            <div class="form-field">
                                <label class="field-label required"
                                    >Purpose</label
                                >
                                <input
                                    type="text"
                                    [(ngModel)]="purpose"
                                    name="purpose"
                                    placeholder="e.g., First Aid Class - ABC Company"
                                    class="form-input"
                                />
                            </div>

                            <div class="form-field">
                                <label class="field-label required"
                                    >Payment Amount</label
                                >
                                <div class="amount-input-wrapper">
                                    <span class="currency-prefix">$</span>
                                    <input
                                        type="number"
                                        [(ngModel)]="paymentAmount"
                                        name="paymentAmount"
                                        placeholder="0.00"
                                        min="1"
                                        class="form-input amount-input"
                                        [class.input-error]="
                                            amountExceedsLimit()
                                        "
                                    />
                                </div>
                                @if (amountExceedsLimit()) {
                                    <span class="field-error">
                                        For amounts over $9,999, please contact
                                        us at
                                        <a href="mailto:info@mountainsol.org"
                                            >info&#64;mountainsol.org</a
                                        >
                                    </span>
                                } @else {
                                    <span class="field-hint">Minimum: $1</span>
                                }
                            </div>

                            @if (isIosButNotSafari()) {
                                <div class="ios-warning">
                                    <mat-icon>info</mat-icon>
                                    <span
                                        >Please use Safari on iOS to use Venmo
                                        as an option.</span
                                    >
                                </div>
                            }

                            @if (isLoggedIn() !== undefined) {
                                <div class="form-field">
                                    <label class="field-label required"
                                        >Payment Method</label
                                    >
                                    <sol-payment-collector
                                        [anonymous]="!isLoggedIn()"
                                        [paymentMethods]="['card', 'venmo']"
                                        (paymentMethod)="
                                            setPaymentMethod($event)
                                        "
                                    >
                                    </sol-payment-collector>
                                </div>
                            }

                            <button
                                mat-raised-button
                                color="primary"
                                class="submit-button"
                                [disabled]="!canPay() || processing()"
                                (click)="processPayment()"
                            >
                                @if (processing()) {
                                    <mat-spinner diameter="20"></mat-spinner>
                                    <span>Processing...</span>
                                } @else {
                                    <mat-icon>check</mat-icon>
                                    <span>Submit Payment</span>
                                }
                            </button>
                        </form>
                    } @else {
                        <div class="success-content">
                            <div class="success-icon">
                                <mat-icon>check_circle</mat-icon>
                            </div>
                            <h2>Payment Successful!</h2>
                            <p>
                                Your payment of
                                <strong
                                    >\${{
                                        paymentAmount() | number: '1.2-2'
                                    }}</strong
                                >
                                has been processed successfully.
                            </p>
                            <p>
                                A confirmation email has been sent to
                                <strong>{{ payerEmail() }}</strong
                                >.
                            </p>
                            <p class="transaction-id">
                                <strong>Transaction ID:</strong>
                                {{ transactionId() }}
                            </p>
                            <button
                                mat-raised-button
                                color="primary"
                                (click)="reset()"
                            >
                                Make Another Payment
                            </button>
                        </div>
                    }
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
                min-height: 100vh;
            }

            .form-container {
                padding: 1rem;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                min-height: 100vh;
            }

            .form-card {
                width: 100%;
                max-width: 600px;
            }

            mat-card-header {
                margin-bottom: 1.5rem;
            }

            mat-card-title {
                font-size: 1.5rem;
                font-weight: 500;
            }

            mat-card-subtitle a {
                color: #1976d2;
                text-decoration: none;
            }

            mat-card-subtitle a:hover {
                text-decoration: underline;
            }

            .form-content {
                display: flex;
                flex-direction: column;
                gap: 1.25rem;
            }

            .form-field {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .field-label {
                font-weight: 500;
                font-size: 0.875rem;
                color: rgba(0, 0, 0, 0.87);
            }

            .field-label.required::after {
                content: ' *';
                color: #f44336;
            }

            .form-input {
                width: 100%;
                padding: 0.75rem;
                font-size: 1rem;
                border: 1px solid rgba(0, 0, 0, 0.23);
                border-radius: 4px;
                background: white;
                box-sizing: border-box;
                transition:
                    border-color 0.2s,
                    box-shadow 0.2s;
            }

            .form-input:focus {
                outline: none;
                border-color: #3b82f6;
                box-shadow: 0 0 0 1px #3b82f6;
            }

            .form-input::placeholder {
                color: rgba(0, 0, 0, 0.42);
            }

            .form-input.uppercase {
                text-transform: uppercase;
            }

            .address-row {
                display: grid;
                grid-template-columns: 1fr 100px 120px;
                gap: 1rem;
            }

            .city-field,
            .state-field,
            .zip-field {
                min-width: 0;
            }

            .amount-input-wrapper {
                position: relative;
                display: flex;
                align-items: center;
            }

            .currency-prefix {
                position: absolute;
                left: 0.75rem;
                color: rgba(0, 0, 0, 0.6);
                font-size: 1rem;
                pointer-events: none;
            }

            .amount-input {
                padding-left: 1.75rem !important;
            }

            .field-hint {
                font-size: 0.75rem;
                color: rgba(0, 0, 0, 0.6);
            }

            .field-error {
                font-size: 0.75rem;
                color: #c62828;
            }

            .field-error a {
                color: #c62828;
            }

            .input-error {
                border-color: #c62828 !important;
            }

            .error-banner {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem;
                background-color: #ffebee;
                color: #c62828;
                border-radius: 4px;
                margin-bottom: 1rem;
            }

            .error-banner mat-icon {
                flex-shrink: 0;
            }

            .ios-warning {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem;
                background-color: #fff3e0;
                color: #e65100;
                border-radius: 4px;
            }

            .submit-button {
                height: 48px;
                font-size: 1rem;
                margin-top: 0.5rem;
                background-color: #3b82f6 !important;
                color: white !important;
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
            }

            .submit-button:disabled {
                background-color: rgba(0, 0, 0, 0.12) !important;
                color: rgba(0, 0, 0, 0.38) !important;
            }

            .submit-button ::ng-deep .mdc-button__label {
                display: flex;
                align-items: center;
            }

            .submit-button mat-spinner,
            .submit-button mat-icon {
                margin-right: 8px;
            }

            .success-content {
                text-align: center;
                padding: 2rem 0;
            }

            .success-icon {
                margin-bottom: 1rem;
            }

            .success-icon mat-icon {
                font-size: 64px;
                width: 64px;
                height: 64px;
                color: #4caf50;
            }

            .success-content h2 {
                margin: 0 0 1rem 0;
                color: #333;
            }

            .success-content p {
                margin: 0.5rem 0;
                color: #666;
            }

            .transaction-id {
                margin-top: 1rem !important;
                padding: 0.5rem;
                background-color: #f5f5f5;
                border-radius: 4px;
                font-family: monospace;
            }

            .success-content button {
                margin-top: 1.5rem;
                background-color: #3b82f6 !important;
                color: white !important;
            }

            @media (max-width: 768px) {
                .form-container {
                    padding: 0.5rem;
                }

                .address-row {
                    grid-template-columns: 1fr;
                }

                .submit-button {
                    height: 56px;
                }
            }
        `,
    ],
})
export class PaymentComponent {
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly userService = inject(UserService);

    private readonly user = toSignal(this.userService.getUser());
    readonly isLoggedIn = computed(() => {
        const user = this.user();
        return user === undefined ? undefined : !!user;
    });

    paymentAmount = signal<number | null>(null);
    payerName = signal<string>('');
    payerEmail = linkedSignal(() => this.user()?.email ?? '');
    street = signal<string>('');
    city = signal<string>('');
    state = signal<string>('');
    zip = signal<string>('');
    invoiceNumber = signal<string>('');
    purpose = signal<string>('');
    paymentMethodData = signal<
        | {
              nonce: string;
              deviceData: string;
              type: string;
          }
        | undefined
    >(undefined);
    processing = signal(false);

    paymentResult = signal<
        | { status: 'idle' }
        | { status: 'processing' }
        | { status: 'success'; transactionId: string }
        | { status: 'error'; message: string }
    >({ status: 'idle' });

    readonly errorMessage = computed(() => {
        const result = this.paymentResult();
        return result.status === 'error' ? result.message : null;
    });

    readonly amountExceedsLimit = computed(() => {
        const amount = this.paymentAmount();
        return amount !== null && amount > 9999;
    });

    readonly paymentComplete = computed(
        () => this.paymentResult().status === 'success'
    );

    readonly transactionId = computed(() => {
        const result = this.paymentResult();
        return result.status === 'success' ? result.transactionId : '';
    });

    readonly canPay = computed(() => {
        const hasName = this.payerName().trim().length > 0;
        const hasValidEmail = this.isValidEmail(this.payerEmail());
        const hasAddress =
            this.street().trim().length > 0 &&
            this.city().trim().length > 0 &&
            this.state().trim().length === 2 &&
            this.zip().trim().length === 5;
        const hasPurpose = this.purpose().trim().length > 0;
        const amount = this.paymentAmount();
        const hasValidAmount = amount !== null && amount >= 1 && amount <= 9999;
        const hasPaymentMethod = !!this.paymentMethodData();

        return (
            hasName &&
            hasValidEmail &&
            hasAddress &&
            hasPurpose &&
            hasValidAmount &&
            hasPaymentMethod &&
            !this.processing()
        );
    });

    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setPaymentMethod(
        method:
            | {
                  nonce: string;
                  deviceData: string;
                  type: string;
              }
            | undefined
    ) {
        this.paymentMethodData.set(method);
    }

    processPayment() {
        const paymentMethod = this.paymentMethodData();
        if (!this.canPay() || !paymentMethod) return;

        this.processing.set(true);
        this.paymentResult.set({ status: 'processing' });

        const fullAddress = [
            this.street(),
            this.city(),
            this.state(),
            this.zip(),
        ].join(', ');

        this.functions
            .call<{
                success: boolean;
                transactionId: string;
                message: string;
            }>('payment', {
                amount: this.paymentAmount(),
                paymentMethodNonce: paymentMethod.nonce,
                deviceData: paymentMethod.deviceData,
                paymentMethodType: paymentMethod.type,
                payerName: this.payerName(),
                payerEmail: this.payerEmail(),
                payerAddress: fullAddress,
                invoiceNumber: this.invoiceNumber() || undefined,
                purpose: this.purpose(),
            })
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe((result) => {
                if (result.success) {
                    this.paymentResult.set({
                        status: 'success',
                        transactionId: result.transactionId,
                    });
                } else {
                    this.paymentResult.set({
                        status: 'error',
                        message:
                            result.message ||
                            'Unable to process payment. Please try again.',
                    });
                }
                this.processing.set(false);
            });
    }

    reset() {
        this.paymentAmount.set(null);
        this.payerName.set('');
        this.street.set('');
        this.city.set('');
        this.state.set('');
        this.zip.set('');
        this.invoiceNumber.set('');
        this.purpose.set('');
        this.paymentMethodData.set(undefined);
        this.processing.set(false);
        this.paymentResult.set({ status: 'idle' });

        const user = this.user();
        if (user?.email) {
            this.payerEmail.set(user.email);
        }
    }

    isIosButNotSafari() {
        return browserDetection.isIos() && !browserDetection.isIosSafari();
    }
}

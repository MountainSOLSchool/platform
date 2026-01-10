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
import * as browserDetection from '@braintree/browser-detection';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'sol-donate-full',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        PaymentCollectorComponent,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDialogModule,
    ],
    template: `
        <div class="form-container">
            <mat-card class="form-card">
                <mat-card-header>
                    <mat-card-title>Support Mountain SOL</mat-card-title>
                </mat-card-header>

                <mat-card-content>
                    @if (errorMessage()) {
                        <div class="error-banner">
                            <mat-icon>error</mat-icon>
                            <span>{{ errorMessage() }}</span>
                        </div>
                    }

                    @if (!donationComplete()) {
                        <form class="form-content">
                            <div class="form-field">
                                <label class="field-label required"
                                    >Full Name</label
                                >
                                <input
                                    type="text"
                                    [ngModel]="donorName()"
                                    (ngModelChange)="donorName.set($event)"
                                    name="donorName"
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
                                    [ngModel]="donorEmail()"
                                    (ngModelChange)="donorEmail.set($event)"
                                    name="donorEmail"
                                    placeholder="your.email@example.com"
                                    class="form-input"
                                />
                            </div>

                            <div class="form-field">
                                <label class="field-label"
                                    >Street Address</label
                                >
                                <input
                                    type="text"
                                    [ngModel]="street()"
                                    (ngModelChange)="street.set($event)"
                                    name="street"
                                    placeholder="123 Main St"
                                    class="form-input"
                                />
                            </div>

                            <div class="address-row">
                                <div class="form-field city-field">
                                    <label class="field-label">City</label>
                                    <input
                                        type="text"
                                        [ngModel]="city()"
                                        (ngModelChange)="city.set($event)"
                                        name="city"
                                        placeholder="City"
                                        class="form-input"
                                    />
                                </div>

                                <div class="form-field state-field">
                                    <label class="field-label">State</label>
                                    <input
                                        type="text"
                                        [ngModel]="state()"
                                        (ngModelChange)="state.set($event)"
                                        name="state"
                                        placeholder="CA"
                                        maxlength="2"
                                        class="form-input uppercase"
                                    />
                                </div>

                                <div class="form-field zip-field">
                                    <label class="field-label">ZIP</label>
                                    <input
                                        type="text"
                                        [ngModel]="zip()"
                                        (ngModelChange)="zip.set($event)"
                                        name="zip"
                                        placeholder="12345"
                                        maxlength="5"
                                        class="form-input"
                                    />
                                </div>
                            </div>

                            <div class="form-field">
                                <label class="field-label"
                                    >How did you hear about Mountain SOL?</label
                                >
                                <input
                                    type="text"
                                    [ngModel]="referralSource()"
                                    (ngModelChange)="referralSource.set($event)"
                                    name="referralSource"
                                    placeholder="e.g., Friend, Social Media, Website"
                                    class="form-input"
                                />
                            </div>

                            <div class="form-field">
                                <label class="field-label required"
                                    >Donation Amount</label
                                >
                                <div class="amount-input-wrapper">
                                    <span class="currency-prefix">$</span>
                                    <input
                                        type="number"
                                        [ngModel]="donationAmount()"
                                        (ngModelChange)="donationAmount.set($event)"
                                        name="donationAmount"
                                        placeholder="25.00"
                                        min="1"
                                        class="form-input amount-input"
                                    />
                                </div>
                                <span class="field-hint"
                                    >Minimum donation: $1</span
                                >
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
                                [disabled]="!canDonate() || processing()"
                                (click)="processDonation()"
                            >
                                @if (processing()) {
                                    <mat-spinner diameter="20"></mat-spinner>
                                    <span>Processing...</span>
                                } @else {
                                    <mat-icon>favorite</mat-icon>
                                    <span>Donate</span>
                                }
                            </button>
                        </form>
                    } @else {
                        <div class="success-content">
                            <div class="success-icon">
                                <mat-icon>check_circle</mat-icon>
                            </div>
                            <h2>Thank You!</h2>
                            <p>
                                Your donation of
                                <strong
                                    >\${{
                                        donationAmount() | number: '1.2-2'
                                    }}</strong
                                >
                                has been processed successfully.
                            </p>
                            <p>
                                A confirmation email has been sent to
                                <strong>{{ donorEmail() }}</strong
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
                                Make Another Donation
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
                color: var(--sol-label-color);
            }

            .field-label.required::after {
                content: ' *';
                color: var(--sol-error);
            }

            .form-input {
                width: 100%;
                padding: 0.75rem;
                font-size: 1rem;
                border: 1px solid var(--sol-input-border);
                border-radius: 4px;
                background: white;
                box-sizing: border-box;
                transition:
                    border-color 0.2s,
                    box-shadow 0.2s;
            }

            .form-input:focus {
                outline: none;
                border-color: var(--sol-input-focus);
                box-shadow: 0 0 0 1px var(--sol-input-focus);
            }

            .form-input::placeholder {
                color: var(--sol-input-placeholder);
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
                color: var(--sol-hint-color);
                font-size: 1rem;
                pointer-events: none;
            }

            .amount-input {
                padding-left: 1.75rem !important;
            }

            .field-hint {
                font-size: 0.75rem;
                color: var(--sol-hint-color);
            }

            .error-banner {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem;
                background-color: var(--sol-error-light);
                color: var(--sol-error);
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
                background-color: var(--sol-warning-light);
                color: var(--sol-warning);
                border-radius: 4px;
            }

            .submit-button {
                height: 48px;
                font-size: 1rem;
                margin-top: 0.5rem;
                background-color: var(--sol-primary) !important;
                color: var(--sol-primary-on) !important;
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
            }

            .submit-button:disabled {
                background-color: var(--sol-disabled-bg-alpha) !important;
                color: var(--sol-disabled-text-alpha) !important;
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
                color: var(--sol-success);
            }

            .success-content h2 {
                margin: 0 0 1rem 0;
                color: var(--sol-on-surface-secondary);
            }

            .success-content p {
                margin: 0.5rem 0;
                color: var(--sol-on-surface-variant);
            }

            .transaction-id {
                margin-top: 1rem !important;
                padding: 0.5rem;
                background-color: var(--sol-surface-variant);
                border-radius: 4px;
                font-family: monospace;
            }

            .success-content button {
                margin-top: 1.5rem;
                background-color: var(--sol-primary) !important;
                color: var(--sol-primary-on) !important;
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
export class DonateFullComponent {
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly userService = inject(UserService);

    private readonly user = toSignal(this.userService.getUser());
    readonly isLoggedIn = computed(() => {
        const user = this.user();
        return user === undefined ? undefined : !!user;
    });

    donationAmount = signal<number>(25);
    donorName = signal<string>('');
    donorEmail = linkedSignal(() => this.user()?.email ?? '');
    street = signal<string>('');
    city = signal<string>('');
    state = signal<string>('');
    zip = signal<string>('');
    referralSource = signal<string>('');
    paymentMethodData = signal<
        | {
              nonce: string;
              deviceData: string;
              type: string;
          }
        | undefined
    >(undefined);
    processing = signal(false);

    donationResult = signal<
        | { status: 'idle' }
        | { status: 'processing' }
        | { status: 'success'; transactionId: string }
        | { status: 'error'; message: string }
    >({ status: 'idle' });

    readonly errorMessage = computed(() => {
        const result = this.donationResult();
        return result.status === 'error' ? result.message : null;
    });

    readonly donationComplete = computed(
        () => this.donationResult().status === 'success'
    );

    readonly transactionId = computed(() => {
        const result = this.donationResult();
        return result.status === 'success' ? result.transactionId : '';
    });

    canDonate = computed(() => {
        const hasRequiredFields =
            this.donorName().trim().length > 0 &&
            this.donorEmail().trim().length > 0 &&
            this.isValidEmail(this.donorEmail());

        return (
            hasRequiredFields &&
            this.donationAmount() >= 1 &&
            !!this.paymentMethodData() &&
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

    processDonation() {
        const paymentMethod = this.paymentMethodData();
        if (!this.canDonate() || !paymentMethod) return;

        this.processing.set(true);
        this.donationResult.set({ status: 'processing' });

        const fullAddress = [
            this.street(),
            this.city(),
            this.state(),
            this.zip(),
        ]
            .filter((s) => s.trim())
            .join(', ');

        this.functions
            .call<{
                success: boolean;
                transactionId: string;
                message: string;
            }>('donate', {
                amount: this.donationAmount(),
                paymentMethodNonce: paymentMethod.nonce,
                deviceData: paymentMethod.deviceData,
                paymentMethodType: paymentMethod.type,
                donorName: this.donorName(),
                donorEmail: this.donorEmail(),
                donorAddress: fullAddress || undefined,
                referralSource: this.referralSource() || undefined,
            })
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe((result) => {
                if (result.success) {
                    this.donationResult.set({
                        status: 'success',
                        transactionId: result.transactionId,
                    });
                } else {
                    this.donationResult.set({
                        status: 'error',
                        message:
                            result.message ||
                            'Unable to process donation. Please try again.',
                    });
                }
                this.processing.set(false);
            });
    }

    reset() {
        this.donationAmount.set(25);
        this.donorName.set('');
        this.street.set('');
        this.city.set('');
        this.state.set('');
        this.zip.set('');
        this.referralSource.set('');
        this.paymentMethodData.set(undefined);
        this.processing.set(false);
        this.donationResult.set({ status: 'idle' });

        const user = this.user();
        if (user?.email) {
            this.donorEmail.set(user.email);
        }
    }

    isIosButNotSafari() {
        return browserDetection.isIos() && !browserDetection.isIosSafari();
    }
}

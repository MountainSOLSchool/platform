import { Component, inject, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { PaymentCollectorComponent } from '@sol/payments/braintree-client';
import { UserService } from '@sol/auth/user';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { map, filter } from 'rxjs';
import { RequestedUtility } from '@sol/angular/request';
import * as browserDetection from '@braintree/browser-detection';

@Component({
    selector: 'sol-donate-full',
    standalone: true,
    imports: [
        CommonModule,
        AsyncPipe,
        FormsModule,
        PaymentCollectorComponent,
        ButtonModule,
        InputNumberModule,
        InputTextModule,
        CardModule,
        MessagesModule,
        ProgressSpinnerModule,
        DialogModule,
    ],
    template: `
        <div class="donation-container">
            <p-card header="Support Mountain SOL" class="donation-card">
                @if (messages().length > 0) {
                    <p-messages
                        [value]="messages()"
                        [closable]="false"
                        [enableService]="false"
                        class="mb-3"
                    >
                    </p-messages>
                }

                @if (!donationComplete()) {
                    <div class="donation-form">
                        <div class="form-field">
                            <label for="name" class="field-label required"
                                >Full Name</label
                            >
                            <input
                                pInputText
                                id="name"
                                [(ngModel)]="donorName"
                                placeholder="Enter your full name"
                                class="full-width"
                            />
                        </div>

                        <div class="form-field">
                            <label for="email" class="field-label required"
                                >Email Address</label
                            >
                            <input
                                pInputText
                                id="email"
                                type="email"
                                [(ngModel)]="donorEmail"
                                placeholder="your.email@example.com"
                                class="full-width"
                            />
                        </div>


                        <div class="form-field">
                            <label for="street" class="field-label"
                                >Street Address</label
                            >
                            <input
                                pInputText
                                id="street"
                                [(ngModel)]="street"
                                placeholder="123 Main St"
                                class="full-width"
                            />
                        </div>

                        <div class="address-row">
                            <div class="form-field">
                                <label for="city" class="field-label">City</label>
                                <input
                                    pInputText
                                    id="city"
                                    [(ngModel)]="city"
                                    placeholder="City"
                                    class="full-width"
                                />
                            </div>

                            <div class="form-field state-field">
                                <label for="state" class="field-label">State</label>
                                <input
                                    pInputText
                                    id="state"
                                    [(ngModel)]="state"
                                    placeholder="State"
                                    class="full-width"
                                />
                            </div>

                            <div class="form-field zip-field">
                                <label for="zip" class="field-label">ZIP</label>
                                <input
                                    pInputText
                                    id="zip"
                                    [(ngModel)]="zip"
                                    placeholder="ZIP"
                                    class="full-width"
                                />
                            </div>
                        </div>

                        <div class="form-field">
                            <label for="referral" class="field-label"
                                >How did you hear about Mountain SOL?</label
                            >
                            <input
                                pInputText
                                id="referral"
                                [(ngModel)]="referralSource"
                                placeholder="e.g., Friend, Social Media, Website"
                                class="full-width"
                            />
                        </div>

                        <div class="form-field">
                            <label for="amount" class="field-label required"
                                >Donation Amount</label
                            >
                            <div class="amount-input-container">
                                <p-inputNumber
                                    [(ngModel)]="donationAmount"
                                    inputId="amount"
                                    mode="currency"
                                    currency="USD"
                                    [showButtons]="false"
                                    [min]="1"
                                    placeholder="Enter amount"
                                    class="amount-input"
                                >
                                </p-inputNumber>
                            </div>
                            <small class="field-hint"
                                >Minimum donation: $1</small
                            >
                        </div>

                        @if (isIosButNotSafari()) {
                            <div class="form-field">
                                <strong
                                    >Please use Safari on iOS to use Venmo as an
                                    option.</strong
                                >
                            </div>
                        }

                        <div class="form-field">
                            <label class="field-label required">Payment Method</label>
                            <sol-payment-collector
                                [anonymous]="!isLoggedIn()"
                                [paymentMethods]="['card', 'venmo']"
                                (paymentMethod)="setPaymentMethod($event)"
                                class="payment-collector"
                            >
                            </sol-payment-collector>
                        </div>

                        <div class="form-field">
                            <button
                                pButton
                                label="Donate"
                                icon="pi pi-heart"
                                class="donate-button"
                                [loading]="processing()"
                                [disabled]="!canDonate()"
                                (click)="processDonation()"
                            ></button>
                        </div>
                    </div>
                }
            </p-card>
        </div>

        <p-dialog
            header="Submitting..."
            [visible]="processing()"
            [closable]="false"
            [modal]="true"
            [draggable]="false"
        >
            <p-progressSpinner></p-progressSpinner>
        </p-dialog>

        <p-dialog
            header="Successfully donated!"
            [visible]="donationComplete()"
            [closable]="false"
            [modal]="true"
            [draggable]="false"
        >
            <div style="width: 100%">
                <div style="text-align: center">
                    <i
                        style="color: green; font-size: 60px"
                        class="pi pi-check-circle"
                    ></i>
                </div>
            </div>
            <div style="margin-top: 1rem">
                Your donation of <b>\${{ donationAmount() }}</b> has been processed successfully.
            </div>
            <div style="margin-top: 1rem">
                A confirmation email has been sent to <b>{{ donorEmail() }}</b>.
            </div>
            <div style="margin-top: 1rem">
                <strong>Transaction ID:</strong> {{ transactionId() }}
            </div>
            <div style="margin-top: 1rem">
                <button
                    pButton
                    label="Make Another Donation"
                    (click)="reset()"
                ></button>
            </div>
        </p-dialog>
    `,
    styles: [
        `
            :host {
                display: block;
                min-height: 100vh;
            }

            .full-width {
                width: 100%;
            }

            p-inputnumber {
                width: 100%;
            }

            ::ng-deep .p-inputnumber {
                width: 100%;
            }

            .donation-container {
                padding: 1rem;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                min-height: 100vh;
            }

            .donation-card {
                width: 100%;
                max-width: 600px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .donation-form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }

            .form-field {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .field-label {
                font-weight: 600;
                color: var(--text-color);
                font-size: 0.9rem;
            }

            .field-label.required::after {
                content: ' *';
                color: #e74c3c;
            }

            .field-error {
                color: #e74c3c;
                font-size: 0.85rem;
                margin-top: 0.25rem;
            }

            .address-row {
                display: grid;
                grid-template-columns: 1fr 120px 100px;
                gap: 1rem;
            }

            .state-field,
            .zip-field {
                min-width: 0;
            }

            .amount-input-container {
                display: flex;
                align-items: center;
                position: relative;
            }

            .amount-input ::ng-deep .p-inputnumber-input {
                padding-left: 2rem;
                font-size: 1.1rem;
                height: 3rem;
            }

            .field-hint {
                color: var(--text-color-secondary);
                font-size: 0.8rem;
                margin-top: 0.25rem;
            }

            .payment-collector {
                width: 100%;
            }

            .donate-button {
                width: 100%;
                height: 3rem;
                font-size: 1.1rem;
                font-weight: 600;
                border-radius: 0.5rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                transition: all 0.3s ease;
            }

            .donate-button:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .donate-button:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            /* Mobile-specific styles */
            @media (max-width: 768px) {
                .donation-container {
                    padding: 0.5rem;
                    align-items: stretch;
                }

                .donation-card {
                    margin: 0;
                    border-radius: 0;
                    box-shadow: none;
                    border: none;
                }

                .address-row {
                    grid-template-columns: 1fr;
                }

                .state-field,
                .zip-field {
                    grid-column: 1;
                }

                .donate-button {
                    height: 3.5rem;
                    font-size: 1.2rem;
                }
            }

            /* Small mobile devices */
            @media (max-width: 480px) {
                .donation-container {
                    padding: 0;
                }

                .form-field {
                    gap: 0.5rem;
                }
            }

            /* Touch-friendly improvements */
            @media (pointer: coarse) {
                .donate-button {
                    min-height: 44px;
                }
            }
        `,
    ],
})
export class DonateFullComponent {
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly userService = inject(UserService);

    readonly user$ = this.userService.getUser();
    readonly userEmail$ = this.user$.pipe(
        map((user) => user?.email),
        filter((email): email is string => !!email)
    );

    donationAmount = signal<number>(25);
    donorName = signal<string>('');
    donorEmail = signal<string>('');
    street = signal<string>('');
    city = signal<string>('');
    state = signal<string>('');
    zip = signal<string>('');
    referralSource = signal<string>('');
    paymentMethodData = signal<any>(null);
    processing = signal(false);
    messages = signal<Message[]>([]);
    donationComplete = signal(false);
    transactionId = signal<string>('');
    isLoggedIn = signal<boolean>(false);

    constructor() {
        this.user$.subscribe((user) => {
            this.isLoggedIn.set(!!user);
            if (user?.email) {
                this.donorEmail.set(user.email);
            }
        });
    }

    canDonate = () => {
        const hasRequiredFields =
            this.donorName().trim().length > 0 &&
            this.donorEmail().trim().length > 0 &&
            this.isValidEmail(this.donorEmail());

        return (
            hasRequiredFields &&
            this.donationAmount() >= 1 &&
            this.paymentMethodData() &&
            !this.processing()
        );
    };

    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setPaymentMethod(method: any) {
        this.paymentMethodData.set(method);
    }

    processDonation() {
        if (!this.canDonate()) return;

        this.processing.set(true);
        this.messages.set([]);

        const fullAddress = [
            this.street(),
            this.city(),
            this.state(),
            this.zip()
        ].filter(s => s.trim()).join(', ');

        this.functions.call<{
            success: boolean;
            transactionId: string;
            message: string;
        }>('donate', {
            amount: this.donationAmount(),
            paymentMethodNonce: this.paymentMethodData().nonce,
            deviceData: this.paymentMethodData().deviceData,
            donorName: this.donorName(),
            donorEmail: this.donorEmail(),
            donorAddress: fullAddress || undefined,
            referralSource: this.referralSource() || undefined,
        }).subscribe({
            next: (result) => {
                if (!RequestedUtility.isLoaded(result)) {
                    this.messages.set([
                        {
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Unable to process donation. Please try again later.',
                        },
                    ]);
                    this.processing.set(false);
                    return;
                }

                if (result.success) {
                    this.donationComplete.set(true);
                    this.transactionId.set(result.transactionId);
                } else {
                    this.messages.set([
                        {
                            severity: 'error',
                            summary: 'Donation Failed',
                            detail:
                                result.message ||
                                'Unable to process donation. Please try again.',
                        },
                    ]);
                }
                this.processing.set(false);
            },
            error: (error) => {
                console.error('Donation error:', error);
                this.messages.set([
                    {
                        severity: 'error',
                        summary: 'Error',
                        detail: 'An unexpected error occurred. Please try again.',
                    },
                ]);
                this.processing.set(false);
            }
        });
    }

    reset() {
        this.donationAmount.set(25);
        this.donorName.set('');
        this.donorEmail.set('');
        this.street.set('');
        this.city.set('');
        this.state.set('');
        this.zip.set('');
        this.referralSource.set('');
        this.paymentMethodData.set(null);
        this.processing.set(false);
        this.messages.set([]);
        this.donationComplete.set(false);
        this.transactionId.set('');

        // Restore user email if logged in
        this.user$.subscribe((user) => {
            if (user?.email) {
                this.donorEmail.set(user.email);
            }
        }).unsubscribe();
    }

    isIosButNotSafari() {
        return browserDetection.isIos() && !browserDetection.isIosSafari();
    }
}

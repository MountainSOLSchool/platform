import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { PaymentCollectorComponent } from '@sol/payments/braintree-client';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { lastValueFrom } from 'rxjs';
import { RequestedUtility } from '@sol/angular/request';
import * as browserDetection from '@braintree/browser-detection';

@Component({
    selector: 'sol-donate',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        PaymentCollectorComponent,
        ButtonModule,
        InputNumberModule,
        CardModule,
        MessagesModule,
        ProgressSpinnerModule,
    ],
    template: `
        <div class="donation-container">
            <p-card header="Make a Donation" class="donation-card">
                @if (messages().length > 0) {
                    <p-messages
                        [value]="messages()"
                        [closable]="false"
                        [enableService]="false"
                        class="mb-3"
                    >
                    </p-messages>
                }

                @if (donationComplete()) {
                    <div class="success-content">
                        <i class="pi pi-check-circle success-icon"></i>
                        <h2 class="success-title">Thank You!</h2>
                        <p class="success-message">
                            Your donation of &#36;{{ donationAmount() }} has
                            been processed successfully.
                        </p>
                        <p class="transaction-id">
                            Transaction ID: {{ transactionId() }}
                        </p>
                        <button
                            pButton
                            label="Make Another Donation"
                            class="reset-button"
                            (click)="reset()"
                        ></button>
                    </div>
                } @else {
                    <div class="donation-form">
                        <div class="form-field">
                            <label for="amount" class="field-label"
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
                            <label class="field-label">Payment Method</label>
                            <sol-payment-collector
                                [anonymous]="true"
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
    `,
    styles: [
        `
            :host {
                display: block;
                min-height: 100vh;
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
                max-width: 500px;
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

            .amount-input-container {
                display: flex;
                align-items: center;
                position: relative;
            }

            .currency-symbol {
                position: absolute;
                left: 0.75rem;
                z-index: 1;
                color: var(--text-color-secondary);
                font-weight: 500;
            }

            .amount-input ::ng-deep .p-inputnumber-input {
                padding-left: 2rem;
                font-size: 1.1rem;
                height: 3rem;
            }

            .amount-input ::ng-deep .p-inputnumber-button-group {
                display: flex;
                flex-direction: column;
            }

            .amount-input ::ng-deep .p-inputnumber-button {
                height: 1.5rem;
                width: 2rem;
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

            .success-content {
                text-align: center;
                padding: 2rem 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
            }

            .success-icon {
                font-size: 4rem;
                color: #22c55e;
                margin-bottom: 0.5rem;
            }

            .success-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--text-color);
                margin: 0;
            }

            .success-message {
                font-size: 1.1rem;
                color: var(--text-color);
                margin: 0;
                line-height: 1.5;
            }

            .transaction-id {
                font-size: 0.9rem;
                color: var(--text-color-secondary);
                margin: 0;
                word-break: break-all;
            }

            .reset-button {
                width: 100%;
                height: 2.5rem;
                margin-top: 1rem;
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

                .donation-card ::ng-deep .p-card-header {
                    padding: 1rem 1rem 0.5rem;
                    font-size: 1.2rem;
                    text-align: center;
                }

                .donation-card ::ng-deep .p-card-body {
                    padding: 1rem;
                }

                .form-field {
                    gap: 0.75rem;
                }

                .field-label {
                    font-size: 1rem;
                }

                .amount-input ::ng-deep .p-inputnumber-input {
                    height: 3.5rem;
                    font-size: 1.2rem;
                }

                .donate-button {
                    height: 3.5rem;
                    font-size: 1.2rem;
                    margin-top: 0.5rem;
                }

                .success-content {
                    padding: 1.5rem 0.5rem;
                }

                .success-icon {
                    font-size: 3.5rem;
                }

                .success-title {
                    font-size: 1.3rem;
                }

                .success-message {
                    font-size: 1rem;
                }

                .transaction-id {
                    font-size: 0.8rem;
                    padding: 0 0.5rem;
                }
            }

            /* Small mobile devices */
            @media (max-width: 480px) {
                .donation-container {
                    padding: 0;
                }

                .donation-card ::ng-deep .p-card-header {
                    padding: 0.75rem 1rem 0.5rem;
                    font-size: 1.1rem;
                }

                .donation-card ::ng-deep .p-card-body {
                    padding: 0.75rem;
                }

                .form-field {
                    gap: 0.5rem;
                }

                .amount-input ::ng-deep .p-inputnumber-input {
                    height: 3rem;
                    font-size: 1.1rem;
                }

                .donate-button {
                    height: 3rem;
                    font-size: 1.1rem;
                }

                .success-content {
                    padding: 1rem 0.5rem;
                }

                .success-icon {
                    font-size: 3rem;
                }

                .success-title {
                    font-size: 1.2rem;
                }
            }

            /* Landscape orientation on mobile */
            @media (max-width: 768px) and (orientation: landscape) {
                .donation-container {
                    min-height: auto;
                    padding: 0.5rem;
                }

                .success-content {
                    padding: 1rem 0.5rem;
                }

                .success-icon {
                    font-size: 2.5rem;
                }
            }

            /* Touch-friendly improvements */
            @media (pointer: coarse) {
                .donate-button,
                .reset-button {
                    min-height: 44px; /* iOS/Android touch target minimum */
                }

                .amount-input ::ng-deep .p-inputnumber-button {
                    min-width: 44px;
                    min-height: 22px;
                }
            }
        `,
    ],
})
export class DonateComponent {
    private readonly functions = inject(FirebaseFunctionsService);

    donationAmount = signal<number>(5);
    paymentMethodData = signal<any>(null);
    processing = signal(false);
    messages = signal<Message[]>([]);
    donationComplete = signal(false);
    transactionId = signal<string>('');

    canDonate = () => {
        return (
            this.donationAmount() >= 5 &&
            this.paymentMethodData() &&
            !this.processing()
        );
    };

    setPaymentMethod(method: any) {
        this.paymentMethodData.set(method);
    }

    async processDonation() {
        if (!this.canDonate()) return;

        this.processing.set(true);
        this.messages.set([]);

        try {
            const result = await lastValueFrom(
                this.functions.call<{
                    success: boolean;
                    transactionId: string;
                    message: string;
                }>('donateVenmo', {
                    amount: this.donationAmount(),
                    paymentMethodNonce: this.paymentMethodData().nonce,
                    deviceData: this.paymentMethodData().deviceData,
                })
            );

            if (!RequestedUtility.isLoaded(result)) {
                this.messages.set([
                    {
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Unable to process donation. Please try again later.',
                    },
                ]);
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
        } catch (error) {
            console.error('Donation error:', error);
            this.messages.set([
                {
                    severity: 'error',
                    summary: 'Error',
                    detail: 'An unexpected error occurred. Please try again.',
                },
            ]);
        } finally {
            this.processing.set(false);
        }
    }

    reset() {
        this.donationAmount.set(5);
        this.paymentMethodData.set(null);
        this.processing.set(false);
        this.messages.set([]);
        this.donationComplete.set(false);
        this.transactionId.set('');
    }

    isIosButNotSafari() {
        return browserDetection.isIos() && !browserDetection.isIosSafari();
    }
}

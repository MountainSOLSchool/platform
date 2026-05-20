import { Component, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { PaymentCollectorComponent } from '@sol/payments/braintree-client';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { lastValueFrom } from 'rxjs';
import { RequestedUtility } from '@sol/angular/request';
import * as browserDetection from '@braintree/browser-detection';

interface DonateMessage {
    severity: 'error' | 'success' | 'info' | 'warn';
    summary?: string;
    detail: string;
}

@Component({
    selector: 'sol-donate',
    standalone: true,
    imports: [
        FormsModule,
        PaymentCollectorComponent,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
    ],
    template: `
        <div class="donation-container">
            <mat-card class="donation-card">
                <mat-card-header>
                    <mat-card-title>Make a Donation</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                    @for (m of messages(); track $index) {
                        <div class="alert alert-{{ m.severity }} mb-3">
                            @if (m.summary) {
                                <strong>{{ m.summary }}: </strong>
                            }
                            {{ m.detail }}
                        </div>
                    }

                    @if (donationComplete()) {
                        <div class="success-content">
                            <mat-icon class="success-icon"
                                >check_circle</mat-icon
                            >
                            <h2 class="success-title">Thank You!</h2>
                            <p class="success-message">
                                Your donation of &#36;{{ donationAmount() }} has
                                been processed successfully.
                            </p>
                            <p class="transaction-id">
                                Transaction ID: {{ transactionId() }}
                            </p>
                            <button
                                mat-raised-button
                                color="primary"
                                class="reset-button"
                                (click)="reset()"
                            >
                                Make Another Donation
                            </button>
                        </div>
                    } @else {
                        <div class="donation-form">
                            <div class="form-field">
                                <mat-form-field appearance="outline">
                                    <mat-label>Donation Amount</mat-label>
                                    <span matTextPrefix>$&nbsp;</span>
                                    <input
                                        matInput
                                        type="number"
                                        id="amount"
                                        [(ngModel)]="donationAmount"
                                        [min]="1"
                                        placeholder="Enter amount"
                                    />
                                    <mat-hint>Minimum donation: $1</mat-hint>
                                </mat-form-field>
                            </div>

                            @if (isIosButNotSafari()) {
                                <div class="form-field">
                                    <strong
                                        >Please use Safari on iOS to use Venmo
                                        as an option.</strong
                                    >
                                </div>
                            }

                            <div class="form-field">
                                <label class="field-label"
                                    >Payment Method</label
                                >
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
                                    mat-raised-button
                                    color="primary"
                                    class="donate-button"
                                    [disabled]="!canDonate()"
                                    (click)="processDonation()"
                                >
                                    @if (processing()) {
                                        <mat-icon>hourglass_empty</mat-icon>
                                    } @else {
                                        <mat-icon>favorite</mat-icon>
                                    }
                                    Donate
                                </button>
                            </div>
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

            .form-field mat-form-field {
                width: 100%;
            }

            .field-label {
                font-weight: 600;
                color: var(--text-color);
                font-size: 0.9rem;
            }

            .payment-collector {
                width: 100%;
            }

            .alert {
                padding: 0.75rem 1rem;
                border-radius: 4px;
                border-left: 4px solid;
            }
            .alert-error {
                background: #fee2e2;
                color: #991b1b;
                border-color: #ef4444;
            }
            .alert-warn {
                background: #fef3c7;
                color: #92400e;
                border-color: #f59e0b;
            }
            .alert-info {
                background: #dbeafe;
                color: #1e40af;
                border-color: #3b82f6;
            }
            .alert-success {
                background: #d1fae5;
                color: #065f46;
                border-color: #10b981;
            }

            .donate-button {
                width: 100%;
                height: 3rem;
                font-size: 1.1rem;
                font-weight: 600;
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
                width: 4rem;
                height: 4rem;
                color: var(--sol-success, #10b981);
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

            @media (max-width: 768px) {
                .donation-container {
                    padding: 0.5rem;
                    align-items: stretch;
                }
                .donation-card {
                    margin: 0;
                }
            }
        `,
    ],
})
export class DonateComponent {
    private readonly functions = inject(FirebaseFunctionsService);

    donationAmount = signal<number>(5);
    paymentMethodData = signal<{
        nonce: string;
        deviceData: string;
    } | null>(null);
    processing = signal(false);
    messages = signal<DonateMessage[]>([]);
    donationComplete = signal(false);
    transactionId = signal<string>('');

    canDonate = () => {
        return (
            this.donationAmount() >= 5 &&
            this.paymentMethodData() &&
            !this.processing()
        );
    };

    setPaymentMethod(method?: { nonce: string; deviceData: string }) {
        this.paymentMethodData.set(
            method
                ? {
                      nonce: method.nonce,
                      deviceData: method.deviceData,
                  }
                : null
        );
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
                    paymentMethodNonce: this.paymentMethodData()!.nonce,
                    deviceData: this.paymentMethodData()!.deviceData,
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

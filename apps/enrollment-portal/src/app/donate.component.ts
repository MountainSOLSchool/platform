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
        <div class="flex justify-content-center p-4">
            <p-card header="Make a Donation" [style]="{ width: '500px' }">
                @if (messages().length > 0) {
                    <p-messages
                        [value]="messages()"
                        [closable]="false"
                        [enableService]="false"
                    >
                    </p-messages>
                }

                @if (donationComplete()) {
                    <div class="text-center p-4">
                        <i
                            class="pi pi-check-circle text-6xl text-green-500 mb-3"
                        ></i>
                        <h2 class="text-2xl mb-2">Thank You!</h2>
                        <p class="text-lg">
                            Your donation of &#36;{{ donationAmount() }} has
                            been processed successfully.
                        </p>
                        <p class="text-sm text-500 mt-2">
                            Transaction ID: {{ transactionId() }}
                        </p>
                        <button
                            pButton
                            label="Make Another Donation"
                            class="mt-4"
                            (click)="reset()"
                        ></button>
                    </div>
                } @else {
                    <div class="formgrid grid">
                        <div class="field col-12">
                            <label for="amount" class="block mb-2"
                                >Donation Amount</label
                            >
                            <div class="p-inputgroup">
                                <span class="p-inputgroup-addon">$</span>
                                <p-inputNumber
                                    [(ngModel)]="donationAmount"
                                    inputId="amount"
                                    mode="currency"
                                    currency="USD"
                                    [showButtons]="true"
                                    [min]="5"
                                    [step]="10"
                                    placeholder="Enter amount"
                                >
                                </p-inputNumber>
                            </div>
                            <small class="text-500">Minimum donation: $5</small>
                        </div>

                        <div class="field col-12">
                            <label class="block mb-2">Payment Method</label>
                            <sol-payment-collector
                                [anonymous]="true"
                                [paymentMethods]="['venmo']"
                                (paymentMethod)="setPaymentMethod($event)"
                            >
                            </sol-payment-collector>
                        </div>

                        <div class="field col-12">
                            <button
                                pButton
                                label="Donate with Venmo"
                                icon="pi pi-heart"
                                class="w-full"
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
                background-color: var(--surface-ground);
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
        this.donationAmount.set(25);
        this.paymentMethodData.set(null);
        this.processing.set(false);
        this.messages.set([]);
        this.donationComplete.set(false);
        this.transactionId.set('');
    }
}

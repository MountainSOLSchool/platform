import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { PaymentCollectorComponent } from '@sol/payments/braintree-client';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { CurrencyPipe } from '@angular/common';

interface MedicClassOption {
    id: string;
    name: string;
    description: string;
    cost: number;
    enrolledCount: number;
    maxStudents: number;
}

type SignUpState =
    | { status: 'loading' }
    | { status: 'selecting' ; classes: MedicClassOption[] }
    | { status: 'form'; selectedClass: MedicClassOption }
    | { status: 'submitting'; selectedClass: MedicClassOption }
    | { status: 'confirmed'; transactionId: string; className: string }
    | { status: 'error'; message: string; selectedClass?: MedicClassOption };

@Component({
    selector: 'sol-medic-sign-up',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatIconModule,
        PaymentCollectorComponent,
        CurrencyPipe,
    ],
    styles: [`
        :host { display: block; max-width: 800px; margin: 0 auto; }
        .class-list { display: flex; flex-direction: column; gap: 1rem; }
        .class-card { cursor: pointer; transition: box-shadow 0.2s; }
        .class-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .class-card.selected { border: 2px solid var(--sol-primary, #006633); }
        .class-card.full { opacity: 0.6; cursor: not-allowed; }
        .class-info { display: flex; justify-content: space-between; align-items: center; }
        .class-cost { font-size: 1.25rem; font-weight: 600; color: var(--sol-primary, #006633); }
        .spots-left { font-size: 0.875rem; color: var(--sol-on-surface-variant, #666); }
        .form-fields { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .form-fields mat-form-field { width: 100%; }
        .actions { display: flex; gap: 1rem; margin-top: 1rem; }
        .confirmation { text-align: center; padding: 2rem; }
        .confirmation mat-icon { font-size: 64px; width: 64px; height: 64px; color: var(--sol-primary, #006633); }
        .spinner-container { display: flex; justify-content: center; padding: 3rem; }
        .selected-class-summary { background: var(--sol-surface-variant, #f5f5f5); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .empty-state { text-align: center; padding: 3rem 1rem; }
        .empty-state mat-icon { font-size: 64px; width: 64px; height: 64px; color: var(--sol-on-surface-variant, #666); margin-bottom: 1rem; }
        .empty-state p { color: var(--sol-on-surface-variant, #666); }
        h2 { margin-top: 0; }
    `],
    template: `
        <h2>Mountain SOL Medical - Class Registration</h2>

        @switch (state().status) {
            @case ('loading') {
                <div class="spinner-container">
                    <mat-spinner diameter="48"></mat-spinner>
                </div>
            }

            @case ('selecting') {
                <p>Select a class to register for:</p>
                <div class="class-list">
                    @for (cls of selectingClasses(); track cls.id) {
                        <mat-card
                            [class.class-card]="true"
                            [class.full]="cls.enrolledCount >= cls.maxStudents"
                            (click)="cls.enrolledCount < cls.maxStudents && selectClass(cls)"
                            appearance="outlined"
                        >
                            <mat-card-header>
                                <mat-card-title>{{ cls.name }}</mat-card-title>
                            </mat-card-header>
                            <mat-card-content>
                                <p>{{ cls.description }}</p>
                                <div class="class-info">
                                    <span class="class-cost">{{ cls.cost | currency }}</span>
                                    <span class="spots-left">
                                        @if (cls.enrolledCount >= cls.maxStudents) {
                                            Class Full
                                        } @else {
                                            {{ cls.maxStudents - cls.enrolledCount }} spots remaining
                                        }
                                    </span>
                                </div>
                            </mat-card-content>
                        </mat-card>
                    } @empty {
                        <div class="empty-state">
                            <mat-icon>event_busy</mat-icon>
                            <h3>No Classes Available</h3>
                            <p>There are no classes open for registration at this time. Please check back soon!</p>
                        </div>
                    }
                </div>
            }

            @case ('form') {
                @if (formClass(); as cls) {
                    <div class="selected-class-summary">
                        <strong>{{ cls.name }}</strong> - {{ cls.cost | currency }}
                    </div>
                }
                <div class="form-fields">
                    <mat-form-field>
                        <mat-label>Full Name</mat-label>
                        <input matInput [formControl]="nameControl" />
                        @if (nameControl.hasError('required')) {
                            <mat-error>Name is required</mat-error>
                        }
                    </mat-form-field>
                    <mat-form-field>
                        <mat-label>Email</mat-label>
                        <input matInput type="email" [formControl]="emailControl" />
                        @if (emailControl.hasError('required')) {
                            <mat-error>Email is required</mat-error>
                        }
                        @if (emailControl.hasError('email')) {
                            <mat-error>Please enter a valid email</mat-error>
                        }
                    </mat-form-field>
                </div>

                <h3>Payment</h3>
                <sol-payment-collector
                    [anonymous]="true"
                    [paymentMethods]="['card', 'venmo']"
                    (paymentMethod)="setPaymentMethod($event)"
                ></sol-payment-collector>

                <div class="actions">
                    <button mat-stroked-button (click)="backToSelection()">Back</button>
                    <button
                        mat-flat-button
                        color="primary"
                        [disabled]="!canSubmit()"
                        (click)="submit()"
                    >
                        Register & Pay
                    </button>
                </div>
            }

            @case ('submitting') {
                <div class="spinner-container">
                    <mat-spinner diameter="48"></mat-spinner>
                </div>
                <p style="text-align: center;">Processing your registration...</p>
            }

            @case ('confirmed') {
                <div class="confirmation">
                    <mat-icon>check_circle</mat-icon>
                    <h2>Registration Confirmed!</h2>
                    <p>You have been registered for <strong>{{ confirmedClassName() }}</strong>.</p>
                    <p>Transaction ID: {{ confirmedTransactionId() }}</p>
                    <p>A confirmation email has been sent to your email address.</p>
                    <button mat-flat-button color="primary" (click)="reset()">Register for Another Class</button>
                </div>
            }

            @case ('error') {
                <mat-card appearance="outlined">
                    <mat-card-content>
                        <p style="color: var(--sol-error, red);">{{ errorMessage() }}</p>
                        <button mat-flat-button color="primary" (click)="retryFromError()">Try Again</button>
                    </mat-card-content>
                </mat-card>
            }
        }
    `,
})
export class MedicSignUpComponent {
    readonly #api = inject(MountainSolApiService);

    readonly state = signal<SignUpState>({ status: 'loading' });

    readonly selectingClasses = computed(() => {
        const s = this.state();
        return s.status === 'selecting' ? s.classes : [];
    });

    readonly formClass = computed(() => {
        const s = this.state();
        return s.status === 'form' || s.status === 'submitting'
            ? s.selectedClass
            : undefined;
    });

    readonly confirmedClassName = computed(() => {
        const s = this.state();
        return s.status === 'confirmed' ? s.className : '';
    });

    readonly confirmedTransactionId = computed(() => {
        const s = this.state();
        return s.status === 'confirmed' ? s.transactionId : '';
    });

    readonly errorMessage = computed(() => {
        const s = this.state();
        return s.status === 'error' ? s.message : '';
    });

    readonly nameControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });
    readonly emailControl = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });

    readonly #paymentMethod = signal<{ nonce: string; deviceData: string; type: string } | null>(null);

    readonly #nameValid = toSignal(
        this.nameControl.statusChanges.pipe(map(() => this.nameControl.valid)),
        { initialValue: this.nameControl.valid }
    );
    readonly #emailValid = toSignal(
        this.emailControl.statusChanges.pipe(map(() => this.emailControl.valid)),
        { initialValue: this.emailControl.valid }
    );

    readonly canSubmit = computed(() => {
        return (
            this.state().status === 'form' &&
            this.#nameValid() &&
            this.#emailValid() &&
            this.#paymentMethod() !== null
        );
    });

    constructor() {
        this.loadClasses();
    }

    loadClasses(): void {
        this.state.set({ status: 'loading' });
        this.#api.getMedicClasses(undefined as never).subscribe({
            next: (res) => {
                this.state.set({ status: 'selecting', classes: res.classes });
            },
            error: () => {
                this.state.set({
                    status: 'error',
                    message: 'Unable to load classes. Please try again.',
                });
            },
        });
    }

    selectClass(cls: MedicClassOption): void {
        this.state.set({ status: 'form', selectedClass: cls });
    }

    backToSelection(): void {
        this.loadClasses();
    }

    setPaymentMethod(
        event: { nonce: string; deviceData: string; type: string } | undefined
    ): void {
        this.#paymentMethod.set(
            event
                ? { nonce: event.nonce, deviceData: event.deviceData, type: event.type }
                : null
        );
    }

    submit(): void {
        const s = this.state();
        const pm = this.#paymentMethod();
        if (s.status !== 'form' || !pm) return;

        this.state.set({ status: 'submitting', selectedClass: s.selectedClass });

        this.#api.enrollMedic({
            classId: s.selectedClass.id,
            studentName: this.nameControl.value,
            studentEmail: this.emailControl.value,
            paymentMethodNonce: pm.nonce,
            deviceData: pm.deviceData,
            paymentMethodType: pm.type,
        }).subscribe({
            next: (res) => {
                if (res.success) {
                    this.state.set({
                        status: 'confirmed',
                        transactionId: res.transactionId ?? '',
                        className: s.selectedClass.name,
                    });
                } else {
                    this.state.set({
                        status: 'error',
                        message: res.error ?? 'Registration failed. Please try again.',
                        selectedClass: s.selectedClass,
                    });
                }
            },
            error: () => {
                this.state.set({
                    status: 'error',
                    message: 'An unexpected error occurred. Please try again.',
                    selectedClass: s.selectedClass,
                });
            },
        });
    }

    retryFromError(): void {
        const s = this.state();
        if (s.status === 'error' && s.selectedClass) {
            this.state.set({ status: 'form', selectedClass: s.selectedClass });
        } else {
            this.loadClasses();
        }
    }

    reset(): void {
        this.nameControl.reset();
        this.emailControl.reset();
        this.#paymentMethod.set(null);
        this.loadClasses();
    }
}

import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { map, pipe, filter, tap, switchMap, catchError, of } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import type { DiscountType } from '@sol/ts/firebase/api-types';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

type FormState =
    | { status: 'idle' }
    | { status: 'submitting' }
    | { status: 'success' }
    | { status: 'error'; message: string };

const DISCOUNT_TYPES: { value: DiscountType; label: string }[] = [
    { value: 'amount', label: 'Fixed Amount Off' },
    { value: 'percent', label: 'Percentage Off' },
    { value: 'amount-before-date', label: 'Fixed Amount Off (with Expiry)' },
    { value: 'classes-percent', label: 'Percentage Off Specific Classes' },
    { value: 'free-classes', label: 'Free Classes' },
    { value: 'buy-x-class-type-percent', label: 'Buy X Class Type, Get % Off' },
];

@Component({
    selector: 'sol-discount-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    template: `
        <div class="page-container">
            <div class="page-header">
                <h1>{{ isEdit() ? 'Edit' : 'Create' }} Discount</h1>
                <button mat-stroked-button (click)="navigateBack()">
                    <mat-icon>arrow_back</mat-icon>
                    Back to Discounts
                </button>
            </div>

            @if (isEdit() && loadingExisting()) {
                <div class="loading-container">
                    <mat-spinner diameter="48"></mat-spinner>
                    <p>Loading discount...</p>
                </div>
            } @else {
                <mat-card>
                    <mat-card-content>
                        <div class="form-grid">
                            <mat-form-field appearance="outline">
                                <mat-label>Discount Code</mat-label>
                                <input
                                    matInput
                                    [(ngModel)]="code"
                                    placeholder="e.g. EARLYBIRD23"
                                    style="text-transform: uppercase"
                                />
                            </mat-form-field>

                            <mat-form-field appearance="outline">
                                <mat-label>Type</mat-label>
                                <mat-select [(ngModel)]="type">
                                    @for (t of discountTypes; track t.value) {
                                        <mat-option [value]="t.value">{{
                                            t.label
                                        }}</mat-option>
                                    }
                                </mat-select>
                            </mat-form-field>

                            <mat-slide-toggle [(ngModel)]="active">
                                Active
                            </mat-slide-toggle>
                        </div>

                        <div class="type-fields">
                            @if (showAmount()) {
                                <mat-form-field appearance="outline">
                                    <mat-label>Amount ($)</mat-label>
                                    <input
                                        matInput
                                        type="number"
                                        [(ngModel)]="amount"
                                    />
                                </mat-form-field>
                            }

                            @if (showPercent()) {
                                <mat-form-field appearance="outline">
                                    <mat-label>Percent (%)</mat-label>
                                    <input
                                        matInput
                                        type="number"
                                        [(ngModel)]="percent"
                                        min="0"
                                        max="100"
                                    />
                                </mat-form-field>
                            }

                            @if (showDate()) {
                                <mat-form-field appearance="outline">
                                    <mat-label>Expiry Date</mat-label>
                                    <input
                                        matInput
                                        [matDatepicker]="picker"
                                        [(ngModel)]="expiryDate"
                                    />
                                    <mat-datepicker-toggle
                                        matIconSuffix
                                        [for]="picker"
                                    ></mat-datepicker-toggle>
                                    <mat-datepicker #picker></mat-datepicker>
                                </mat-form-field>
                            }

                            @if (showClassOrGroupIds()) {
                                <mat-form-field appearance="outline">
                                    <mat-label
                                        >Class or Group IDs (comma
                                        separated)</mat-label
                                    >
                                    <input
                                        matInput
                                        [(ngModel)]="classOrGroupIdsText"
                                        placeholder="id1, id2, id3"
                                    />
                                </mat-form-field>
                            }

                            @if (showClassTypes()) {
                                <mat-form-field appearance="outline">
                                    <mat-label
                                        >Class Types (comma
                                        separated)</mat-label
                                    >
                                    <input
                                        matInput
                                        [(ngModel)]="classTypesText"
                                        placeholder="Mountain, Water"
                                    />
                                </mat-form-field>
                            }

                            @if (showMinimum()) {
                                <mat-form-field appearance="outline">
                                    <mat-label>Minimum Classes</mat-label>
                                    <input
                                        matInput
                                        type="number"
                                        [(ngModel)]="minimum"
                                        min="1"
                                    />
                                </mat-form-field>
                            }
                        </div>

                        @if (formState().status === 'error') {
                            <p class="error-text">
                                {{ errorMessage() }}
                            </p>
                        }

                        @if (formState().status === 'success') {
                            <p class="success-text">
                                Discount
                                {{ isEdit() ? 'updated' : 'created' }}
                                successfully!
                            </p>
                        }

                        <div class="form-actions">
                            <button
                                mat-raised-button
                                color="primary"
                                (click)="save()"
                                [disabled]="
                                    formState().status === 'submitting'
                                "
                            >
                                @if (formState().status === 'submitting') {
                                    <mat-spinner
                                        diameter="20"
                                    ></mat-spinner>
                                } @else {
                                    {{ isEdit() ? 'Update' : 'Create' }}
                                    Discount
                                }
                            </button>
                        </div>
                    </mat-card-content>
                </mat-card>
            }
        </div>
    `,
    styles: [
        `
            .page-container {
                max-width: 700px;
                margin: 2rem auto;
                padding: 0 1rem;
            }
            .page-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            .page-header h1 {
                margin: 0;
            }
            .loading-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 3rem;
                color: var(--sol-on-surface-variant, #666);
            }
            .form-grid {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            .type-fields {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .form-actions {
                display: flex;
                justify-content: flex-end;
                margin-top: 1.5rem;
            }
            .error-text {
                color: var(--sol-error, #b00020);
            }
            .success-text {
                color: #2e7d32;
            }
        `,
    ],
})
export class DiscountFormComponent {
    readonly #api = inject(MountainSolApiService);
    readonly #router = inject(Router);
    readonly #route = inject(ActivatedRoute);

    readonly discountTypes = DISCOUNT_TYPES;

    readonly #editId = toSignal(
        this.#route.paramMap.pipe(map((p) => p.get('id') ?? ''))
    );

    readonly isEdit = computed(() => !!this.#editId());

    // Form fields
    code = signal('');
    type = signal<DiscountType>('amount');
    active = signal(false);
    amount = signal<number | undefined>(undefined);
    percent = signal<number | undefined>(undefined);
    expiryDate = signal<Date | null>(null);
    classOrGroupIdsText = signal('');
    classTypesText = signal('');
    minimum = signal<number | undefined>(undefined);

    formState = signal<FormState>({ status: 'idle' });

    readonly errorMessage = computed(() => {
        const state = this.formState();
        return state.status === 'error' ? state.message : '';
    });

    // Conditional field visibility
    readonly showAmount = computed(() =>
        ['amount', 'amount-before-date'].includes(this.type())
    );
    readonly showPercent = computed(() =>
        ['percent', 'classes-percent', 'buy-x-class-type-percent'].includes(
            this.type()
        )
    );
    readonly showDate = computed(() => this.type() === 'amount-before-date');
    readonly showClassOrGroupIds = computed(() =>
        ['classes-percent', 'free-classes'].includes(this.type())
    );
    readonly showClassTypes = computed(
        () => this.type() === 'buy-x-class-type-percent'
    );
    readonly showMinimum = computed(
        () => this.type() === 'buy-x-class-type-percent'
    );

    // Load existing discount for edit
    readonly existingResource = rxResource({
        params: () => this.#editId(),
        stream: ({ params: id }) => {
            if (!id) return of(null);
            return this.#api.getDiscount({ id });
        },
    });

    readonly loadingExisting = computed(
        () => this.existingResource.status() === 'loading'
    );

    constructor() {
        // Populate form when existing discount loads
        effect(() => {
            const result = this.existingResource.value();
            if (result?.discount) {
                const d = result.discount;
                this.code.set(d.code);
                this.type.set(d.type);
                this.active.set(d.active);
                this.amount.set(d.amount);
                this.percent.set(d.percent);
                this.expiryDate.set(d.date ? new Date(d.date) : null);
                this.classOrGroupIdsText.set(
                    d.classOrGroupIds?.join(', ') ?? ''
                );
                this.classTypesText.set(d.classTypes?.join(', ') ?? '');
                this.minimum.set(d.minimum);
            }
        });
    }

    readonly #submitForm = rxMethod<void>(
        pipe(
            filter(() => this.formState().status !== 'submitting'),
            tap(() => this.formState.set({ status: 'submitting' })),
            switchMap(() => {
                const base = {
                    code: this.code().toUpperCase(),
                    type: this.type(),
                    active: this.active(),
                    amount: this.showAmount() ? this.amount() : undefined,
                    percent: this.showPercent() ? this.percent() : undefined,
                    date: this.showDate() && this.expiryDate()
                        ? this.expiryDate()!.toISOString()
                        : undefined,
                    classOrGroupIds: this.showClassOrGroupIds()
                        ? this.classOrGroupIdsText()
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean)
                        : undefined,
                    classTypes: this.showClassTypes()
                        ? this.classTypesText()
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean)
                        : undefined,
                    minimum: this.showMinimum() ? this.minimum() : undefined,
                };

                const editId = this.#editId();
                if (editId) {
                    return this.#api
                        .updateDiscount({ id: editId, ...base })
                        .pipe(
                            map(() => ({ success: true })),
                            catchError((err) =>
                                of({
                                    success: false,
                                    error:
                                        err?.message ?? 'Failed to update',
                                })
                            )
                        );
                } else {
                    return this.#api.createDiscount(base).pipe(
                        map(() => ({ success: true })),
                        catchError((err) =>
                            of({
                                success: false,
                                error: err?.message ?? 'Failed to create',
                            })
                        )
                    );
                }
            }),
            tap((result) => {
                if (result.success) {
                    this.formState.set({ status: 'success' });
                    setTimeout(() => this.navigateBack(), 1000);
                } else {
                    this.formState.set({
                        status: 'error',
                        message:
                            (result as { error: string }).error ??
                            'An error occurred',
                    });
                }
            })
        )
    );

    save() {
        if (!this.code()) {
            this.formState.set({
                status: 'error',
                message: 'Discount code is required',
            });
            return;
        }
        this.#submitForm(undefined as never);
    }

    navigateBack() {
        this.#router.navigate(['/admin/discounts']);
    }
}

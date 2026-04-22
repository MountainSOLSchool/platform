import { Component, inject, signal, computed, effect } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { firstValueFrom } from 'rxjs';

export interface ConfirmRevokeDialogData {
    enrollmentId: string;
    studentName: string;
    finalCost: number;
    classes: Array<{ id: string; semesterId: string }>;
}

export interface ConfirmRevokeDialogResult {
    classIdsToRevoke: string[];
    refundAmount: number;
}

interface ClassSelection {
    id: string;
    semesterId: string;
    name: string;
    selected: boolean;
}

@Component({
    selector: 'sol-confirm-revoke-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        CurrencyPipe,
        FormsModule,
    ],
    template: `
        <div class="dialog-content">
            <h2>Revoke Enrollment</h2>
            <p>
                Select which classes to revoke for
                <strong>{{ data.studentName }}</strong
                >:
            </p>

            @if (loading()) {
                <div class="loading">
                    <mat-spinner diameter="24"></mat-spinner>
                    <span>Loading classes...</span>
                </div>
            } @else {
                <div class="class-list">
                    @for (cls of classSelections(); track cls.id) {
                        <mat-checkbox
                            [checked]="cls.selected"
                            (change)="toggleClass(cls.id)"
                        >
                            {{ cls.name }}
                        </mat-checkbox>
                    }
                </div>

                @if (selectedCount() > 0) {
                    <div class="refund-section">
                        @if (previewLoading()) {
                            <div class="loading">
                                <mat-spinner diameter="20"></mat-spinner>
                                <span>Calculating refund...</span>
                            </div>
                        } @else {
                            <div class="refund-info">
                                <span>Refund amount:</span>
                                <div class="refund-input-row">
                                    <span class="currency-prefix">$</span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        [ngModel]="refundAmountInput()"
                                        (ngModelChange)="refundAmountInput.set($event)"
                                        class="refund-input"
                                    />
                                </div>
                            </div>
                            @if (isFullRevocation()) {
                                <p class="revoke-note">
                                    All classes selected — enrollment will be
                                    fully revoked.
                                </p>
                            } @else {
                                <p class="revoke-note">
                                    Student will remain enrolled in
                                    {{ remainingCount() }}
                                    class{{ remainingCount() === 1 ? '' : 'es' }}.
                                </p>
                            }
                        }
                    </div>
                }
            }

            <div class="dialog-actions">
                <button mat-stroked-button (click)="dialogRef.close(undefined)">
                    Cancel
                </button>
                <button
                    mat-raised-button
                    color="warn"
                    [disabled]="selectedCount() === 0 || loading() || previewLoading()"
                    (click)="confirm()"
                >
                    Revoke & Refund
                </button>
            </div>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
                background: white;
                border-radius: 8px;
                box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
                    0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12);
            }
            .dialog-content {
                padding: 1.5rem;
            }
            h2 {
                margin: 0 0 1rem;
            }
            .class-list {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin: 1rem 0;
            }
            .loading {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 0;
            }
            .refund-section {
                margin: 1rem 0;
                padding: 0.75rem;
                background: #f5f5f5;
                border-radius: 4px;
            }
            .refund-info {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .refund-input-row {
                display: flex;
                align-items: center;
            }
            .currency-prefix {
                font-weight: 500;
                margin-right: 2px;
            }
            .refund-input {
                width: 100px;
                padding: 4px 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 14px;
            }
            .revoke-note {
                margin: 0.5rem 0 0;
                font-size: 13px;
                color: #666;
            }
            .dialog-actions {
                display: flex;
                justify-content: flex-end;
                gap: 0.5rem;
                margin-top: 1.5rem;
            }
        `,
    ],
})
export class ConfirmRevokeDialogComponent {
    readonly data = inject<ConfirmRevokeDialogData>(DIALOG_DATA);
    readonly dialogRef = inject(DialogRef<ConfirmRevokeDialogResult | undefined>);
    readonly #api = inject(MountainSolApiService);

    readonly loading = signal(true);
    readonly previewLoading = signal(false);
    readonly classSelections = signal<ClassSelection[]>([]);
    readonly refundAmountInput = signal<number>(0);

    readonly selectedCount = computed(
        () => this.classSelections().filter((c) => c.selected).length
    );

    readonly remainingCount = computed(
        () => this.classSelections().length - this.selectedCount()
    );

    readonly isFullRevocation = computed(
        () => this.selectedCount() === this.classSelections().length
    );

    constructor() {
        this.#loadClassNames();
    }

    async #loadClassNames() {
        try {
            const preview = await firstValueFrom(
                this.#api
                    .previewPartialRevoke({
                        enrollmentId: this.data.enrollmentId,
                        classIdsToRevoke: this.data.classes.map((c) => c.id),
                    })
                    .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            );

            this.classSelections.set(
                preview.classNames.map((c) => ({
                    ...c,
                    selected: false,
                }))
            );
            this.refundAmountInput.set(0);
        } finally {
            this.loading.set(false);
        }
    }

    async toggleClass(classId: string) {
        this.classSelections.update((classes) =>
            classes.map((c) =>
                c.id === classId ? { ...c, selected: !c.selected } : c
            )
        );

        const selected = this.classSelections().filter((c) => c.selected);
        if (selected.length === 0) {
            this.refundAmountInput.set(0);
            return;
        }

        this.previewLoading.set(true);
        try {
            const preview = await firstValueFrom(
                this.#api
                    .previewPartialRevoke({
                        enrollmentId: this.data.enrollmentId,
                        classIdsToRevoke: selected.map((c) => c.id),
                    })
                    .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            );
            this.refundAmountInput.set(
                Math.round(preview.suggestedRefund * 100) / 100
            );
        } finally {
            this.previewLoading.set(false);
        }
    }

    confirm() {
        const selected = this.classSelections().filter((c) => c.selected);
        this.dialogRef.close({
            classIdsToRevoke: selected.map((c) => c.id),
            refundAmount: this.refundAmountInput(),
        });
    }
}

import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { pipe, filter, tap, switchMap, catchError, EMPTY } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { MountainSolApiService } from '@sol/angular/firebase/api';

interface AvailableClass {
    id: string;
    name: string;
    cost: number;
    selected: boolean;
}

export interface ClassGroupFormDialogData {
    semesterId: string;
    classes: Array<{ id: string; name: string; cost: number }>;
    existingGroup?: {
        id: string;
        name: string;
        cost: number;
        classIds: string[];
    };
}

export type ClassGroupFormDialogResult = 'saved';

@Component({
    selector: 'sol-class-group-form-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatIconModule,
    ],
    template: `
        <div class="dialog-container">
            <h2>{{ isEditing ? 'Edit' : 'Create' }} Class Group</h2>

            <mat-form-field appearance="outline" class="full-width">
                <mat-label>Group Name</mat-label>
                <input
                    matInput
                    [(ngModel)]="groupName"
                    placeholder="e.g. Morning + Afternoon Full Day"
                    [disabled]="saving()"
                />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
                <mat-label>Group Cost</mat-label>
                <span matPrefix>$&nbsp;</span>
                <input
                    matInput
                    type="number"
                    [(ngModel)]="groupCost"
                    [disabled]="saving()"
                    min="0"
                    step="1"
                />
            </mat-form-field>

            <div class="classes-section">
                <label class="section-label">Select Classes (minimum 2)</label>
                <div class="class-list">
                    @for (cls of availableClasses; track cls.id) {
                        <label class="class-option">
                            <mat-checkbox
                                [(ngModel)]="cls.selected"
                                [disabled]="saving()"
                            >
                                <span class="class-name">{{ cls.name }}</span>
                                <span class="class-cost"
                                    >\${{ cls.cost }}</span
                                >
                            </mat-checkbox>
                        </label>
                    }
                    @if (availableClasses.length === 0) {
                        <p class="no-classes">
                            No available classes. All classes are already in
                            groups.
                        </p>
                    }
                </div>
            </div>

            @if (savingsDisplay() !== null) {
                <div class="savings-info">
                    <mat-icon>local_offer</mat-icon>
                    <span>{{ savingsDisplay() }}</span>
                </div>
            }

            @if (error()) {
                <p class="error">{{ error() }}</p>
            }

            <div class="dialog-actions">
                <button mat-button (click)="close()" [disabled]="saving()">
                    Cancel
                </button>
                <button
                    mat-raised-button
                    color="primary"
                    (click)="save()"
                    [disabled]="!canSave() || saving()"
                >
                    @if (saving()) {
                        <mat-spinner diameter="20"></mat-spinner>
                    } @else {
                        {{ isEditing ? 'Update' : 'Create' }} Group
                    }
                </button>
            </div>
        </div>
    `,
    styles: [
        `
            .dialog-container {
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                min-width: 450px;
            }

            h2 {
                margin: 0 0 1rem;
            }

            .full-width {
                width: 100%;
            }

            .classes-section {
                margin-bottom: 1rem;
            }

            .section-label {
                display: block;
                font-size: 14px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.6);
                margin-bottom: 8px;
            }

            .class-list {
                max-height: 250px;
                overflow-y: auto;
                border: 1px solid rgba(0, 0, 0, 0.12);
                border-radius: 4px;
                padding: 8px;
            }

            .class-option {
                display: block;
                padding: 4px 0;
            }

            .class-name {
                margin-right: 8px;
            }

            .class-cost {
                color: rgba(0, 0, 0, 0.54);
                font-size: 13px;
            }

            .no-classes {
                color: rgba(0, 0, 0, 0.54);
                text-align: center;
                padding: 1rem;
                margin: 0;
            }

            .savings-info {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                background: #e8f5e9;
                border-radius: 4px;
                margin-bottom: 1rem;
                color: #2e7d32;
                font-size: 14px;
            }

            .savings-info mat-icon {
                font-size: 20px;
                width: 20px;
                height: 20px;
            }

            .error {
                color: #c62828;
                margin: 0 0 1rem;
            }

            .dialog-actions {
                display: flex;
                justify-content: flex-end;
                gap: 8px;
                margin-top: 1rem;
            }

            .dialog-actions mat-spinner {
                display: inline-block;
            }
        `,
    ],
})
export class ClassGroupFormDialogComponent implements OnInit {
    readonly #dialogRef = inject(DialogRef<ClassGroupFormDialogResult>);
    readonly #api = inject(MountainSolApiService);
    readonly data = inject<ClassGroupFormDialogData>(DIALOG_DATA);

    groupName = '';
    groupCost = 0;
    availableClasses: AvailableClass[] = [];
    isEditing = false;

    readonly saving = signal(false);
    readonly error = signal<string | null>(null);

    readonly selectedClasses = computed(() =>
        this.availableClasses.filter((c) => c.selected)
    );

    readonly canSave = computed(() => {
        const selected = this.availableClasses.filter((c) => c.selected);
        return (
            this.groupName.trim().length > 0 &&
            this.groupCost >= 0 &&
            selected.length >= 2
        );
    });

    readonly savingsDisplay = computed(() => {
        const selected = this.availableClasses.filter((c) => c.selected);
        if (selected.length < 2 || this.groupCost <= 0) return null;
        const individualTotal = selected.reduce(
            (sum, c) => sum + c.cost,
            0
        );
        const savings = individualTotal - this.groupCost;
        if (savings <= 0) return null;
        return `$${savings} savings vs. individual prices ($${individualTotal})`;
    });

    readonly #performSave = rxMethod<
        | {
              semesterId: string;
              groupId?: string;
              name: string;
              cost: number;
              classIds: string[];
          }
        | undefined
    >(
        pipe(
            filter((data): data is NonNullable<typeof data> => !!data),
            tap(() => {
                this.saving.set(true);
                this.error.set(null);
            }),
            switchMap((data) => {
                if (data.groupId) {
                    return this.#api
                        .updateClassGroup({
                            semesterId: data.semesterId,
                            groupId: data.groupId,
                            name: data.name,
                            cost: data.cost,
                            classIds: data.classIds,
                        })
                        .pipe(
                            tap(() => {
                                this.saving.set(false);
                                this.#dialogRef.close('saved');
                            }),
                            catchError((err) => {
                                this.saving.set(false);
                                this.error.set(
                                    err?.message || 'Failed to update group'
                                );
                                return EMPTY;
                            })
                        );
                } else {
                    return this.#api
                        .createClassGroup({
                            semesterId: data.semesterId,
                            name: data.name,
                            cost: data.cost,
                            classIds: data.classIds,
                        })
                        .pipe(
                            tap(() => {
                                this.saving.set(false);
                                this.#dialogRef.close('saved');
                            }),
                            catchError((err) => {
                                this.saving.set(false);
                                this.error.set(
                                    err?.message || 'Failed to create group'
                                );
                                return EMPTY;
                            })
                        );
                }
            })
        )
    );

    ngOnInit() {
        const existing = this.data.existingGroup;
        if (existing) {
            this.isEditing = true;
            this.groupName = existing.name;
            this.groupCost = existing.cost;
        }

        this.availableClasses = this.data.classes.map((cls) => ({
            ...cls,
            selected: existing?.classIds.includes(cls.id) ?? false,
        }));
    }

    close() {
        this.#dialogRef.close();
    }

    save() {
        if (!this.canSave()) return;

        const selectedIds = this.availableClasses
            .filter((c) => c.selected)
            .map((c) => c.id);

        this.#performSave({
            semesterId: this.data.semesterId,
            groupId: this.data.existingGroup?.id,
            name: this.groupName.trim(),
            cost: this.groupCost,
            classIds: selectedIds,
        });
    }
}

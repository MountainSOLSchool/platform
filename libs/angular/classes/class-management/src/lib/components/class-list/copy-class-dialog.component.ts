import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';

export interface CopyClassDialogData {
    classId: string;
    className: string;
    currentSemesterId: string;
    semesters: Array<{ id: string; name: string }>;
}

export interface CopyClassDialogResult {
    classId: string;
    semesterId: string;
}

type CopyTarget = 'same' | 'different' | 'new';

@Component({
    selector: 'sol-copy-class-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressSpinnerModule,
    ],
    template: `
        <div class="dialog-container">
            <h2>Copy Class</h2>
            <p class="subtitle">Create a copy of "{{ data.className }}"</p>

            <div class="copy-options">
                <mat-radio-group [(ngModel)]="copyTarget" class="radio-group">
                    <mat-radio-button value="same">
                        Same semester
                    </mat-radio-button>
                    <mat-radio-button value="different">
                        Different semester
                    </mat-radio-button>
                    <mat-radio-button value="new">
                        New semester
                    </mat-radio-button>
                </mat-radio-group>

                @if (copyTarget() === 'different') {
                    <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Select Semester</mat-label>
                        <mat-select [(ngModel)]="selectedSemesterId">
                            @for (
                                semester of otherSemesters();
                                track semester.id
                            ) {
                                <mat-option [value]="semester.id">
                                    {{ semester.name }}
                                </mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                }

                @if (copyTarget() === 'new') {
                    <mat-form-field appearance="outline" class="full-width">
                        <mat-label>New Semester Name</mat-label>
                        <input
                            matInput
                            [(ngModel)]="newSemesterName"
                            placeholder="e.g., Spring 2025"
                            [disabled]="saving()"
                        />
                    </mat-form-field>
                }
            </div>

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
                    (click)="copy()"
                    [disabled]="saving() || !canCopy()"
                >
                    @if (saving()) {
                        <mat-spinner diameter="20"></mat-spinner>
                    } @else {
                        Copy Class
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
                min-width: 400px;
            }

            h2 {
                margin: 0 0 0.25rem;
            }

            .subtitle {
                margin: 0 0 1.5rem;
                color: #666;
            }

            .copy-options {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .radio-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .full-width {
                width: 100%;
                margin-top: 0.5rem;
            }

            .error {
                color: #c62828;
                margin: 1rem 0 0;
            }

            .dialog-actions {
                display: flex;
                justify-content: flex-end;
                gap: 8px;
                margin-top: 1.5rem;
            }

            .dialog-actions mat-spinner {
                display: inline-block;
            }
        `,
    ],
})
export class CopyClassDialogComponent {
    readonly dialogRef = inject(DialogRef<CopyClassDialogResult>);
    readonly data = inject<CopyClassDialogData>(DIALOG_DATA);
    private readonly functions = inject(FirebaseFunctionsService);

    copyTarget = signal<CopyTarget>('same');
    selectedSemesterId = '';
    newSemesterName = '';
    saving = signal(false);
    error = signal<string | null>(null);

    otherSemesters = computed(() =>
        this.data.semesters.filter((s) => s.id !== this.data.currentSemesterId)
    );

    canCopy = computed(() => {
        const target = this.copyTarget();
        if (target === 'same') return true;
        if (target === 'different') return !!this.selectedSemesterId;
        if (target === 'new') return !!this.newSemesterName.trim();
        return false;
    });

    close() {
        this.dialogRef.close();
    }

    copy() {
        if (!this.canCopy()) return;

        this.saving.set(true);
        this.error.set(null);

        const target = this.copyTarget();
        const request: {
            sourceClassId: string;
            sourceSemesterId: string;
            targetSemesterId?: string;
            newSemesterName?: string;
        } = {
            sourceClassId: this.data.classId,
            sourceSemesterId: this.data.currentSemesterId,
        };

        if (target === 'same') {
            request.targetSemesterId = this.data.currentSemesterId;
        } else if (target === 'different') {
            request.targetSemesterId = this.selectedSemesterId;
        } else if (target === 'new') {
            request.newSemesterName = this.newSemesterName.trim();
        }

        this.functions
            .call<{ success: boolean; classId: string; semesterId: string }>(
                'copyClass',
                request
            )
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe({
                next: (result) => {
                    this.saving.set(false);
                    this.dialogRef.close({
                        classId: result.classId,
                        semesterId: result.semesterId,
                    });
                },
                error: (err) => {
                    this.saving.set(false);
                    this.error.set(err?.message || 'Failed to copy class');
                },
            });
    }
}

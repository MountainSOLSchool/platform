import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';

@Component({
    selector: 'sol-add-semester-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
    ],
    template: `
        <div class="dialog-container">
            <h2>Add Semester</h2>

            <mat-form-field appearance="outline" class="full-width">
                <mat-label>Semester Name</mat-label>
                <input
                    matInput
                    [(ngModel)]="semesterName"
                    placeholder="e.g., Spring 2025"
                    [disabled]="saving()"
                />
            </mat-form-field>

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
                    [disabled]="saving() || !semesterName.trim()"
                >
                    @if (saving()) {
                        <mat-spinner diameter="20"></mat-spinner>
                    } @else {
                        Create
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
                min-width: 350px;
            }

            h2 {
                margin: 0 0 1.5rem;
            }

            .full-width {
                width: 100%;
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
export class AddSemesterDialogComponent {
    private readonly dialogRef = inject(DialogRef);
    private readonly functions = inject(FirebaseFunctionsService);

    semesterName = '';
    saving = signal(false);
    error = signal<string | null>(null);

    close() {
        this.dialogRef.close();
    }

    save() {
        if (!this.semesterName.trim()) return;

        this.saving.set(true);
        this.error.set(null);

        this.functions
            .call<{ id: string; name: string }>('createSemester', {
                name: this.semesterName.trim(),
            })
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe({
                next: (result) => {
                    this.saving.set(false);
                    this.dialogRef.close(result);
                },
                error: (err) => {
                    this.saving.set(false);
                    this.error.set(
                        err?.message || 'Failed to create semester'
                    );
                },
            });
    }
}

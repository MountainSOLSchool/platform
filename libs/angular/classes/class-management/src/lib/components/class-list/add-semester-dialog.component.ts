import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { pipe, filter, tap, switchMap, catchError, EMPTY } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

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
                <mat-hint
                    >Format: Season Year (e.g., Fall 2025, Summer
                    2026)</mat-hint
                >
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
    readonly #dialogRef = inject(DialogRef);
    readonly #functions = inject(FirebaseFunctionsService);

    semesterName = '';
    readonly saving = signal(false);
    readonly error = signal<string | null>(null);

    // rxMethod for save
    readonly #performSave = rxMethod<string | undefined>(
        pipe(
            filter((name): name is string => !!name),
            tap(() => {
                this.saving.set(true);
                this.error.set(null);
            }),
            switchMap((name) =>
                this.#functions
                    .call<{
                        id: string;
                        name: string;
                    }>('createSemester', { name })
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        tap((result) => {
                            this.saving.set(false);
                            this.#dialogRef.close(result);
                        }),
                        catchError((err) => {
                            this.saving.set(false);
                            this.error.set(
                                err?.message || 'Failed to create semester'
                            );
                            return EMPTY;
                        })
                    )
            )
        )
    );

    close() {
        this.#dialogRef.close();
    }

    save() {
        const name = this.semesterName.trim();
        if (!name) return;
        this.#performSave(name);
    }
}

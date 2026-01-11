import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface ValidationErrorsDialogData {
    errors: string[];
    title?: string;
    message?: string;
}

@Component({
    selector: 'sol-validation-errors-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatIconModule],
    template: `
        <h2 mat-dialog-title>
            <mat-icon color="warn">error</mat-icon>
            {{ data.title ?? 'Validation Errors' }}
        </h2>
        <mat-dialog-content>
            <p>
                {{
                    data.message ??
                        'Please resolve the following issues before continuing:'
                }}
            </p>
            <ul class="error-list">
                @for (error of data.errors; track error) {
                    <li>{{ error }}</li>
                }
            </ul>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-flat-button color="primary" [mat-dialog-close]="true">
                OK
            </button>
        </mat-dialog-actions>
    `,
    styles: [
        `
            h2 {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            mat-dialog-content p {
                margin-bottom: 1rem;
            }

            .error-list {
                margin: 0;
                padding-left: 1.5rem;
            }

            .error-list li {
                margin-bottom: 0.5rem;
                color: #c62828;
            }

            .error-list li:last-child {
                margin-bottom: 0;
            }
        `,
    ],
})
export class ValidationErrorsDialogComponent {
    readonly data = inject<ValidationErrorsDialogData>(MAT_DIALOG_DATA);
}

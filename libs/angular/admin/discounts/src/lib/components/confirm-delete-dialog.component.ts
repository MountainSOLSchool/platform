import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDeleteDialogData {
    code: string;
}

@Component({
    selector: 'sol-confirm-delete-dialog',
    standalone: true,
    imports: [MatButtonModule],
    template: `
        <div class="dialog-content">
            <h2>Delete Discount</h2>
            <p>
                Are you sure you want to delete the discount code
                <strong>{{ data.code }}</strong
                >? This action cannot be undone.
            </p>
            <div class="dialog-actions">
                <button mat-stroked-button (click)="dialogRef.close(false)">
                    Cancel
                </button>
                <button
                    mat-raised-button
                    color="warn"
                    (click)="dialogRef.close(true)"
                >
                    Delete
                </button>
            </div>
        </div>
    `,
    styles: [
        `
            .dialog-content {
                padding: 1.5rem;
            }
            h2 {
                margin: 0 0 1rem;
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
export class ConfirmDeleteDialogComponent {
    readonly data = inject<ConfirmDeleteDialogData>(DIALOG_DATA);
    readonly dialogRef = inject(DialogRef<boolean>);
}

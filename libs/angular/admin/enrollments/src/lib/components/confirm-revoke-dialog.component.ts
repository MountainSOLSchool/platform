import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

export interface ConfirmRevokeDialogData {
    studentName: string;
    finalCost: number;
}

@Component({
    selector: 'sol-confirm-revoke-dialog',
    standalone: true,
    imports: [MatButtonModule, CurrencyPipe],
    template: `
        <div class="dialog-content">
            <h2>Revoke Enrollment</h2>
            <p>
                Are you sure you want to revoke the enrollment for
                <strong>{{ data.studentName }}</strong
                >?
            </p>
            @if (data.finalCost > 0) {
                <p>
                    A refund of <strong>{{ data.finalCost | currency }}</strong>
                    will be issued.
                </p>
            }
            <p>The student will be removed from all enrolled classes.</p>
            <div class="dialog-actions">
                <button mat-stroked-button (click)="dialogRef.close(false)">
                    Cancel
                </button>
                <button
                    mat-raised-button
                    color="warn"
                    (click)="dialogRef.close(true)"
                >
                    Revoke & Refund
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
export class ConfirmRevokeDialogComponent {
    readonly data = inject<ConfirmRevokeDialogData>(DIALOG_DATA);
    readonly dialogRef = inject(DialogRef<boolean>);
}

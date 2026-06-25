import { Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    template: `<mat-card class="start-over-dialog">
        <mat-card-header>
            <mat-card-title>Start over?</mat-card-title>
        </mat-card-header>
        <mat-card-content>
            <p>
                Starting over will cause you to lose any new or updated
                information you've entered. Are you sure you want to start over?
            </p>
        </mat-card-content>
        <mat-card-actions align="end">
            <button mat-stroked-button (click)="cancel()">No, Cancel</button>
            <button mat-raised-button color="warn" (click)="confirm()">
                Yes, Start Over
            </button>
        </mat-card-actions>
    </mat-card>`,
    styles: [
        `
            .start-over-dialog {
                max-width: 480px;
            }
            mat-card-actions {
                gap: 0.5rem;
            }
        `,
    ],
    imports: [MatButtonModule, MatCardModule],
})
export class StartOverDialogComponent {
    private readonly dialogRef = inject(DialogRef);

    confirm() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close(false);
    }
}

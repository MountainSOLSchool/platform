import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'sol-unit-limit-warning-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatIconModule],
    template: `
        <h2 mat-dialog-title>
            <mat-icon color="warn">warning</mat-icon>
            Too Many Units
        </h2>
        <mat-dialog-content>
            <p>
                Classes really shouldn't have more than 3 units since it's
                unlikely the class can cover that much content.
            </p>
            <p>Are you sure you want to add another unit?</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button [mat-dialog-close]="false">Cancel</button>
            <button mat-flat-button color="warn" [mat-dialog-close]="true">
                Add Anyway
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

            mat-dialog-content p:last-child {
                margin-bottom: 0;
            }
        `,
    ],
})
export class UnitLimitWarningDialogComponent {}

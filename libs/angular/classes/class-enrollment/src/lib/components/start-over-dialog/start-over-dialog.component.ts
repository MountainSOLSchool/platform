import { Component, inject, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
    template: `<p-dialog
        #startOverDialog
        header="Start over?"
        [visible]="true"
        [closable]="false"
        [modal]="true"
        [draggable]="false"
    >
        <div style="margin-top: 1rem">
            Starting over will cause you to lose any new or updated information
            you've entered. Are you sure you want to start over?
        </div>
        <div style="margin-top: 1rem">
            <button
                pButton
                class="p-button-danger"
                label="Yes, Start Over"
                (click)="confirm()"
            ></button>
            <button
                pButton
                label="No, Cancel"
                style="margin-left: 1rem"
                (click)="cancel()"
            ></button>
        </div>
    </p-dialog> `,
    imports: [DialogModule, ButtonModule],
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

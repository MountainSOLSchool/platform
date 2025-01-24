import {
    CdkDialogContainer,
    DialogModule,
    DialogRef,
} from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { Dialog, DialogModule as PrimeNgDialog } from 'primeng/dialog';

@Component({
    standalone: true,
    imports: [PrimeNgDialog, DialogModule],
    template: `
        <p-dialog
            #pDialog
            [header]="title"
            [visible]="visible()"
            [modal]="true"
            [dismissableMask]="true"
            [closeOnEscape]="true"
            [draggable]="false"
            (onHide)="dialogRef.close()"
            (visibleChange)="visible.set($event)"
        >
            <ng-template cdkPortalOutlet></ng-template>
        </p-dialog>
    `,
})
export class DialogContainerComponent
    extends CdkDialogContainer
    implements OnInit
{
    readonly dialogRef = inject(DialogRef);
    readonly visible = signal<boolean>(true);
    readonly pDialog = viewChild<Dialog>('pDialog');

    readonly title =
        (typeof this._config.data === 'object' &&
            this._config.data &&
            'title' in this._config.data &&
            String(this._config.data.title)) ||
        '';

    ngOnInit(): void {
        const pDialog = this.pDialog();
        if (
            pDialog &&
            typeof this._config.data === 'object' &&
            this._config.data &&
            'fullscreen' in this._config.data &&
            this._config.data.fullscreen
        ) {
            pDialog.maximized = true;
        }
    }
}

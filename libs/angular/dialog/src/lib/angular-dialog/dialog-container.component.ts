import {
    CdkDialogContainer,
    DialogModule,
    DialogRef,
} from '@angular/cdk/dialog';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    standalone: true,
    imports: [DialogModule, MatIconButton, MatIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="dialog-shell" [class.fullscreen]="fullscreen">
            <header class="dialog-header">
                <h2 class="dialog-title">{{ title }}</h2>
                <button
                    mat-icon-button
                    type="button"
                    aria-label="Close dialog"
                    (click)="dialogRef.close()"
                >
                    <mat-icon>close</mat-icon>
                </button>
            </header>
            <div class="dialog-body">
                <ng-template cdkPortalOutlet></ng-template>
            </div>
        </div>
    `,
    styles: [
        `
            :host {
                display: block;
            }
            .dialog-shell {
                background: var(--sol-surface, #fff);
                color: var(--sol-on-surface, #1d1b20);
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
                display: flex;
                flex-direction: column;
                max-height: 90vh;
                min-width: min(560px, 90vw);
                overflow: hidden;
            }
            .dialog-shell.fullscreen {
                width: 100vw;
                height: 100vh;
                max-height: 100vh;
                border-radius: 0;
            }
            .dialog-header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1rem;
                border-bottom: 1px solid var(--sol-input-border, #e0e0e0);
            }
            .dialog-title {
                flex: 1;
                margin: 0;
                font-size: 1.125rem;
                font-weight: 500;
            }
            .dialog-body {
                flex: 1 1 auto;
                padding: 1rem;
                overflow: auto;
            }
        `,
    ],
})
export class DialogContainerComponent extends CdkDialogContainer {
    readonly dialogRef = inject(DialogRef);
    readonly visible = signal<boolean>(true);

    readonly title =
        (typeof this._config.data === 'object' &&
            this._config.data &&
            'title' in this._config.data &&
            String(this._config.data.title)) ||
        '';

    readonly fullscreen =
        typeof this._config.data === 'object' &&
        this._config.data &&
        'fullscreen' in this._config.data &&
        Boolean(this._config.data.fullscreen);
}

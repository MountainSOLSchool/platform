import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-messages',
    standalone: true,
    template: `@for (message of resolvedMessages(); track message) {
        <small [class]="errorClass()">{{ message }}</small>
    }`,
    styles: [
        `
            :host {
                display: block;
            }

            small {
                display: block;
                margin-top: 4px;
                margin-left: 2px;
            }

            /* PrimeNG variant (default) */
            small.p-error {
                color: var(--red-500, #ef4444);
            }

            /* Material variant */
            small.mat-error {
                color: var(--mat-form-field-error-text-color, #f44336);
                font-size: 75%;
            }
        `,
    ],
})
export class MessagesComponent {
    readonly messages = input<string[] | undefined>();
    readonly variant = input<'material' | 'primeng'>('material');

    readonly resolvedMessages = computed(() => this.messages() ?? []);
    readonly errorClass = computed(() =>
        this.variant() === 'primeng' ? 'p-error block' : 'mat-error'
    );
}

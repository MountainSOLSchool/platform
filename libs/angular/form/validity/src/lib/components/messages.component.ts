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
        <small class="mat-error">{{ message }}</small>
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

            small.mat-error {
                color: var(--mat-form-field-error-text-color, #f44336);
                font-size: 75%;
            }
        `,
    ],
})
export class MessagesComponent {
    readonly messages = input<string[] | undefined>();

    readonly resolvedMessages = computed(() => this.messages() ?? []);
}

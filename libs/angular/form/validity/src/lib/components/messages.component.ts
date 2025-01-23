import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-messages',
    template: `@for (message of messages; track message) {
        <small class="p-error block" style="margin-top:4px; margin-left:2px">{{
            message
        }}</small>
    }`,
})
export class MessagesComponent {
    @Input() messages: string[] = [];
}

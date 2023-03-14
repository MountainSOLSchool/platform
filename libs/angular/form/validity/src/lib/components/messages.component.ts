import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-messages',
    template: ` <small
        *ngFor="let message of messages"
        class="p-error block"
        style="margin-top:4px; margin-left:2px"
        >{{ message }}</small
    >`,
    imports: [CommonModule],
})
export class MessagesComponent {
    @Input() messages: string[] = [];
}

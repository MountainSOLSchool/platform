import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
    standalone: true,
    imports: [ButtonModule, MessageModule, ToastModule],
    template: `
        <div class="min-w-[400px]">
            <div class="mt-2">
                <button
                    pButton
                    icon="pi pi-copy"
                    label="Copy All"
                    class="p-button-primary"
                    (click)="copyEmails()"
                ></button>
            </div>
            <div class="max-h-[400px] overflow-auto pr-2 mt-4">
                @for (email of data.emails; track email) {
                    <div class="mb-2 p-2 bg-gray-50 rounded hover:bg-gray-100">
                        {{ email }}
                    </div>
                }
            </div>
        </div>
    `,
})
export class ClassEmailsDialogComponent {
    readonly data = inject<{
        emails: Array<string>;
    }>(DIALOG_DATA);

    #messageService = inject(MessageService);

    copyEmails() {
        navigator.clipboard.writeText(this.data.emails.join(', '));
        this.#messageService.add({
            severity: 'success',
            detail: 'Copied emails!',
        });
    }
}

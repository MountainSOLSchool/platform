import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SolToastService } from '@sol/angular/toast';

@Component({
    standalone: true,
    imports: [MatButtonModule, MatIconModule],
    template: `
        <div class="min-w-[400px]">
            <div class="mt-2">
                <button mat-flat-button color="primary" (click)="copyEmails()">
                    <mat-icon>content_copy</mat-icon>
                    Copy All
                </button>
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

    #toastService = inject(SolToastService);

    copyEmails() {
        navigator.clipboard.writeText(this.data.emails.join(', '));
        this.#toastService.add({
            severity: 'success',
            detail: 'Copied emails!',
        });
    }
}

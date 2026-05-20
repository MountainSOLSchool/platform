import { Component, inject, input, model } from '@angular/core';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from '@sol/form/validity';

@Component({
    standalone: true,
    selector: 'sol-confirm-accuracy',
    template: `@if (isOutOfDate()) {
        <div
            class="section-confirmation p-3 border-1 border-round border-dashed mb-3"
        >
            <div class="flex align-items-center">
                <mat-checkbox
                    [ngModel]="sectionConfirmed()"
                    (ngModelChange)="sectionConfirmed.set($event)"
                    [required]="true"
                >
                    I have reviewed this section and confirm it is up-to-date
                </mat-checkbox>
            </div>
            <sol-messages [messages]="messages()"></sol-messages>
        </div>
    }`,
    imports: [MatCheckboxModule, FormsModule, MessagesComponent],
})
export class ConfirmAccuracyComponent {
    readonly #workflow = inject(EnrollmentWorkflowStore);

    readonly isOutOfDate = this.#workflow.selectSignal(
        (state) => state.doesStudentInfoRequireReview
    );

    readonly sectionConfirmed = model.required<boolean>();

    readonly messages = input<Array<string>>([]);

    readonly sectionId = Math.random();
}

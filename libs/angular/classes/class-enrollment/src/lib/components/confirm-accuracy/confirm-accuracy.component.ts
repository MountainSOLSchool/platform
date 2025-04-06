import { Component, inject, input, model } from '@angular/core';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { CheckboxModule } from 'primeng/checkbox';
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
                <p-checkbox
                    [binary]="true"
                    [ngModel]="sectionConfirmed()"
                    (ngModelChange)="sectionConfirmed.set($event)"
                    inputId="section-{{ sectionId }}-confirmed"
                    [required]="true"
                >
                </p-checkbox>
                <label
                    for="section-{{ sectionId }}-confirmed"
                    class="ml-2 font-medium"
                >
                    I have reviewed this section and confirm it is up-to-date
                </label>
            </div>
            <sol-messages [messages]="messages()"></sol-messages>
        </div>
    }`,
    imports: [CheckboxModule, FormsModule, MessagesComponent],
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

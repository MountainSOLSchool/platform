import { Component, inject } from '@angular/core';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

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
                    [(ngModel)]="sectionConfirmed"
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
            @if (showValidationError) {
                <small class="p-error block mt-2">
                    Please confirm this section is up-to-date or make necessary
                    changes
                </small>
            }
        </div>
    }`,
    imports: [CheckboxModule, FormsModule],
})
export class ConfirmAccuracyComponent {
    #workflow = inject(EnrollmentWorkflowStore);

    readonly isOutOfDate = this.#workflow.selectSignal(
        (state) => state.isMedicalInfoOutOfDate
    );

    sectionConfirmed = false;

    showValidationError = true;

    readonly sectionId = Math.random();
}

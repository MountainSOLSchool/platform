import { Component, inject } from '@angular/core';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
    standalone: true,
    selector: 'sol-acknowledge-out-of-date',
    template: `@if (isOutOfDateAndNotAcknowledged()) {
            <p-card class="review-card my-3">
                <ng-template pTemplate="content">
                    <div
                        class="flex flex-column align-items-center text-center p-3"
                    >
                        <i
                            class="pi pi-exclamation-circle text-warning text-3xl mb-3"
                        ></i>
                        <h2>Review your student's information</h2>
                        <p class="mb-4">
                            To make sure your student's information is still
                            correct, since details can change over time, please
                            review each section and either update anything that
                            needs changing or confirm that the section is still
                            accurate.
                        </p>
                        <button
                            pButton
                            type="button"
                            label="Start reviewing"
                            class="p-button-primary"
                            (click)="acknowledgeOutOfDate()"
                        ></button>
                    </div>
                </ng-template>
            </p-card>
        } @else {
            <ng-content></ng-content>
        }`,
    imports: [CardModule, ButtonModule],
})
export class AcknowledgeOutOfDateComponent {
    #workflow = inject(EnrollmentWorkflowStore);

    readonly isOutOfDateAndNotAcknowledged = this.#workflow.selectSignal(
        (state) =>
            !state.hasAcknowledgedOutOfDate && state.isMedicalInfoOutOfDate
    );

    acknowledgeOutOfDate() {
        this.#workflow.patchState({
            hasAcknowledgedOutOfDate: true,
        });
    }
}

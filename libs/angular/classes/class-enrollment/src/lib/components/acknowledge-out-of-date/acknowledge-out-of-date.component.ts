import { Component, inject } from '@angular/core';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    standalone: true,
    selector: 'sol-acknowledge-out-of-date',
    template: `@if (isOutOfDateAndNotAcknowledged()) {
            <mat-card class="review-card my-3">
                <mat-card-content>
                    <div
                        class="flex flex-column align-items-center text-center p-3"
                    >
                        <mat-icon class="text-warning text-3xl mb-3">
                            error
                        </mat-icon>
                        <h2>Review your student's information</h2>
                        <p class="mb-4">
                            To make sure your student's information is still
                            correct, since details can change over time, please
                            review each section and either update anything that
                            needs changing or confirm that the section is still
                            accurate.
                        </p>
                        <button
                            mat-raised-button
                            color="primary"
                            type="button"
                            (click)="acknowledgeOutOfDate()"
                        >
                            Start reviewing
                        </button>
                    </div>
                </mat-card-content>
            </mat-card>
        } @else {
            <ng-content></ng-content>
        }`,
    imports: [MatCardModule, MatButtonModule, MatIconModule],
})
export class AcknowledgeOutOfDateComponent {
    #workflow = inject(EnrollmentWorkflowStore);

    readonly isOutOfDateAndNotAcknowledged = this.#workflow.selectSignal(
        (state) =>
            !state.hasAcknowledgedOutOfDate &&
            state.doesStudentInfoRequireReview
    );

    acknowledgeOutOfDate() {
        this.#workflow.patchState({
            hasAcknowledgedOutOfDate: true,
        });
    }
}

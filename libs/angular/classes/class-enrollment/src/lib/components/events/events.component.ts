import { NgStyle } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    inject,
    Output,
} from '@angular/core';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { of } from 'rxjs';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import 'add-to-calendar-button';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [
        NgStyle,
        CheckboxModule,
        CardModule,
        TagModule,
        ToggleButtonModule,
        FormsModule,
        ChipModule,
    ],
    selector: 'sol-event-selection',
    templateUrl: './events.component.html',
    styles: [
        `
            :host ::ng-deep .p-chip.custom-chip {
                background: var(--green-600);
                color: var(--primary-color-text);
            }
        `,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EventsComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);

    @Output() validityChange = of(true);

    checked$ = this.workflow.select(
        (s) => s.enrollment.isSignedUpForSolsticeEmails
    );

    signupChanged({ checked }: { checked: boolean | undefined }) {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                isSignedUpForSolsticeEmails: checked ?? false,
            },
        }));
    }
}

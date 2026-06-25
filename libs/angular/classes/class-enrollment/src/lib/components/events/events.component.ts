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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import 'add-to-calendar-button';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [
        NgStyle,
        MatCheckboxModule,
        MatCardModule,
        MatIconModule,
        MatButtonToggleModule,
        FormsModule,
    ],
    selector: 'sol-event-selection',
    templateUrl: './events.component.html',
    styles: [
        `
            .status-tag {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 0.85rem;
                font-weight: 600;
                line-height: 1.25;
            }
            .status-success {
                background: #d1fae5;
                color: #065f46;
            }
            .chip {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                background: #16a34a;
                color: #fff;
                padding: 4px 10px;
                border-radius: 16px;
                font-size: 0.85rem;
                font-weight: 500;
            }
            .chip mat-icon {
                font-size: 1rem;
                width: 1rem;
                height: 1rem;
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

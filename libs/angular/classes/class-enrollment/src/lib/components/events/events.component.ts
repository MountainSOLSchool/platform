import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Output,
} from '@angular/core';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { of } from 'rxjs';
import { LetModule } from '@rx-angular/template/let';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        LetModule,
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

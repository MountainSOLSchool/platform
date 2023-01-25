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
    ],
    selector: 'sol-event-selection',
    templateUrl: './events.component.html',
})
export class EventsComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);

    @Output() validityChange = of(true);

    signupChanged({ checked }: { checked: boolean }) {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                isSignedUpForSolsticeEmails: checked,
            },
        }));
    }
}

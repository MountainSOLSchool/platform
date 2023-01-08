import { CommonModule } from '@angular/common';
import { Component, inject, Input, Output } from '@angular/core';
import { LetModule } from '@rx-angular/template/let';
import { ChipModule } from 'primeng/chip';
import { map, of, switchMap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { ClassListService } from '../../services/class-list.service';
import { ForModule } from '@rx-angular/template';
import { FieldsetModule } from 'primeng/fieldset';
@Component({
    standalone: true,
    imports: [CommonModule, ChipModule, LetModule, ForModule, FieldsetModule],
    selector: 'sol-class-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
    workflow = inject(EnrollmentWorkflowStore);
    classList = inject(ClassListService);

    _allStepsComplete = false;
    get allStepsComplete() {
        return this._allStepsComplete;
    }
    @Input() set allStepsComplete(complete: boolean) {
        this._allStepsComplete = complete;
    }

    @Output() validityChange = of(true);

    enrollment$ = this.workflow.select(({ enrollment }) => enrollment);
    selectedClasses$ = this.enrollment$.pipe(
        switchMap((enrollment) => {
            return this.classList.getFutureClasses().pipe(
                map((classes) => {
                    return classes.filter((c) =>
                        enrollment.selectedClasses.includes(c.id)
                    );
                })
            );
        })
    );
    student$ = this.enrollment$.pipe(map((enrollment) => enrollment.student));

    submit() {
        this.workflow.submit();
    }
}

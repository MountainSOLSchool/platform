import { CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { LetModule } from '@rx-angular/template/let';
import { ChipModule } from 'primeng/chip';
import { of } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

@Component({
    standalone: true,
    imports: [CommonModule, ChipModule, LetModule],
    selector: 'sol-class-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
    workflow = inject(EnrollmentWorkflowStore);

    @Output() validityChange = of(true);

    enrollment$ = this.workflow.select((enrollment) => enrollment);

    submit() {
        this.workflow.submit();
    }
}

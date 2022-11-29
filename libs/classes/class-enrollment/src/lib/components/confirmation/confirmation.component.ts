import { CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { ChipModule } from 'primeng/chip';
import { of } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

@Component({
    standalone: true,
    imports: [CommonModule, ChipModule],
    selector: 'sol-class-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
    workflow = inject(EnrollmentWorkflowStore);
    functions = inject(FunctionsApi);

    @Output() validityChange = of(true);

    enrollment$ = this.workflow.select(({ enrollment }) => enrollment);

    submit() {
        this.workflow.submit();
    }
}

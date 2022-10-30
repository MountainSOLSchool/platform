import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'sol-class-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
    workflow = inject(EnrollmentWorkflowStore);
    functions = inject(FunctionsApi);

    transaction$ = this.workflow.select(({ transaction }) => transaction);

    submit() {
        this.workflow.submit();
    }
}

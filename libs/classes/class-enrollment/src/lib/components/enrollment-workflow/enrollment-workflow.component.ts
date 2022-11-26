import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnrollmentWorkflowStore } from './enrollment-workflow.store';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { WorkflowComponent } from '@sol/workflow';
import { tap } from 'rxjs';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        StepsModule,
        ButtonModule,
        WorkflowComponent,
    ],
    providers: [provideComponentStore(EnrollmentWorkflowStore)],
    templateUrl: './enrollment-workflow.component.html',
})
export class ClassEnrollmentComponent {
    private readonly store = inject(EnrollmentWorkflowStore);

    readonly steps = [
        { label: 'Class Selection', routerLink: 'classes' },
        { label: 'Student Info', routerLink: 'info' },
        { label: 'Account', routerLink: 'account' },
        { label: 'Payment', routerLink: 'checkout' },
        {
            label: 'Confirm Enrollment',
            routerLink: 'confirmation',
        },
    ];

    readonly completeCurrentStep$ = this.store.readyForNext$.pipe();

    submit() {
        this.store.submit();
    }

    nextClicked() {
        this.store.nextClick();
    }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkflowStore } from './workflow.store';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        WorkflowStore,
        StepsModule,
        ButtonModule,
    ],
    templateUrl: './workflow.component.html',
})
export class WorkflowComponent {
    private readonly store = inject(WorkflowStore);

    readonly steps$ = this.store.selectSteps();
    readonly nextStepLink$ = this.store.selectNextStepLink();

    submit() {
        this.store.submit();
    }

    isLastStep() {
        return false;
    }
}

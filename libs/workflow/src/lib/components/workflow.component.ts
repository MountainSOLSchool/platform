import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkflowStore } from './workflow.store';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { Step } from '../models/step';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
    standalone: true,
    selector: 'sol-workflow',
    imports: [CommonModule, RouterModule, StepsModule, ButtonModule],
    templateUrl: './workflow.component.html',
    providers: [provideComponentStore(WorkflowStore)],
})
export class WorkflowComponent {
    @Input() title = '';
    @Input() set steps(steps: Step[]) {
        this.store.setState((s) => ({ ...s, steps }));
    }
    @Input() set completeCurrentStep(completed: null | void) {
        if (completed !== null) {
            this.store.goToNextStep();
        }
    }
    @Output() nextClick = new EventEmitter<void>();
    @Output() completed = new EventEmitter<void>();

    private readonly store = inject(WorkflowStore);

    readonly steps$ = this.store.selectSteps();
    readonly nextStepLink$ = this.store.selectNextStepLink();
    readonly currentStepLabel$ = this.store.selectCurrentStepLabel();
}

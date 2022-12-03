import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkflowStore } from './workflow.store';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { Step } from '../models/step';
import { provideComponentStore } from '@ngrx/component-store';
import { MatStepperModule } from '@angular/material/stepper';

export type Completeable = { complete: () => void };

@Component({
    standalone: true,
    selector: 'sol-workflow',
    imports: [
        CommonModule,
        RouterModule,
        StepsModule,
        ButtonModule,
        MatStepperModule,
    ],
    templateUrl: './workflow.component.html',
    providers: [provideComponentStore(WorkflowStore)],
})
export class WorkflowComponent {
    @Input() title = '';
    @Input() set steps(steps: Step[]) {
        this.store.setState((s) => ({ ...s, steps }));
    }

    @Output() nextClick = new EventEmitter<Completeable>();
    @Output() completed = new EventEmitter<void>();

    private readonly store = inject(WorkflowStore);

    readonly steps$ = this.store.selectSteps();
    readonly nextStepLink$ = this.store.selectNextStepLink();
    readonly currentStepLabel$ = this.store.selectCurrentStepLabel();

    emitNextClick() {
        this.nextClick.emit({
            complete: () => this.store.goToNextStep(),
        });
    }
}

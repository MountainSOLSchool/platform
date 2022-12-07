import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnrollmentWorkflowStore } from './enrollment-workflow.store';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { WorkflowComponent } from '@sol/workflow';
import { provideComponentStore } from '@ngrx/component-store';
import { MatStepperModule } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Subject } from 'rxjs';
import { ClassesComponent } from '../classes/class-list/class-list.component';
import { InfoComponent } from '../info/info.component';
import { AccountComponent } from '../account/account.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { CdkStepper } from '@angular/cdk/stepper';
import { MedicalComponent } from '../medical/medical.component';
import { LetModule } from '@rx-angular/template/let';

@Component({
    standalone: true,
    providers: [provideComponentStore(EnrollmentWorkflowStore)],
    templateUrl: './enrollment-workflow.component.html',
    imports: [
        CommonModule,
        RouterModule,
        StepsModule,
        ButtonModule,
        WorkflowComponent,
        MatStepperModule,
        ClassesComponent,
        InfoComponent,
        AccountComponent,
        CheckoutComponent,
        ConfirmationComponent,
        MedicalComponent,
        LetModule,
    ],
})
export class ClassEnrollmentComponent {
    private readonly store = inject(EnrollmentWorkflowStore);

    readonly data$ = this.store.select((state) => state);

    readonly stepperOrientation = inject(BreakpointObserver)
        .observe('(min-width: 800px)')
        .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    readonly steps = [
        { label: 'Class Selection', routerLink: 'classes' },
        { label: 'Student Info', routerLink: 'info' },
        { label: 'Medical Info', routerLink: 'medical' },
        { label: 'Account', routerLink: 'account' },
        { label: 'Payment Method', routerLink: 'checkout' },
        {
            label: 'Confirm Enrollment',
            routerLink: 'confirmation',
        },
    ];

    readonly completeCurrentStep$ = this.store.readyForNext$.pipe();

    hit() {
        console.log('hit');
    }

    complete() {
        this.store.submit();
    }

    nextClicked(completeable: { complete: () => void }) {
        this.store.nextClick(completeable);
    }

    next(stepper: CdkStepper) {
        stepper.next();
    }
}

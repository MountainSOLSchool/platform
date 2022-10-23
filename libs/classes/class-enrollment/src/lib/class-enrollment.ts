import { Route } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { WorkflowComponent } from './components/workflow/workflow.component';

export const enrollmentRoutes: Route[] = [
    {
        path: '',
        component: WorkflowComponent,
        children: [
            { path: '', redirectTo: 'classes', pathMatch: 'full' },
            { path: 'classes', component: ClassesComponent },
            { path: 'info', component: EnrollmentComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'confirmation', component: ConfirmationComponent },
        ],
    },
];

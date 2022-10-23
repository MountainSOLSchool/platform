import { Route } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { WorkflowComponent } from './components/workflow/workflow.component';

export const enrollmentRoutes: Route[] = [
    {
        path: '',
        component: WorkflowComponent,
        children: [
            { path: '', redirectTo: 'info', pathMatch: 'full' },
            { path: 'info', component: EnrollmentComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'confirmation', component: EnrollmentComponent },
        ],
    },
];

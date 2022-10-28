import { Route } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { InfoComponent } from './components/info/info.component';
import { ClassEnrollmentComponent } from './components/enrollment-workflow/enrollment-workflow.component';

export const enrollmentRoutes: Route[] = [
    {
        path: '',
        component: ClassEnrollmentComponent,
        children: [
            { path: '', redirectTo: 'classes', pathMatch: 'full' },
            { path: 'classes', component: ClassesComponent },
            { path: 'info', component: InfoComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'confirmation', component: ConfirmationComponent },
        ],
    },
];

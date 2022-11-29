import { Route } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ClassesComponent } from './components/classes/class-list/class-list.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { InfoComponent } from './components/info/info.component';
import { ClassEnrollmentComponent } from './components/enrollment-workflow/enrollment-workflow.component';
import { AccountComponent } from './components/account/account.component';
import { MedicalComponent } from './components/medical/medical.component';

export const enrollmentRoutes: Route[] = [
    {
        path: '',
        component: ClassEnrollmentComponent,
        children: [
            { path: '', redirectTo: 'classes', pathMatch: 'full' },
            { path: 'classes', component: ClassesComponent },
            { path: 'info', component: InfoComponent },
            { path: 'medical', component: MedicalComponent },
            { path: 'account', component: AccountComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'confirmation', component: ConfirmationComponent },
        ],
    },
];

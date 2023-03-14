import { Route } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ClassesComponent } from './components/classes/class-list/class-list.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { InfoComponent } from './components/info/info.component';
import { ClassEnrollmentComponent } from './components/enrollment-workflow/enrollment-workflow.component';
import { AccountComponent } from './components/account/account.component';
import { MedicalComponent } from './components/medical/medical.component';
import { PendingChangesGuard } from './components/enrollment-workflow/pending-changes.guard';
import { EventsComponent } from './components/events/events.component';
import { provideState } from '@ngrx/store';
import { classesFeature } from './store/classes.feature';
import { provideEffects } from '@ngrx/effects';
import { ClassesEffects } from './store/classes.effects';

export const enrollmentRoutes: Route[] = [
    {
        path: '',
        canDeactivate: [PendingChangesGuard],
        component: ClassEnrollmentComponent,
        providers: [
            provideState(classesFeature),
            provideEffects(ClassesEffects),
        ],
        children: [
            { path: '', redirectTo: 'classes', pathMatch: 'full' },
            { path: 'classes', component: ClassesComponent },
            { path: 'events', component: EventsComponent },
            { path: 'info', component: InfoComponent },
            { path: 'medical', component: MedicalComponent },
            { path: 'account', component: AccountComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'confirmation', component: ConfirmationComponent },
        ],
    },
];

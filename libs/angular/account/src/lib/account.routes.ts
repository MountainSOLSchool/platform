import { Routes } from '@angular/router';
import { ManageAccountComponent } from './components/reset-password/manage-account.component';
import { provideEffects } from '@ngrx/effects';
import { ClassesEffects, classesFeature } from '@sol/classes/enrollment';
import { provideState } from '@ngrx/store';
import { AccountEnrollmentsComponent } from './components/enrollments/account-enrollments.component';

export const accountRoutes: Routes = [
    {
        path: 'enrollments',
        component: AccountEnrollmentsComponent,
        children: [],
        providers: [
            // TODO: clean this up (extract for class list service)
            provideState(classesFeature),
            provideEffects(ClassesEffects),
        ],
    },
    {
        path: 'manage',
        component: ManageAccountComponent,
        children: [],
    },
];

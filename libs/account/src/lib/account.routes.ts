import { Routes } from '@angular/router';
import { AccountEnrollmentsComponent } from './components/enrollments/enrollments.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const accountRoutes: Routes = [
    {
        path: 'enrollments',
        component: AccountEnrollmentsComponent,
        children: [],
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        children: [],
    },
];

import { Routes } from '@angular/router';
import { AccountEnrollmentsComponent } from './components/enrollments/enrollments.component';
import { ManageAccountComponent } from './components/reset-password/manage-account.component';

export const accountRoutes: Routes = [
    {
        path: 'enrollments',
        component: AccountEnrollmentsComponent,
        children: [],
    },
    {
        path: 'manage',
        component: ManageAccountComponent,
        children: [],
    },
];

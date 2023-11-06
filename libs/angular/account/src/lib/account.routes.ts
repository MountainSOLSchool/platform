import { Routes } from '@angular/router';
import { ManageAccountComponent } from './components/reset-password/manage-account.component';
import { AccountEnrollmentsComponent } from './components/enrollments/account-enrollments.component';
import { provideClassList } from '@sol/angular/classes/list';

export const accountRoutes: Routes = [
    {
        path: 'enrollments',
        component: AccountEnrollmentsComponent,
        children: [],
        providers: [provideClassList()],
    },
    {
        path: 'manage',
        component: ManageAccountComponent,
        children: [],
    },
];

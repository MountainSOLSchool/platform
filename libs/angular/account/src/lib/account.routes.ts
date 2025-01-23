import { Routes } from '@angular/router';
import { provideClassList } from '@sol/angular/classes/list';

export const accountRoutes: Routes = [
    {
        path: 'enrollments',
        loadComponent: () =>
            import(
                './components/enrollments/account-enrollments.component'
            ).then((m) => m.AccountEnrollmentsComponent),
        children: [],
        providers: [provideClassList()],
    },
    {
        path: 'manage',
        loadComponent: () =>
            import('./components/reset-password/manage-account.component').then(
                (m) => m.ManageAccountComponent
            ),
        children: [],
    },
];

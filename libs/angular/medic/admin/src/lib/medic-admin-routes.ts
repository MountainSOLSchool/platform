import { Route } from '@angular/router';

export const medicAdminRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'classes',
        pathMatch: 'full',
    },
    {
        path: 'classes',
        loadComponent: () =>
            import('./medic-admin-class-list.component').then(
                (m) => m.MedicAdminClassListComponent
            ),
    },
    {
        path: 'classes/create',
        loadComponent: () =>
            import('./medic-admin-class-form.component').then(
                (m) => m.MedicAdminClassFormComponent
            ),
    },
    {
        path: 'classes/edit/:id',
        loadComponent: () =>
            import('./medic-admin-class-form.component').then(
                (m) => m.MedicAdminClassFormComponent
            ),
    },
    {
        path: 'classes/enrollments/:classId',
        loadComponent: () =>
            import('./medic-admin-enrollments.component').then(
                (m) => m.MedicAdminEnrollmentsComponent
            ),
    },
    {
        path: 'enrollments',
        loadComponent: () =>
            import('./medic-admin-enrollments.component').then(
                (m) => m.MedicAdminEnrollmentsComponent
            ),
    },
];

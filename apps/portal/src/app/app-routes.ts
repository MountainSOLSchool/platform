import { Routes } from '@angular/router';
import { HeaderComponent } from '@sol/header';
import { UserGuard } from './user.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: 'user',
                loadChildren: () =>
                    import('@sol/auth/login').then((m) => m.authRoutes),
            },
            {
                path: '',
                canActivate: [UserGuard],
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import(
                                './dashboard-component/dashboard-routes'
                            ).then((m) => m.dashboardRoutes),
                    },
                    {
                        path: 'report',
                        loadChildren: () =>
                            import('./report-component/report-routes').then(
                                (m) => m.reportRoutes
                            ),
                    },
                    {
                        path: 't-shirts',
                        loadChildren: () =>
                            import('./tshirts-component/tshirt-routes').then(
                                (m) => m.tshirtRoutes
                            ),
                    },
                    {
                        path: 'import',
                        loadChildren: () =>
                            import('./import-component/import-routes').then(
                                (m) => m.importRoutes
                            ),
                    },
                    {
                        path: 'calendar',
                        loadChildren: () =>
                            import('@sol/classes/calendar').then(
                                (m) => m.calendarRoutes
                            ),
                    },
                    {
                        path: 'classes',
                        children: [
                            {
                                path: 'management',
                                loadChildren: () =>
                                    import(
                                        '@sol/classes/class-management'
                                    ).then((m) => m.classManagementRoutes),
                            },
                            {
                                path: 'enrollment',
                                loadChildren: () =>
                                    import('@sol/classes/enrollment').then(
                                        (m) => m.enrollmentRoutes
                                    ),
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

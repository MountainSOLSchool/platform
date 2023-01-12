import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { HeaderComponent } from '@sol/header';
import { AdminGuard } from './admin.guard';
import { LoginEffectModule } from './login.effects';
import { UserGuard } from './user.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: 'user',
                providers: [importProvidersFrom(LoginEffectModule)],
                loadChildren: () =>
                    import('@sol/auth/login').then((m) => m.authRoutes),
            },
            { path: '', redirectTo: 'classes', pathMatch: 'full' },
            {
                path: '',
                children: [
                    {
                        path: '',

                        canActivate: [UserGuard],
                        children: [
                            {
                                path: 'admin',
                                providers: [AdminGuard],
                                canActivate: [AdminGuard],
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
                                            import(
                                                './report-component/report-routes'
                                            ).then((m) => m.reportRoutes),
                                    },
                                    {
                                        path: 't-shirts',
                                        loadChildren: () =>
                                            import(
                                                './tshirts-component/tshirt-routes'
                                            ).then((m) => m.tshirtRoutes),
                                    },
                                    {
                                        path: 'classes',
                                        children: [
                                            {
                                                path: 'management',
                                                loadChildren: () =>
                                                    import(
                                                        '@sol/classes/class-management'
                                                    ).then(
                                                        (m) =>
                                                            m.classManagementRoutes
                                                    ),
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'account',
                        loadChildren: () =>
                            import('@sol/account').then((m) => m.accountRoutes),
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
                                path: '',
                                redirectTo: 'enrollment',
                                pathMatch: 'full',
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

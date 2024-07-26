import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { HeaderComponent } from '@sol/header';
import { AdminGuard } from './admin.guard';
import { LoginEffectModule } from './login.effects';
import { UserGuard } from './user.guard';
import { provideClassList } from '@sol/angular/classes/list';
import { provideRequests } from '@sol/angular/request';

export const appRoutes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        providers: [importProvidersFrom(LoginEffectModule), provideRequests()],
        children: [
            {
                path: 'user',
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
                                path: 'account',
                                loadChildren: () =>
                                    import('@sol/account').then(
                                        (m) => m.accountRoutes
                                    ),
                            },
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
                                        providers: [provideClassList()],
                                        loadComponent: () =>
                                            import(
                                                '@sol/admin/class-printouts'
                                            ).then(
                                                (m) => m.ClassPrintoutsComponent
                                            ),
                                    },
                                    {
                                        path: 't-shirts',
                                        loadChildren: () =>
                                            import(
                                                './tshirts-component/tshirt-routes'
                                            ).then((m) => m.tshirtRoutes),
                                    },
                                    {
                                        path: 'enrollments',
                                        loadComponent: () =>
                                            import(
                                                '@sol/angular/admin/enrollments'
                                            ).then(
                                                (m) => m.EnrollmentsComponent
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
            {
                path: '**',
                redirectTo: 'classes/enrollment',
                pathMatch: 'full',
            },
        ],
    },
];

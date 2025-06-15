import { Routes } from '@angular/router';
import { HeaderComponent } from '@sol/header';
import { adminGuard } from './admin.guard';
import { userGuard } from './user.guard';
import { provideClassList } from '@sol/angular/classes/list';
import { provideRequests } from '@sol/angular/request';
import { provideEffects } from '@ngrx/effects';
import { loginEffects } from './login.effects';

export const appRoutes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        providers: [provideEffects(loginEffects), provideRequests()],
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
                        canActivate: [userGuard],
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
                                canActivate: [adminGuard],
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
                                        path: 'students',
                                        loadComponent: () =>
                                            import(
                                                '@sol/angular/admin/students'
                                            ).then(
                                                (m) =>
                                                    m.StudentInfoTableComponent
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

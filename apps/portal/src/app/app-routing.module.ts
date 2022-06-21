import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '@sol/header';
import { UserGuard, UserGuardModule } from './user.guard';

const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: '',
                canActivate: [UserGuard],
                loadChildren: () =>
                    import(
                        './dashboard-component/dashboard.component.module'
                    ).then((m) => m.DashboardComponentModule),
            },
            {
                path: 'user',
                loadChildren: () =>
                    import('@sol/auth/login').then((m) => m.AuthLoginModule),
            },
            {
                path: 'report',
                canActivate: [UserGuard],
                loadChildren: () =>
                    import('./report-component/report.component.module').then(
                        (m) => m.ReportComponentModule
                    ),
            },
            {
                path: 't-shirts',
                canActivate: [UserGuard],
                loadChildren: () =>
                    import('./tshirts-component/tshirts.component.module').then(
                        (m) => m.TshirtsComponentModule
                    ),
            },
            {
                path: 'import',
                canActivate: [UserGuard],
                loadChildren: () =>
                    import('./import-component/import.component.module').then(
                        (m) => m.ImportComponentModule
                    ),
            },
            {
                path: 'calendar',
                canActivate: [UserGuard],
                loadChildren: () =>
                    import('@sol/classes/calendar').then(
                        (m) => m.ClassesCalendarModule
                    ),
            },
            {
                path: 'classes',
                canActivate: [UserGuard],
                children: [
                    {
                        path: 'management',
                        loadChildren: () =>
                            import('@sol/classes/class-management').then(
                                (m) => m.ClassManagementModule
                            ),
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), UserGuardModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}

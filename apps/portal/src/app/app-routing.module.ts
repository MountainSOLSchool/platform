import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '@sol/header';

const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: '',
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
                loadChildren: () =>
                    import('./report-component/report.component.module').then(
                        (m) => m.ReportComponentModule
                    ),
            },
            {
                path: 'import',
                loadChildren: () =>
                    import('./import-component/import.component.module').then(
                        (m) => m.ImportComponentModule
                    ),
            },
            {
                path: 'calendar',
                loadChildren: () =>
                    import('@sol/classes/calendar').then(
                        (m) => m.ClassesCalendarModule
                    ),
            },
            {
                path: 'classes',
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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

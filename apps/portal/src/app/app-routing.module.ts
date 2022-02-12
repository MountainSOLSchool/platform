import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '@sol/header';
import { ReportComponent } from './report.component';

const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: 'user',
                loadChildren: () =>
                    import('@sol/auth/login').then((m) => m.AuthLoginModule),
            },
            {
                path: 'report',
                loadChildren: () =>
                    import('./report.component.module').then(
                        (m) => m.ReportComponentModule
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

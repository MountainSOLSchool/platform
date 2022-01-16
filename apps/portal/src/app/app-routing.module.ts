import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
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
                component: ReportComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

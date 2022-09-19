import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        children: [],
    },
    {
        path: 'create',
        component: LoginComponent,
        data: {
            create: true,
        },
        children: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthLoginRoutingModule {}

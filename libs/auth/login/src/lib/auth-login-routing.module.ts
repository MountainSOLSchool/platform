import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account.component copy';
import { LoginComponent } from './components/login.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        children: [],
    },
    {
        path: 'create',
        component: CreateAccountComponent,
        children: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthLoginRoutingModule {}

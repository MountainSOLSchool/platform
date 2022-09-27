import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';

export const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'create',
        component: LoginComponent,
        data: {
            create: true,
        },
    },
];

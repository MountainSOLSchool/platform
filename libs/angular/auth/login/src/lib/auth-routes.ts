import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';

export const authRoutes: Routes = [
    {
        path: 'create',
        component: LoginComponent,
        data: {
            create: true,
        },
    },
    {
        path: 'login',
        component: LoginComponent,
    },
];

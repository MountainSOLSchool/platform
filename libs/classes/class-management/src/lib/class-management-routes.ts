import { Route } from '@angular/router';
import { ClassFormComponent } from './components/class-form.component.ts/class-form.component';

export const classManagementRoutes: Route[] = [
    {
        path: 'edit/:id',
        pathMatch: 'full',
        component: ClassFormComponent,
    },
];

import { Route } from '@angular/router';
import { ClassFormComponent } from './components/class-form/class-form.component';
import { AdminClassListComponent } from './components/class-list/class-list.component';

export const classManagementRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: AdminClassListComponent,
    },
    {
        path: 'create',
        pathMatch: 'full',
        component: ClassFormComponent,
    },
    {
        path: 'edit/:id',
        pathMatch: 'full',
        component: ClassFormComponent,
    },
];

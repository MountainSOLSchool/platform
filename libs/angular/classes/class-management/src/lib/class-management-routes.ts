import { Route } from '@angular/router';
import { ClassFormComponent } from './components/class-form/class-form.component';
import { AdminClassListComponent } from './components/class-list/class-list.component';
import { InfoPanelEditorComponent } from './components/info-panel-editor/info-panel-editor.component';
import { ClassGroupListComponent } from './components/class-group-list/class-group-list.component';

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
    {
        path: 'info-panel/:semesterId',
        pathMatch: 'full',
        component: InfoPanelEditorComponent,
    },
    {
        path: 'groups',
        pathMatch: 'full',
        component: ClassGroupListComponent,
    },
];

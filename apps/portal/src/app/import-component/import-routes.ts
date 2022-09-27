import { Routes } from '@angular/router';
import { ImportComponent } from './import.component';

export const importRoutes: Routes = [
    {
        path: '',
        component: ImportComponent,
        children: [],
    },
];

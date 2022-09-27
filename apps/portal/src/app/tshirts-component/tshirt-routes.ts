import { Routes } from '@angular/router';
import { TshirtsComponent } from './tshirts.component';

export const tshirtRoutes: Routes = [
    {
        path: '',
        component: TshirtsComponent,
        children: [],
    },
];

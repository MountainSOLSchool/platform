import { Routes } from '@angular/router';

export const tshirtRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./tshirts.component').then((m) => m.TshirtsComponent),
        children: [],
    },
];

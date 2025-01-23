import { Route } from '@angular/router';

export const routes: Array<Route> = [
    {
        path: '',
        loadComponent: () =>
            import('./components/manage-class.component').then(
                (m) => m.ManageClassComponent
            ),
    },
];

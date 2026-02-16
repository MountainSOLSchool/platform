import { Route } from '@angular/router';
import { DiscountListComponent } from './components/discount-list.component';
import { DiscountFormComponent } from './components/discount-form.component';

export const discountRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: DiscountListComponent,
    },
    {
        path: 'create',
        pathMatch: 'full',
        component: DiscountFormComponent,
    },
    {
        path: 'edit/:id',
        pathMatch: 'full',
        component: DiscountFormComponent,
    },
];

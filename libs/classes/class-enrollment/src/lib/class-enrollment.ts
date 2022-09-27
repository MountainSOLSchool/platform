import { Route } from '@angular/router';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';

export const enrollmentRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: EnrollmentComponent },
];

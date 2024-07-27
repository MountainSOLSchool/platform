import { Route } from '@angular/router';
import { ClassEnrollmentComponent } from './components/enrollment-workflow/enrollment-workflow.component';
import { provideClassList } from '@sol/angular/classes/list';

export const enrollmentRoutes: Route[] = [
    {
        path: '',
        component: ClassEnrollmentComponent,
        providers: [provideClassList()],
        children: [{ path: '', redirectTo: 'classes', pathMatch: 'full' }],
    },
];

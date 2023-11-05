import { Route } from '@angular/router';
import { ClassEnrollmentComponent } from './components/enrollment-workflow/enrollment-workflow.component';
import { PendingChangesGuard } from './components/enrollment-workflow/pending-changes.guard';
import { provideClassList } from '@sol/angular/classes/list';

export const enrollmentRoutes: Route[] = [
    {
        path: '',
        canDeactivate: [PendingChangesGuard],
        component: ClassEnrollmentComponent,
        providers: [provideClassList()],
        children: [{ path: '', redirectTo: 'classes', pathMatch: 'full' }],
    },
];

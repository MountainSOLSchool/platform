import { Route } from '@angular/router';
import { ClassEnrollmentComponent } from './components/enrollment-workflow/enrollment-workflow.component';
import { PendingChangesGuard } from './components/enrollment-workflow/pending-changes.guard';
import { provideState } from '@ngrx/store';
import { classesFeature } from './store/classes.feature';
import { provideEffects } from '@ngrx/effects';
import { ClassesEffects } from './store/classes.effects';

export const enrollmentRoutes: Route[] = [
    {
        path: '',
        canDeactivate: [PendingChangesGuard],
        component: ClassEnrollmentComponent,
        providers: [
            provideState(classesFeature),
            provideEffects(ClassesEffects),
        ],
        children: [{ path: '', redirectTo: 'classes', pathMatch: 'full' }],
    },
];

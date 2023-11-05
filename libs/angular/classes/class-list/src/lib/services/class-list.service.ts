import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { classesActions } from '../store/classes.actions';
import {
    selectAvailableClassesAndGroups,
    selectClassesByIds,
    selectClassGroupsByIds,
} from '../store/classes.feature';

@Injectable({ providedIn: 'root' })
export class ClassListService {
    private readonly store = inject(Store);

    getAvailableEnrollmentClassesAndGroups() {
        this.store.dispatch(classesActions.loadAvailableEnrollmentStart());
        return this.store.select(selectAvailableClassesAndGroups);
    }

    getClassesByIds(ids: Array<string>) {
        if (ids.length === 0) return of([]);
        this.store.dispatch(classesActions.loadClassesStart({ ids }));
        return this.store.select(selectClassesByIds(ids));
    }

    getClassGroupsByIds(ids: Array<string>) {
        if (ids.length === 0) return of([]);
        this.store.dispatch(classesActions.loadClassGroupsStart({ ids }));
        return this.store.select(selectClassGroupsByIds(ids));
    }
}

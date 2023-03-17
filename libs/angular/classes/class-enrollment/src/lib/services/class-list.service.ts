import { inject, Injectable } from '@angular/core';
import { filter, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { classesActions } from '../store/classes.actions';
import {
    classesFeature,
    selectAvailableClassesAndGroups,
} from '../store/classes.feature';

@Injectable({ providedIn: 'root' })
export class ClassListService {
    private readonly store = inject(Store);

    getAvailableEnrollmentClassesAndGroups() {
        this.store.dispatch(classesActions.loadAvailableEnrollmentStart());
        return this.store
            .select(selectAvailableClassesAndGroups)
            .pipe(
                filter(
                    (
                        enrollment
                    ): enrollment is NonNullable<
                        ReturnType<typeof selectAvailableClassesAndGroups>
                    > => !!enrollment
                )
            );
    }

    getClassesByIds(ids: Array<string>) {
        if (ids.length === 0) return of([]);
        this.store.dispatch(classesActions.loadClassesStart({ ids }));
        return this.store.select(classesFeature.selectClasses).pipe(
            map((classes) =>
                ids.map((id) => ({ theClass: classes?.[id], id }))
            ),
            filter((classes) => classes.every(({ theClass }) => !!theClass)),
            map((classes) => classes.map((c) => c.theClass))
        );
    }

    getClassGroupsByIds(ids: Array<string>) {
        if (ids.length === 0) return of([]);
        this.store.dispatch(classesActions.loadClassGroupsStart({ ids }));
        return this.store.select(classesFeature.selectGroups).pipe(
            map((groups) => ids.map((id) => groups[id])),
            filter((groups) => groups.every((g) => !!g))
        );
    }
}

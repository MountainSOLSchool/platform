import { inject, Injectable } from '@angular/core';
import { filter, map } from 'rxjs';
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
        this.store.dispatch(classesActions.loadClassesStart({ ids }));
        return this.store.select(classesFeature.selectClasses).pipe(
            map((classes) => ids.map((id) => classes[id])),
            filter((classes) => classes.every((c) => !!c))
        );
    }

    getClassGroupsByIds(ids: Array<string>) {
        this.store.dispatch(classesActions.loadClassGroupsStart({ ids }));
        return this.store.select(classesFeature.selectGroups).pipe(
            map((groups) => ids.map((id) => groups[id])),
            filter((groups) => groups.every((c) => !!c))
        );
    }
}

import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { classesActions } from '../store/classes.actions';
import {
    selectAvailableClassesAndGroups,
    selectClassesByIds,
    selectClassGroupsByIds,
    selectCurrentSemesterClasses,
} from '../store/classes.feature';
import { Requested } from '@sol/angular/request';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';

@Injectable({ providedIn: 'root' })
export class ClassListService {
    private readonly store = inject(Store);

    getAvailableEnrollmentClassesAndGroups() {
        this.store.dispatch(classesActions.loadAvailableEnrollmentStart());
        return this.store.select(selectAvailableClassesAndGroups);
    }

    getClasses(classes: Array<{ id: string; semesterId: string }>) {
        if (classes.length === 0) return of([]);
        this.store.dispatch(
            classesActions.loadClassesStart({
                query: classes,
            })
        );
        return this.store.select(selectClassesByIds(classes.map((c) => c.id)));
    }

    getCurrentSemesterClasses() {
        this.store.dispatch(classesActions.loadCurrentSemesterClassesStart());
        return this.store.select(selectCurrentSemesterClasses);
    }

    getClassGroups(
        groups: Array<{
            id: string;
            semesterId: string;
        }>
    ) {
        if (groups.length === 0) return of([]);
        this.store.dispatch(
            classesActions.loadClassGroupsStart({ query: groups })
        );
        return this.store.select(
            selectClassGroupsByIds(groups.map((g) => g.id))
        );
    }

    private readonly functions = inject(FirebaseFunctionsService);

    getClassesBySemesterIds(semesterIds: Array<string>): Observable<
        Requested<{
            [semesterId: string]: {
                classes: SemesterClass[];
                groups: SemesterClassGroup[];
            };
        }>
    > {
        return this.functions.call('classesBySemester', semesterIds);
    }
}

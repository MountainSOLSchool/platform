import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, switchMap } from 'rxjs';
import { classesActions } from './classes.actions';
import { classesFeature, selectLoadedClasses } from './classes.feature';
import { ClassesApiService } from '../services/classes-api.service';

@Injectable({
    providedIn: 'root',
})
export class ClassesEffects {
    private readonly actions$ = inject(Actions);
    private readonly store = inject(Store);
    private readonly classesApi = inject(ClassesApiService);

    loadClasses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(classesActions.loadClassesStart),
            concatLatestFrom(() => this.store.select(selectLoadedClasses)),
            map(([action, classes]) =>
                action.ids.filter((id) => !classes?.[id])
            ),
            filter((idsOfClassesToLoad) => idsOfClassesToLoad.length > 0),
            mergeMap((idsOfClassesToLoad) => {
                return this.classesApi.getClassesByIds(idsOfClassesToLoad).pipe(
                    map((request) =>
                        classesActions.loadClassesRequestChanged({
                            ids: idsOfClassesToLoad,
                            classes: request,
                        })
                    )
                );
            })
        );
    });

    loadAvailableClasses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(classesActions.loadAvailableEnrollmentStart),
            switchMap(() => {
                return this.classesApi.getClassesAvailableForEnrollment().pipe(
                    map((request) => {
                        return classesActions.loadAvailableEnrollmentRequestChanged(
                            { request }
                        );
                    })
                );
            })
        );
    });

    loadClassGroups$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(classesActions.loadClassGroupsStart),
            concatLatestFrom(() =>
                this.store.select(classesFeature.selectGroups)
            ),
            map(([action, groups]) => action.ids.filter((id) => !groups[id])),
            filter((idsOfGroupsToLoad) => idsOfGroupsToLoad.length > 0),
            mergeMap((idsOfGroupsToLoad) => {
                return this.classesApi
                    .getCurrentSemesterClassGroups(idsOfGroupsToLoad)
                    .pipe(
                        map((request) => {
                            return classesActions.loadClassGroupsRequestChanged(
                                {
                                    ids: idsOfGroupsToLoad,
                                    groups: request,
                                }
                            );
                        })
                    );
            })
        );
    });
}

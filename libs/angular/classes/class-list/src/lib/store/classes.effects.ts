import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, switchMap } from 'rxjs';
import { classesActions } from './classes.actions';
import {
    classesFeature,
    selectCurrentSemesterClasses,
    selectLoadingAndLoadedClassIds,
} from './classes.feature';
import { ClassesApiService } from '../services/classes-api.service';
import { RequestedUtility } from '@sol/angular/request';

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
            concatLatestFrom(() =>
                this.store.select(selectLoadingAndLoadedClassIds)
            ),
            map(([action, classes]) => {
                return action.query.filter(({ id }) => !classes.includes(id));
            }),
            filter((classesToLoad) => classesToLoad.length > 0),
            mergeMap((classesToLoad) => {
                return this.classesApi.getClasses(classesToLoad).pipe(
                    map((classesBySemester) =>
                        classesActions.loadClassesRequestChanged({
                            query: classesToLoad,
                            classesBySemester,
                        })
                    )
                );
            })
        );
    });

    loadCurrentSemesterClasses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(classesActions.loadCurrentSemesterClassesStart),
            concatLatestFrom(() =>
                this.store.select(selectCurrentSemesterClasses)
            ),
            filter(([, currentSemesterClasses]) =>
                RequestedUtility.isEmpty(currentSemesterClasses)
            ),
            switchMap(() => {
                return this.classesApi.getCurrentSemesterClasses().pipe(
                    map((request) =>
                        classesActions.loadCurrentSemesterClassesRequestChanged(
                            {
                                classes: request,
                            }
                        )
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
            map(([action, groups]) => {
                return action.query.filter(({ id }) => !groups[id]);
            }),
            filter((groupsToLoad) => groupsToLoad.length > 0),
            mergeMap((groupsToLoad) => {
                return this.classesApi.getClassGroups(groupsToLoad).pipe(
                    map((request) => {
                        return classesActions.loadClassGroupsRequestChanged({
                            query: groupsToLoad,
                            groupsBySemester: request,
                        });
                    })
                );
            })
        );
    });
}

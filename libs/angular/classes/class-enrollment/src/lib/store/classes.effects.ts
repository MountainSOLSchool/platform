import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, switchMap } from 'rxjs';
import { classesActions } from './classes.actions';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { classesFeature } from './classes.feature';
import { RequestedOperatorsUtility } from '@sol/angular/request';

@Injectable({
    providedIn: 'root',
})
export class ClassesEffects {
    private readonly actions$ = inject(Actions);
    private readonly store = inject(Store);
    private readonly functionsApi = inject(FirebaseFunctionsService);

    loadClasses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(classesActions.loadClassesStart),
            concatLatestFrom(() =>
                this.store.select(classesFeature.selectClasses)
            ),
            map(([action, classes]) =>
                action.ids.filter((id) => !classes?.[id])
            ),
            filter((idsOfClassesToLoad) => idsOfClassesToLoad.length > 0),
            mergeMap((idsOfClassesToLoad) => {
                return this.functionsApi
                    .call<{
                        classes: Array<SemesterClass>;
                    }>('classes', { ids: idsOfClassesToLoad })
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        map(({ classes }) => {
                            return classesActions.loadClassesSuccess({
                                classes,
                            });
                        })
                    );
            })
        );
    });

    loadAvailableClasses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(classesActions.loadAvailableEnrollmentStart),
            switchMap(() => {
                return this.functionsApi
                    .call<{
                        classes: Array<SemesterClass>;
                        groups: Array<SemesterClassGroup>;
                    }>('availableEnrollmentClasses')
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        map((available) => {
                            return classesActions.loadAvailableEnrollmentSuccess(
                                available
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
                return this.functionsApi
                    .call<{
                        groups: Array<SemesterClassGroup>;
                    }>('classGroups', idsOfGroupsToLoad)
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        map(({ groups }) => {
                            return classesActions.loadClassGroupsSuccess({
                                groups,
                            });
                        })
                    );
            })
        );
    });
}

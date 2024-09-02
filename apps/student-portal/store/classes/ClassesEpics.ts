import { combineEpics, Epic, ofType } from 'redux-observable';
import { filter, of, switchMap, withLatestFrom } from 'rxjs';
import { map, catchError, startWith, mergeMap, tap } from 'rxjs/operators';
import { classesSlice, selectSemesters } from './ClassesStore';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { FirebaseFunctions } from '../../functions/firebase-functions';
import { RequestedUtility } from '@sol/react/request';

export const loadSemestersEpic: Epic = (action$, state$) =>
    action$.pipe(
        startWith(classesSlice.actions.ready()),
        ofType(classesSlice.actions.ready.type),
        withLatestFrom(state$.pipe(map(selectSemesters))),
        filter(([, semesters]) => RequestedUtility.isNotComplete(semesters)),
        switchMap(() => {
            return fromPromise(FirebaseFunctions.historicalSemesters()).pipe(
                map(({ semesters }) =>
                    classesSlice.actions.semestersLoadSucceeded(semesters)
                ),
                catchError((error) =>
                    of(classesSlice.actions.semestersLoadFailed(error))
                ),
                startWith(classesSlice.actions.semestersLoadStarted())
            );
        })
    );

export const loadStudentCompletedUnitIdsEpic: Epic = (action$) =>
    action$.pipe(
        ofType(unitsSlice.actions.setSelectedStudentId.type),
        switchMap(({ payload: studentId }) => {
            return fromPromise(
                FirebaseFunctions.getCompletedUnitIds(studentId)
            ).pipe(
                map((unitIds) =>
                    unitsSlice.actions.studentCompletedUnitIdsLoadSucceeded(
                        unitIds
                    )
                ),
                catchError((error) =>
                    of(
                        unitsSlice.actions.studentCompletedUnitIdsLoadFailed(
                            error
                        )
                    )
                ),
                startWith(
                    unitsSlice.actions.studentCompletedUnitIdsLoadStarted()
                )
            );
        })
    );

export const loadPathsAndUnitsEpic: Epic = (action$) =>
    action$.pipe(
        startWith(unitsSlice.actions.ready()),
        ofType(unitsSlice.actions.ready.type),
        switchMap(() => {
            return fromPromise(FirebaseFunctions.getFullUnitsAndPaths()).pipe(
                mergeMap((unitIds) => [
                    unitsSlice.actions.unitsLoadSucceeded(unitIds.units),
                    unitsSlice.actions.pathsLoadSucceeded(unitIds.paths),
                ]),
                catchError((error) =>
                    of(
                        unitsSlice.actions.studentCompletedUnitIdsLoadFailed(
                            error
                        ),
                        unitsSlice.actions.unitsLoadFailed(error)
                    )
                ),
                startWith(unitsSlice.actions.unitsLoadStarted())
            );
        })
    );

export const saveCompletedUnitsEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(unitsSlice.actions.saveChanges.type),
        withLatestFrom(
            state$.pipe(map(selectSelectedStudentId)),
            state$.pipe(map(selectCompletedAndChangedCompletedUnitIds))
        ),
        filter((args): args is [unknown, string, string[]] =>
            RequestedUtility.isLoaded(args[2])
        ),
        switchMap(([, studentId, completedUnitIds]) => {
            return fromPromise(
                FirebaseFunctions.updateCompletedUnits(
                    studentId,
                    completedUnitIds
                )
            ).pipe(
                // TODO: track success in state
                map(() => unitsSlice.actions.saveCompletedUnitsSucceeded()),
                // TODO: should use a toast
                tap(() => alert('Saved!')),
                catchError((error) => {
                    console.error('Error saving completed units', error);
                    return of(
                        unitsSlice.actions.saveCompletedUnitsFailed(error)
                    );
                })
            );
        })
    );

export const UnitsEpics = combineEpics(
    loadStudentsEpic,
    loadStudentCompletedUnitIdsEpic,
    loadPathsAndUnitsEpic,
    saveCompletedUnitsEpic
);

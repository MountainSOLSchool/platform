import { combineEpics, Epic, ofType } from 'redux-observable';
import {
    distinctUntilChanged,
    filter,
    of,
    switchMap,
    withLatestFrom,
} from 'rxjs';
import { map, catchError, startWith, mergeMap, tap } from 'rxjs/operators';
import {
    unitsSlice,
    selectAllStudents,
    selectSelectedStudentId,
    selectCompletedAndChangedCompletedUnitIds,
    selectSemesters,
    selectSelectedSemesterId,
} from './UnitsStore';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { FirebaseFunctions } from '../../functions/firebase-functions';
import { RequestedUtility } from '@sol/react/request';

export const loadSemestersEpic: Epic = (action$, state$) =>
    action$.pipe(
        startWith(unitsSlice.actions.ready()),
        ofType(unitsSlice.actions.ready.type),
        withLatestFrom(state$.pipe(map(selectSemesters))),
        filter(([, semesters]) => RequestedUtility.isNotComplete(semesters)),
        switchMap(() => {
            return fromPromise(FirebaseFunctions.getSemesters()).pipe(
                map((semesters) =>
                    unitsSlice.actions.semestersLoadSucceeded(
                        semesters.map(({ name, id }) => ({
                            displayName: name,
                            semesterId: id,
                        }))
                    )
                ),
                catchError((error) =>
                    of(unitsSlice.actions.semestersLoadFailed(error))
                ),
                startWith(unitsSlice.actions.semestersLoadStarted())
            );
        })
    );

export const loadClassesForSemesterEpic: Epic = (_, state$) =>
    state$.pipe(
        map(selectSelectedSemesterId),
        distinctUntilChanged(),
        filter((semesterId) => semesterId !== undefined),
        switchMap((semesterId) => {
            return fromPromise(
                FirebaseFunctions.getClassesForSemester(semesterId)
            ).pipe(
                map((classes) =>
                    unitsSlice.actions.classesLoadSucceeded(
                        classes.map(({ title, id, studentIds, unitIds }) => ({
                            displayName: title,
                            classId: id,
                            studentIds,
                            unitIds,
                        }))
                    )
                ),
                catchError((error) =>
                    of(unitsSlice.actions.classesLoadFailed(error))
                ),
                startWith(unitsSlice.actions.classesLoadStarted())
            );
        })
    );

export const loadStudentsEpic: Epic = (action$, state$) =>
    action$.pipe(
        startWith(unitsSlice.actions.ready()),
        ofType(unitsSlice.actions.ready.type),
        withLatestFrom(state$.pipe(map(selectAllStudents))),
        filter(([, students]) => RequestedUtility.isNotComplete(students)),
        switchMap(() => {
            return fromPromise(
                FirebaseFunctions.getAllStudents([
                    'first_name',
                    'last_name',
                    'id',
                ])
            ).pipe(
                map((students) =>
                    unitsSlice.actions.studentLoadSucceeded(students)
                ),
                catchError((error) =>
                    of(unitsSlice.actions.studentLoadFailed(error))
                ),
                startWith(unitsSlice.actions.studentLoadStarted())
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
    loadSemestersEpic,
    loadClassesForSemesterEpic,
    loadStudentsEpic,
    loadStudentCompletedUnitIdsEpic,
    loadPathsAndUnitsEpic,
    saveCompletedUnitsEpic
);

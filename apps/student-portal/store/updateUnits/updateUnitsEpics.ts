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
    updateUnitsSlice,
    selectAllStudents,
    selectSelectedStudentId,
    selectCompletedAndChangedCompletedUnitIds,
    selectSemesters,
    selectSelectedSemesterId,
    State,
    selectRepeatableCompletions,
} from './updateUnitsSlice';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { FirebaseFunctions } from '../../firebase/functions';
import { RequestedUtility } from '@sol/react/request';

export const loadSemestersEpic: Epic<
    unknown,
    unknown,
    { updateUnits: State }
> = (action$, state$) =>
    action$.pipe(
        startWith(updateUnitsSlice.actions.ready()),
        ofType(updateUnitsSlice.actions.ready.type),
        withLatestFrom(state$.pipe(map(selectSemesters))),
        filter(([, semesters]) => RequestedUtility.isNotComplete(semesters)),
        switchMap(() => {
            return fromPromise(FirebaseFunctions.getSemesters()).pipe(
                map((semesters) =>
                    updateUnitsSlice.actions.semestersLoadSucceeded(
                        semesters.map(({ name, id }) => ({
                            displayName: name,
                            semesterId: id,
                        }))
                    )
                ),
                catchError((error) =>
                    of(updateUnitsSlice.actions.semestersLoadFailed(error))
                ),
                startWith(updateUnitsSlice.actions.semestersLoadStarted())
            );
        })
    );

export const loadClassesForSemesterEpic: Epic<
    unknown,
    unknown,
    { updateUnits: State }
> = (_, state$) =>
    state$.pipe(
        map(selectSelectedSemesterId),
        distinctUntilChanged(),
        filter((semesterId) => semesterId !== undefined),
        switchMap((semesterId) => {
            return fromPromise(
                FirebaseFunctions.getClassesForSemester(semesterId)
            ).pipe(
                map((classes) =>
                    updateUnitsSlice.actions.classesLoadSucceeded(
                        classes.map(({ title, id, studentIds, unitIds }) => ({
                            displayName: title,
                            classId: id,
                            studentIds,
                            unitIds,
                        }))
                    )
                ),
                catchError((error) =>
                    of(updateUnitsSlice.actions.classesLoadFailed(error))
                ),
                startWith(updateUnitsSlice.actions.classesLoadStarted())
            );
        })
    );

export const loadStudentsEpic: Epic<
    unknown,
    unknown,
    { updateUnits: State }
> = (action$, state$) =>
    action$.pipe(
        startWith(updateUnitsSlice.actions.ready()),
        ofType(updateUnitsSlice.actions.ready.type),
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
                    updateUnitsSlice.actions.studentLoadSucceeded(students)
                ),
                catchError((error) =>
                    of(updateUnitsSlice.actions.studentLoadFailed(error))
                ),
                startWith(updateUnitsSlice.actions.studentLoadStarted())
            );
        })
    );

export const loadStudentCompletedUnitsEpic: Epic<
    unknown,
    unknown,
    { updateUnits: State }
> = (action$) =>
    action$.pipe(
        ofType(updateUnitsSlice.actions.setSelectedStudentId.type),
        switchMap(({ payload: studentId }) => {
            return fromPromise(
                FirebaseFunctions.getCompletedUnitIds(studentId)
            ).pipe(
                map(({ regularUnitIds, repeatableCompletions }) =>
                    updateUnitsSlice.actions.studentCompletedUnitsLoadSucceeded(
                        {
                            regularUnitIds,
                            repeatableCompletions,
                        }
                    )
                ),
                catchError((error) =>
                    of(
                        updateUnitsSlice.actions.studentCompletedUnitsLoadFailed(
                            error
                        )
                    )
                ),
                startWith(
                    updateUnitsSlice.actions.studentCompletedUnitsLoadStarted()
                )
            );
        })
    );

export const loadPathsAndUnitsEpic: Epic<
    unknown,
    unknown,
    { updateUnits: State }
> = (action$) =>
    action$.pipe(
        startWith(updateUnitsSlice.actions.ready()),
        ofType(updateUnitsSlice.actions.ready.type),
        switchMap(() => {
            return fromPromise(FirebaseFunctions.getFullUnitsAndPaths()).pipe(
                mergeMap((unitIds) => [
                    updateUnitsSlice.actions.unitsLoadSucceeded(unitIds.units),
                    updateUnitsSlice.actions.pathsLoadSucceeded(unitIds.paths),
                ]),
                catchError((error) =>
                    of(
                        updateUnitsSlice.actions.studentCompletedUnitsLoadFailed(
                            error
                        ),
                        updateUnitsSlice.actions.unitsLoadFailed(error)
                    )
                ),
                startWith(updateUnitsSlice.actions.unitsLoadStarted())
            );
        })
    );

export const saveCompletedUnitsEpic: Epic<
    unknown,
    unknown,
    { updateUnits: State }
> = (action$, state$) =>
    action$.pipe(
        ofType(updateUnitsSlice.actions.saveChanges.type),
        withLatestFrom(
            state$.pipe(map(selectSelectedStudentId)),
            state$.pipe(map(selectCompletedAndChangedCompletedUnitIds)),
            state$.pipe(map(selectRepeatableCompletions))
        ),
        filter((args): args is [never, string, string[], any] =>
            RequestedUtility.isLoaded(args[2])
        ),
        switchMap(([, studentId, completedUnitIds, repeatableCompletions]) => {
            return fromPromise(
                FirebaseFunctions.updateCompletedUnits(
                    studentId,
                    completedUnitIds,
                    repeatableCompletions
                )
            ).pipe(
                map(() =>
                    updateUnitsSlice.actions.saveCompletedUnitsSucceeded()
                ),
                tap(() => alert('Saved!')),
                catchError((error) => {
                    console.error('Error saving completed units', error);
                    return of(
                        updateUnitsSlice.actions.saveCompletedUnitsFailed(error)
                    );
                })
            );
        })
    );

export const UpdateUnitsEpics = combineEpics(
    loadSemestersEpic,
    loadClassesForSemesterEpic,
    loadStudentsEpic,
    loadStudentCompletedUnitsEpic,
    loadPathsAndUnitsEpic,
    saveCompletedUnitsEpic
);

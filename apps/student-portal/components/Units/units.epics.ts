import { Epic, ofType } from 'redux-observable';
import { filter, of, switchMap, withLatestFrom } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';
import { unitsSlice, selectStudents } from './units.slice';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { FirebaseFunctions } from '../../functions/firebase-functions';
import { RequestedUtility } from '@sol/react/request';

export const loadStudentsEpic: Epic = (action$, state$) =>
    action$.pipe(
        startWith(unitsSlice.actions.ready()),
        ofType(unitsSlice.actions.ready.type),
        withLatestFrom(state$.pipe(map(selectStudents))),
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
                )
            );
        })
    );

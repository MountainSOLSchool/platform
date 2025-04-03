import { from, switchMap } from 'rxjs';
import { Action } from 'redux';
import { Observable, map } from 'rxjs';

import { setStudentId, loadedStudentCompletedUnits } from './studentSlice';
import { FirebaseFunctions } from '../../firebase/functions';
import { ofType } from 'redux-observable';

export const loadStudent = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(setStudentId.type),
        switchMap(({ payload }: { payload: string; type: string }) =>
            from(FirebaseFunctions.getStudentCompletedUnits(payload)).pipe(
                map(({ name, completed_units }) => {
                    return loadedStudentCompletedUnits({
                        name,
                        completedUnits: completed_units,
                    });
                })
            )
        )
    );

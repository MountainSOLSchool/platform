import { filter, from, switchMap } from 'rxjs';
import { Action } from 'redux';
import { Observable, map } from 'rxjs';

import { setStudentId, loadedStudentCompletedUnits } from './studentStore';
import { FirebaseFunctions } from '../functions/firebase-functions';

export const loadStudent = (action$: Observable<Action>) =>
    action$.pipe(
        filter((action) => action.type === setStudentId.type),
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

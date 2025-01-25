import { filter, switchMap, from } from 'rxjs';
import { Action } from 'redux';
import { Observable, map } from 'rxjs';
import { db } from '../firebase/database';
import { doc, getDoc } from 'firebase/firestore';

import { setStudentId, loadedStudentCompletedUnits } from './studentStore';

export const loadStudent = (action$: Observable<Action>) =>
    action$.pipe(
        filter((action) => action.type === setStudentId.type),
        switchMap(({ payload }: { payload: string; type: string }) =>
            from(getDoc(doc(db, 'students', payload))).pipe(
                map((doc) => {
                    let units = doc
                        .data()
                        .completed_units.map((unit: { id: string }) => unit.id);
                    let name = doc.data().first_name;
                    return loadedStudentCompletedUnits({
                        name: name,
                        completedUnits: units,
                    });
                })
            )
        )
    );

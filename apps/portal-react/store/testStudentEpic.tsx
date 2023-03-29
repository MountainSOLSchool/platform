/* eslint-disable prettier/prettier */
import { filter, switchMap, from, tap } from 'rxjs';
import { Action } from 'redux';
import { Observable, map } from 'rxjs';
import { db } from '../firebase/database';
import { doc, getDoc } from 'firebase/firestore';

import { requestTestStudent, loadedTestStudent } from './testStudent';

export const loadTestStudent = (action$: Observable<Action>) => 
    action$.pipe(
        filter((action) => action.type === requestTestStudent.type),
        switchMap(() => 
            from(getDoc(doc(db, 'students', 'zWKUjbHAUOFJBKo38LYw')))
            .pipe(
                //tap((doc) => console.log( doc.data() )),
                map((doc)=> {
                    let units = doc.data().completed_units.map((unit: { id: string }) => unit.id);
                    let name = doc.data().first_name;
                    return loadedTestStudent( {
                        name: name,
                        completedUnits: units
                    } )
                })
            )
        )
    )

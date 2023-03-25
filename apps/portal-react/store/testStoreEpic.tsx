import { filter, mapTo, delay, switchMap, from, tap } from 'rxjs';
import { loadedFromBackend, trigger } from './testStore';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import { db } from '../firebase/database';
import { collection, getDoc, doc } from 'firebase/firestore';

export const load100 = (action$: Observable<Action>) =>
    action$.pipe(
        filter((action) => action.type === trigger.type),
        switchMap(() =>
            from(getDoc(doc(db, 'paths', 'IJ9LKndreKUve8D9LMXk'))).pipe(
                tap((doc) => console.log(doc.data())),
                mapTo(loadedFromBackend({ value: 100 }))
            )
        )
    );

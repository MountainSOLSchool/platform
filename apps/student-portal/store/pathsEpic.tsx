import { filter, switchMap, from } from 'rxjs';
import { loadedPaths, requestPaths } from './paths';
import { Action } from 'redux';
import { Observable, map } from 'rxjs';
import { db } from '../firebase/database';
import { collection, getDocs } from 'firebase/firestore';

export const loadPaths = (action$: Observable<Action>) =>
    action$.pipe(
        filter((action) => action.type === requestPaths.type),
        switchMap(() =>
            from(getDocs(collection(db, 'paths'))).pipe(
                map((collection) =>
                    loadedPaths(
                        collection['_snapshot'].docChanges.map((path) => {
                            const fields = path.doc.data.value.mapValue.fields;
                            const reqs = fields.requirements
                                ? fields.requirements.arrayValue.values.map(
                                      (e) =>
                                          e.referenceValue
                                              .match(/\w+$/i)
                                              .toString()
                                  )
                                : 'none';
                            return {
                                name: fields.name.stringValue,
                                units: reqs,
                            };
                        })
                    )
                )
            )
        )
    );

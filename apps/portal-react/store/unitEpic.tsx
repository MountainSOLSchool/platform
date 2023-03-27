/* eslint-disable prettier/prettier */
import { filter, switchMap, from, tap } from 'rxjs';
import { requestUnits, loadedUnits } from './unitStore';
import { Action } from 'redux';
import { Observable, map } from 'rxjs';
import { db } from '../firebase/database';
import { collection, getDocs } from 'firebase/firestore';

export const loadUnits = (action$: Observable<Action>) => 
    action$.pipe(
        filter((action) => action.type === requestUnits.type),
        switchMap(() =>
            from(getDocs(collection(db, 'units'))).pipe(
                //tap((collection) => console.log(collection)),
                map((collection) =>  loadedUnits(collection['_snapshot'].docChanges.map(unit => {
                    
                    const id = [...unit.doc.key.path.segments].pop()
                    const fields = unit.doc.data.value.mapValue.fields;

                    return ({
                        URL: id,
                        name: fields.name.stringValue,
                        category: fields.category.stringValue,
                        prereqs: fields.prereqs ? fields.prereqs.arrayValue.values.map(e => e.referenceValue.match(/\w+$/i).toString()) : "none",
                        description: fields.description.stringValue,
                    });
                })))
            )
        )
    );

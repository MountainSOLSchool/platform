// features/login/loginEpics.js
import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { setRequestState, submit } from './login.slice';
import { solAuthClient } from '@sol/ts/firebase/firebase-config';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

export const submitLoginEpic: Epic = (action$) =>
    action$.pipe(
        ofType(submit.type),
        mergeMap((action: ReturnType<typeof submit>) =>
            fromPromise(
                solAuthClient.signInWithEmailAndPassword(
                    action.payload.email,
                    action.payload.password
                )
            ).pipe(
                map(() => setRequestState('success')),
                catchError(() => of(setRequestState('failure')))
            )
        )
    );

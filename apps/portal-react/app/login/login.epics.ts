import { Epic, ofType } from 'redux-observable';
import { filter, of, switchMap, withLatestFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { solAuthClient } from '@sol/ts/firebase/firebase-config';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import {
    loginSlice,
    selectLoginForm,
    selectValidationErrors,
} from './login.slice';

export const submitLoginEpic: Epic = (action$, state$) =>
    action$.pipe(
        ofType(loginSlice.actions.logIn.type),
        withLatestFrom(
            state$.pipe(map(selectLoginForm)),
            state$.pipe(map(selectValidationErrors))
        ),
        filter(
            ([, , validationErrors]) =>
                !validationErrors.email || !validationErrors.password
        ),
        switchMap(([, loginForm]) =>
            fromPromise(
                solAuthClient.signInWithEmailAndPassword(
                    loginForm.email,
                    loginForm.password
                )
            ).pipe(
                map(() => loginSlice.actions.succeeded()),
                catchError(() => of(loginSlice.actions.failed()))
            )
        )
    );

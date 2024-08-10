import { Epic, ofType } from 'redux-observable';
import { filter, of, switchMap, withLatestFrom } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { getSolAuthClient } from '@sol/ts/firebase/firebase-config';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import {
    loginSlice,
    selectLoginForm,
    selectValidationErrors,
} from './login.slice';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const submitLoginEpic: (router: AppRouterInstance) => Epic =
    (router: AppRouterInstance) => (action$, state$) =>
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
            switchMap(([, loginForm]) => {
                const client = getSolAuthClient();
                return fromPromise(
                    client.signInWithEmailAndPassword(
                        loginForm.email,
                        loginForm.password
                    )
                ).pipe(
                    map(() => loginSlice.actions.succeeded()),
                    tap(() => router.push('/')),
                    catchError((error) => of(loginSlice.actions.failed(error)))
                );
            })
        );

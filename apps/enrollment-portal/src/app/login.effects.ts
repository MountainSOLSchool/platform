import { inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, pairwise, tap } from 'rxjs';
import { userLoginInitiated } from './login.actions';
import { UserService } from '@sol/auth/user';

const lastRouteBeforeUserPages = signal<string>('/');

const updateLastRouteBeforeUserPages = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(userLoginInitiated),
            tap((last) => lastRouteBeforeUserPages.set(last.currentRoute))
        );
    },
    { functional: true, dispatch: false }
);

const redirectWhenLoggedIn = createEffect(
    (router = inject(Router), user = inject(UserService).getUser()) => {
        return user
            .pipe(
                pairwise(),
                filter(
                    ([prevUser, currUser]) =>
                        prevUser === null && currUser !== null
                )
            )
            .pipe(
                filter(
                    () =>
                        window.location.pathname.endsWith('/user/login') ||
                        window.location.pathname.endsWith('/user/create')
                ),
                tap(() => router.navigateByUrl(lastRouteBeforeUserPages()))
            );
    },
    { functional: true, dispatch: false }
);

export const loginEffects = {
    updateLastRouteBeforeUserPages,
    redirectWhenLoggedIn,
};

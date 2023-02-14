import { Injectable, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { filter, Subject, tap, withLatestFrom } from 'rxjs';
import { userLoginInitiated } from './login.actions';

@Injectable({ providedIn: 'root' })
export class LoginEffect {
    constructor(
        private readonly router: Router,
        private readonly afAuth: AngularFireAuth,
        private readonly actions: Actions
    ) {}

    private readonly lastRouteBeforeUserPages$ = new Subject<string>();

    readonly updateLastRouteBeforeUserPages = createEffect(
        () => {
            return this.actions.pipe(
                ofType(userLoginInitiated),
                tap((last) =>
                    this.lastRouteBeforeUserPages$.next(last.currentRoute)
                )
            );
        },
        { dispatch: false }
    );

    readonly redirectWhenLoggedIn = createEffect(
        () => {
            return this.afAuth.user.pipe(
                withLatestFrom(this.lastRouteBeforeUserPages$),
                filter(([user]) => !!user),
                filter(
                    () =>
                        window.location.pathname === '/user/login' ||
                        window.location.pathname === '/user/create'
                ),
                tap(([, prevRoute]) =>
                    this.router.navigateByUrl(prevRoute ?? '/')
                )
            );
        },
        { dispatch: false }
    );
}

@NgModule({
    providers: [provideEffects(LoginEffect)],
})
export class LoginEffectModule {}

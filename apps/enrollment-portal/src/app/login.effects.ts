import { inject, Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { filter, Subject, tap, withLatestFrom } from 'rxjs';
import { userLoginInitiated } from './login.actions';
import { UserService } from '@sol/auth/user';

@Injectable({ providedIn: 'root' })
export class LoginEffect {
    private readonly router = inject(Router);
    private readonly user = inject(UserService).getUser();
    private readonly actions = inject(Actions);

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
            return this.user.pipe(
                withLatestFrom(this.lastRouteBeforeUserPages$),
                filter(([user]) => !!user),
                filter(
                    () =>
                        window.location.pathname.endsWith('/user/login') ||
                        window.location.pathname.endsWith('/user/create')
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

import { inject, Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { BehaviorSubject, combineLatest, filter, pairwise, tap } from 'rxjs';
import { userLoginInitiated } from './login.actions';
import { UserService } from '@sol/auth/user';

@Injectable({ providedIn: 'root' })
export class LoginEffect {
    private readonly router = inject(Router);
    private readonly user = inject(UserService).getUser();
    private readonly actions = inject(Actions);

    private readonly lastRouteBeforeUserPages$ = new BehaviorSubject<string>(
        '/'
    );

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
            return combineLatest([
                this.user.pipe(
                    pairwise(),
                    filter(
                        ([prevUser, currUser]) =>
                            prevUser === null && currUser !== null
                    )
                ),
                this.lastRouteBeforeUserPages$,
            ]).pipe(
                filter(() => {
                    return (
                        window.location.pathname.endsWith('/user/login') ||
                        window.location.pathname.endsWith('/user/create')
                    );
                }),
                tap(([, lastRouteBeforeUserPages]) => {
                    this.router.navigateByUrl(lastRouteBeforeUserPages);
                })
            );
        },
        { dispatch: false }
    );
}

@NgModule({
    providers: [provideEffects(LoginEffect)],
})
export class LoginEffectModule {}

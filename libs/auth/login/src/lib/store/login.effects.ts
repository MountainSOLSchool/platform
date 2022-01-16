import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginIntent, LoginSuccess } from './login.actions';
import { filter, map, switchMap, tap } from 'rxjs';
import { AuthService } from '@sol/firebase/auth';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class LoginEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    public login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LoginIntent),
            switchMap(({ email, password }) =>
                this.authService.login(email, password).pipe(
                    map(({ user }) => user),
                    filter((user) => !!user),
                    map(() => LoginSuccess())
                )
            ),
            tap(() => this.router.navigate(['/']))
        );
    });
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    CreateAccountIntent,
    LoginIntent,
    LoginSuccess,
} from './login.actions';
import { filter, map, switchMap, tap } from 'rxjs';
import { AuthService } from '@sol/firebase/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class LoginEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly messageService: MessageService
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
            tap(() => this.router.navigate(['/'])),
            tap(() =>
                this.messageService.add({
                    detail: 'Signed in!',
                    summary: 'Success',
                    severity: 'success',
                })
            )
        );
    });

    public createAccount$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CreateAccountIntent),
            switchMap(({ email, password }) =>
                this.authService.emailSignup(email, password).pipe(
                    map(({ user }) => user),
                    filter((user) => !!user),
                    map(() => LoginSuccess())
                )
            ),
            tap(() => this.router.navigate(['/'])),
            tap(() =>
                this.messageService.add({
                    detail: 'Created account!',
                    summary: 'Success',
                    severity: 'success',
                })
            )
        );
    });
}

import { Injectable, NgModule } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    CreateAccountIntent,
    LoginFailed,
    LoginIntent,
    LoginSuccess,
    ResetPasswordIntent,
} from './login.actions';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '@sol/firebase/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

@NgModule({
    imports: [MessageModule],
})
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

    resetPassword$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(ResetPasswordIntent),
                tap(({ email }) => this.authService.resetPassword(email)),
                tap(() =>
                    this.messageService.add({
                        detail: 'Sent reset email!',
                        severity: 'success',
                    })
                )
            );
        },
        { dispatch: false }
    );

    public login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LoginIntent),
            switchMap(({ email, password }) =>
                this.authService.login(email, password).pipe(
                    map(({ user }) => user),
                    filter((user) => !!user),
                    map(() => LoginSuccess()),
                    tap(() => this.router.navigate(['/'])),
                    tap(() =>
                        this.messageService.add({
                            detail: 'Signed in!',
                            summary: 'Success',
                            severity: 'success',
                        })
                    ),
                    catchError(() => {
                        this.messageService.add({
                            detail: 'Login failed',
                            severity: 'error',
                        });
                        return of(LoginFailed());
                    })
                )
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

import { computed, inject, Injectable, NgModule } from '@angular/core';
import {
    BehaviorSubject,
    combineLatest,
    filter,
    map,
    Observable,
    switchMap,
    tap,
} from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse, concatLatestFrom } from '@ngrx/operators';
import {
    FirebaseAuthService,
    FirebaseAuthModule,
} from '@sol/angular/auth/firebase';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { loginSuite } from './login.suite';
import { UserService } from '@sol/auth/user';

export type Login = { email: string; password: string };
export enum AccountCreationMethod {
    Email = 'email',
}
type LoginState = Login & {
    newAccountCreation: { method?: AccountCreationMethod } | undefined;
};

enum RequestState {
    Idle,
    Invalid,
    Pending,
    Success,
    Failure,
}

@NgModule({
    imports: [FirebaseAuthModule, FirebaseAuthService],
    providers: [LoginStore],
})
@Injectable({ providedIn: 'root' })
export class LoginStore extends ComponentStore<LoginState> {
    private readonly authService = inject(FirebaseAuthService);
    private readonly user$ = inject(UserService).getUser();
    private readonly router = inject(Router);
    private readonly messageService = inject(MessageService);

    constructor() {
        super({
            email: '',
            password: '',
            newAccountCreation: undefined,
        });
    }

    private readonly loginRequestState$ = new BehaviorSubject(
        RequestState.Idle
    );

    readonly resetPassword = this.effect((start$: Observable<void>) => {
        return start$.pipe(
            switchMap(() => this.user$),
            concatLatestFrom(() => this.state$),
            map(
                ([currentUserEmail, { email }]) =>
                    currentUserEmail?.email ?? email
            ),
            tap((email) => this.authService.resetPassword(email)),
            tap(() =>
                this.messageService.add({
                    detail: 'Sent reset email!',
                    severity: 'success',
                })
            )
        );
    });

    readonly submit = this.effect((start: Observable<void>) => {
        return start.pipe(
            concatLatestFrom(() => this.selectValidation()),
            filter(([, validation]) => {
                if (validation.hasErrors()) {
                    this.loginRequestState$.next(RequestState.Invalid);
                    return false;
                }
                return true;
            }),
            concatLatestFrom(() => this.state$),
            switchMap(([, { email, password, newAccountCreation }]) =>
                (newAccountCreation
                    ? this.authService.emailSignup(email, password)
                    : this.authService.login(email, password)
                ).pipe(
                    tapResponse(
                        () => {
                            // this.router.navigate(['/']);
                            this.messageService.add({
                                detail: newAccountCreation
                                    ? 'Created account!'
                                    : 'Logged in!',
                                summary: 'Success',
                                severity: 'success',
                            });
                            this.loginRequestState$.next(RequestState.Success);
                        },
                        (error: { code: string }) => {
                            this.messageService.add({
                                detail: `Failed to ${
                                    newAccountCreation
                                        ? 'create account'
                                        : 'log in'
                                }: ${error.code}`,
                                severity: 'error',
                            });
                            this.loginRequestState$.next(RequestState.Failure);
                        }
                    )
                )
            )
        );
    });

    selectIsLoggingIn(): Observable<boolean> {
        return this.loginRequestState$.pipe(
            map((state) => state === RequestState.Pending)
        );
    }

    selectIsCreatingNewAccount(): Observable<boolean> {
        return this.state$.pipe(map((state) => !!state.newAccountCreation));
    }

    selectIsReadyForPasswordReset(): Observable<boolean> {
        return combineLatest([
            this.loginRequestState$.pipe(
                map((state) => state === RequestState.Failure)
            ),
            this.state$.pipe(map(({ email }) => !!email)),
            this.state$.pipe(
                map(({ newAccountCreation }) => !!newAccountCreation)
            ),
        ]).pipe(
            map(
                ([hasFailed, hasEmail, isCreatingNewAccount]) =>
                    hasFailed && hasEmail && !isCreatingNewAccount
            )
        );
    }

    newAccountCreation = computed(() => this.state().newAccountCreation);

    newAccountCreationMethod = computed(
        () => this.newAccountCreation()?.method
    );

    private selectValidation() {
        return this.state$.pipe(
            map(({ email, password }) => {
                return loginSuite({ email, password });
            })
        );
    }

    selectErrors() {
        return combineLatest([
            this.selectValidation(),
            this.loginRequestState$,
        ]).pipe(
            map(([validation, requestState]) => {
                return requestState === RequestState.Invalid
                    ? validation.getErrors()
                    : {};
            })
        );
    }

    selectLoginModel() {
        return this.state$.pipe(
            map(({ email, password }) => ({ email, password }))
        );
    }
}

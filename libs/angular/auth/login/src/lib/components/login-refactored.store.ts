import { inject } from '@angular/core';
import {
    signalStore,
    withHooks,
    withMethods,
    withProps,
    withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FirebaseAuthService } from '@sol/angular/auth/firebase';
import { UserService } from '@sol/auth/user';
import { MessageService } from 'primeng/api';
import { map, pipe, switchMap, tap } from 'rxjs';

export type Login = { email: string; password: string };
export enum AccountCreationMethod {
    Email = 'email',
}
type LoginState = Login & {
    newAccountCreation: { method?: AccountCreationMethod } | undefined;
    requestState: RequestState;
};

enum RequestState {
    Idle,
    Invalid,
    Pending,
    Success,
    Failure,
}

const initialState: LoginState = {
    email: '',
    password: '',
    newAccountCreation: undefined,
    requestState: RequestState.Idle,
};

export const LoginStore = signalStore(
    withState(initialState),
    withProps(() => ({
        user$: inject(UserService).getUser(),
        authService: inject(FirebaseAuthService),
        messageService: inject(MessageService),
    })),
    withMethods((store) => ({
        resetPassword: rxMethod<void>(
            pipe(
                switchMap(() => store.user$),
                map(
                    (currentUserEmail) =>
                        currentUserEmail?.email ?? store.email()
                ),
                tap((email) => store.authService.resetPassword(email)),
                tap(() =>
                    store.messageService.add({
                        detail: 'Sent reset email!',
                        severity: 'success',
                    })
                )
            )
        ),
    })),
    withHooks()
);

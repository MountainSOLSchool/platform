import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
    LoginFailed,
    LoginIntent,
    ResetPasswordIntent,
} from '../store/login.actions';
import { Store } from '@ngrx/store';
import { BehaviorSubject, mapTo, startWith, take, tap } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div style="width: 400px; margin: auto">
            <p-messages [enableService]="false" severity="info">
                <ng-template pTemplate>
                    <div class="ml-2">
                        First time here?
                        <a routerLink="/user/create">Create an account.</a>
                    </div>
                </ng-template>
            </p-messages>
            <h2>Sign In</h2>
            <div class="p-fluid" [formGroup]="loginForm">
                <div class="field">
                    <label for="email">Email</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon"
                            ><i class="pi pi-user"></i
                        ></span>
                        <input
                            id="email"
                            type="text"
                            pInputText
                            formControlName="email"
                            placeholder="somebody@email.com"
                        />
                    </div>
                </div>
                <div class="field">
                    <label for="email">Password</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon"
                            ><i class="pi pi-lock"></i
                        ></span>
                        <input
                            type="password"
                            pInputText
                            formControlName="password"
                            (keydown)="passwordKeydown($event)"
                        />
                    </div>
                </div>
            </div>
            <p-button
                [loading]="(isLoggingIn$ | async) ?? false"
                (click)="loginClick()"
                label="Submit"
                class="w-full"
                icon="pi pi-user"
            ></p-button>
        </div>
        <div
            *ngIf="shouldShowResetSuggestion$ | async"
            style="width: 400px; margin: auto"
        >
            <p-messages [enableService]="false" severity="warn">
                <ng-template pTemplate>
                    <div class="ml-2">
                        Forgot your password?
                        <a href="javascript:void(0)" (click)="passwordReset()"
                            >Send a password reset email.</a
                        >
                    </div>
                </ng-template>
            </p-messages>
        </div>`,
})
export class LoginComponent {
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly store: Store,
        private readonly actions$: Actions
    ) {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: [''],
        });
    }

    isLoggingIn$ = new BehaviorSubject(false);

    public loginForm: FormGroup<{
        email: FormControl<string | null>;
        password: FormControl<string | null>;
    }>;

    shouldShowResetSuggestion$ = this.actions$.pipe(
        ofType(LoginFailed),
        tap(() => this.isLoggingIn$.next(false)),
        mapTo(true),
        startWith(false)
    );

    loginClick() {
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        if (email && password) {
            this.store.dispatch(
                LoginIntent({
                    email,
                    password,
                })
            );
            this.isLoggingIn$.next(true);
        }
    }

    passwordKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.loginClick();
        }
    }

    passwordReset() {
        const email = this.loginForm.value.email;
        if (email) {
            this.store.dispatch(ResetPasswordIntent({ email }));
        }
    }
}

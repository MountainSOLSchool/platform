import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginIntent } from '../store/login.actions';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

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
                    />
                </div>
            </div>
        </div>
        <p-button
            [loading]="(isLoggingIn$ | async) ?? false"
            (click)="loginClick()"
            label="Submit"
        ></p-button>
    </div>`,
})
export class LoginComponent {
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly store: Store
    ) {
        this.loginForm = this.formBuilder.group({
            email: [],
            password: [],
        });
    }

    isLoggingIn$ = new BehaviorSubject(false);

    public loginForm: FormGroup;

    loginClick() {
        this.store.dispatch(
            LoginIntent({
                email: this.loginForm?.value.email,
                password: this.loginForm?.value.password,
            })
        );
        this.isLoggingIn$.next(true);
    }
}

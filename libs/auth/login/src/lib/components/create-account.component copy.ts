import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CreateAccountIntent } from '../store/login.actions';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div style="width: 400px; margin: auto">
        <h2>Create Account</h2>
        <div class="p-fluid" [formGroup]="loginForm">
            <div class="field">
                <label for="email">Email</label>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon"
                        ><i class="pi pi-user"></i
                    ></span>
                    <input
                        id="email"
                        type="email"
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
            (click)="signUpClick()"
            label="Submit"
        ></p-button>
    </div>`,
})
export class CreateAccountComponent {
    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly store: Store
    ) {
        this.loginForm = this.formBuilder.group({
            email: [],
            password: [],
        });
    }

    isLoggingIn$ = new BehaviorSubject(false);

    public loginForm: UntypedFormGroup;

    signUpClick() {
        this.store.dispatch(
            CreateAccountIntent({
                email: this.loginForm?.value.email,
                password: this.loginForm?.value.password,
            })
        );
        this.isLoggingIn$.next(true);
    }
}

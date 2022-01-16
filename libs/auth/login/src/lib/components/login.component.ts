import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginIntent } from '../store/login.actions';
import { Store } from '@ngrx/store';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div class="p-fluid" [formGroup]="loginForm">
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
        <p-button (click)="loginClick()" label="Submit"></p-button>`,
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

    public loginForm: FormGroup;

    loginClick() {
        this.store.dispatch(
            LoginIntent({
                email: this.loginForm?.value.email,
                password: this.loginForm?.value.password,
            })
        );
    }
}

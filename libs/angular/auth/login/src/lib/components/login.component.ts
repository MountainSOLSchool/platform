import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnInit,
} from '@angular/core';
import { AccountCreationMethod, Login, LoginStore } from './login.store';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-login',
    imports: [
        AsyncPipe,
        LoginStore,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        RouterModule,
    ],
    templateUrl: './login.component.html',
    styles: [
        `
            .sol-login-card {
                width: 100%;
                max-width: 600px;
                margin: 2rem auto;
            }
            .sol-login-info {
                background-color: #f0f0f0;
                border-left: 6px solid lightgray;
                color: black;
                padding: 0.75rem 1rem;
                margin-bottom: 1rem;
                border-radius: 4px;
            }
            .sol-login-warn {
                background-color: #fff4e5;
                border-left: 6px solid #ffa726;
                color: #663c00;
                padding: 0.75rem 1rem;
                margin-top: 1rem;
                border-radius: 4px;
            }
            .sol-login-error {
                color: red;
                margin: 0.25rem 0 0;
            }
            .sol-login-form mat-form-field {
                width: 100%;
            }
            .sol-login-action {
                width: 100%;
                margin-top: 0.5rem;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    @Input() isCreatingNewAccount = false;
    @Input() standalone = false;

    readonly loginStore = inject(LoginStore);
    readonly route = inject(ActivatedRoute);

    readonly login$ = this.loginStore.selectLoginModel();

    readonly isLoggingIn$ = this.loginStore.selectIsLoggingIn();
    readonly shouldShowResetSuggestion$ =
        this.loginStore.selectIsReadyForPasswordReset();
    readonly isCreatingNewAccount$ =
        this.loginStore.selectIsCreatingNewAccount();
    readonly newAccountCreationMethod =
        this.loginStore.newAccountCreationMethod;
    readonly errors$ = this.loginStore.selectErrors();

    ngOnInit() {
        this.loginStore.setState({
            email: '',
            password: '',
            newAccountCreation:
                this.route.snapshot.data['create'] || this.isCreatingNewAccount
                    ? {}
                    : undefined,
        });
    }

    useSignIn(): void {
        this.loginStore.patchState({
            newAccountCreation: undefined,
        });
    }

    useCreation(): void {
        this.loginStore.patchState({
            newAccountCreation: {},
        });
    }

    onUpdated(login: Login): void {
        this.loginStore.patchState({ ...login });
    }

    onSubmit() {
        this.loginStore.submit();
    }

    onPasswordKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.loginStore.submit();
        }
    }

    onResetPassword() {
        this.loginStore.resetPassword();
    }

    createWithEmail() {
        this.loginStore.patchState({
            newAccountCreation: { method: AccountCreationMethod.Email },
        });
    }

    changeCreationMethod() {
        this.loginStore.patchState({
            newAccountCreation: {},
            email: '',
            password: '',
        });
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnInit,
} from '@angular/core';
import { AccountCreationMethod, Login, LoginStore } from './login.store';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AsyncPipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-login',
    imports: [
        AsyncPipe,
        LoginStore,
        FormsModule,
        ButtonModule,
        InputTextModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        RouterModule,
        CardModule,
    ],
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .p-message-boring {
                background-color: #f0f0f0;
                border: solid lightgray;
                border-width: 0 0 0 6px;
                color: black;
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

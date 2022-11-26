import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnInit,
} from '@angular/core';
import { Login, LoginStore } from './login.store';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
    standalone: true,
    selector: 'sol-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
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
    readonly errors$ = this.loginStore.selectErrors();

    ngOnInit() {
        this.loginStore.setState({
            email: '',
            password: '',
            isCreatingNewAccount:
                this.route.snapshot.data['create'] || this.isCreatingNewAccount,
        });
    }

    useSignIn(): void {
        this.loginStore.patchState({
            isCreatingNewAccount: false,
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
}

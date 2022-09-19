import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { map } from 'rxjs';
import { mutable } from '@rex/mutable';
import { LoginStore } from './login.store';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    standalone: true,
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
    ],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    readonly loginStore = inject(LoginStore);
    readonly route = inject(ActivatedRoute);

    readonly login$ = this.loginStore.state$.pipe(
        map((login) =>
            mutable(login, {
                onChange: (prop, updated) =>
                    this.loginStore.patchState({ [prop]: updated }),
            })
        )
    );

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
            isCreatingNewAccount: this.route.snapshot.data['create'],
        });
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

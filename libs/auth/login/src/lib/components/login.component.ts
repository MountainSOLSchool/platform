import {
    ChangeDetectionStrategy,
    Component,
    inject,
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
import { PasswordModule } from 'primeng/password';
import { ActivatedRoute, RouterModule } from '@angular/router';
import * as braintree from 'braintree-web';
import * as btDropin from 'braintree-web-drop-in';
import { HttpClient } from '@angular/common/http';

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
        PasswordModule,
    ],
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    readonly loginStore = inject(LoginStore);
    readonly route = inject(ActivatedRoute);
    readonly http = inject(HttpClient);

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
            isCreatingNewAccount: this.route.snapshot.data['create'],
        });
        this.http
            .get<{ data: string }>(
                'http://localhost:5001/mountain-sol-platform/us-central1/paymentToken'
            )
            .subscribe(({ data: token }) => {
                console.log(token);
                braintree.client.create(
                    {
                        authorization: token,
                    },
                    (err, instance) => {
                        braintree.dataCollector.create(
                            {
                                client: instance,
                                kount: true,
                            },
                            (err, collector) => {
                                // At this point, you should access the dataCollectorInstance.deviceData value and provide it
                                // to your server, e.g. by injecting it into your form as a hidden input.
                                // TODO dispatch action
                                const deviceData = collector?.deviceData;
                            }
                        );
                    }
                );
                btDropin.create(
                    {
                        authorization: token,
                        container: '#dropin-container',
                        dataCollector: {
                            kount: true,
                        },
                    },
                    function (err, instance) {
                        if (err) {
                            // Handle any errors that might've occurred when creating Drop-in
                            console.error(err);
                            return;
                        }
                        // instance?.requestPaymentMethod((err, payload) => {
                        //     payload?.nonce;
                        // });
                    }
                );
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

import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { LoginMode } from './login-view-model';

export default function LoginView(props: {
    viewModel: {
        header: string;
        mode: LoginMode;
        email: string;
        isSubmitInProgress: boolean;
        shouldShowResetSuggestion: boolean;
        errors: {
            email: string;
            password: string;
        };
    };
    onEmailChange: (email: string) => void;
    onPasswordChange: (email: string) => void;
    onModeChange: (mode: LoginMode) => void;
    onForgotPassword: () => void;
    onLogin: () => void;
}) {
    const header = props.viewModel.header;
    const footer = (
        <span>
            <Button
                label="Submit"
                loading={props.viewModel.isSubmitInProgress}
                icon="pi pi-check"
                onClick={() => props.onLogin()}
            />
            {props.viewModel.shouldShowResetSuggestion && (
                <a href="#" onClick={() => props.onForgotPassword()}>
                    Forgot password?
                </a>
            )}
        </span>
    );

    return (
        <div>
            <Card title={header} style={{ width: '25em' }} footer={footer}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText
                            id="email"
                            type="text"
                            value={props.viewModel.email}
                            onChange={(e) =>
                                props.onEmailChange(e.target.value)
                            }
                            placeholder="Your email"
                        />
                        {props.viewModel.errors.email && (
                            <small className="p-error">
                                {props.viewModel.errors.email}
                            </small>
                        )}
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Password</label>
                        <InputText
                            id="password"
                            type="password"
                            onChange={(e) =>
                                props.onPasswordChange(e.target.value)
                            }
                            placeholder="Your password"
                            onKeyDown={(e) =>
                                e.key === 'Enter' && props.onLogin()
                            }
                        />
                        {props.viewModel.errors.password && (
                            <small className="p-error">
                                {props.viewModel.errors.password}
                            </small>
                        )}
                    </div>
                    <div className="p-field">
                        {props.viewModel.mode === LoginMode.SIGN_UP ? (
                            <a
                                href="#"
                                onClick={() =>
                                    props.onModeChange(LoginMode.SIGN_IN)
                                }
                            >
                                Already have an account? Sign in.
                            </a>
                        ) : (
                            <a
                                href="#"
                                onClick={() =>
                                    props.onModeChange(LoginMode.SIGN_UP)
                                }
                            >
                                First time? Create an account.
                            </a>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}

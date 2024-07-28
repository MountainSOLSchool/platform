'use client';
import React from 'react';
import LoginView from './login-view';
import { useLoginStore } from './useLoginStore';

export default function Login() {
    const loginStore = useLoginStore();

    return (
        <LoginView
            viewModel={loginStore.viewModel}
            onEmailChange={(email) => loginStore.setEmail(email)}
            onPasswordChange={(password) => loginStore.setPassword(password)}
            onModeChange={(mode) => loginStore.setMode(mode)}
            onForgotPassword={() => loginStore.sendPasswordResetEmail()}
            onLogin={() => loginStore.login()}
        ></LoginView>
    );
}

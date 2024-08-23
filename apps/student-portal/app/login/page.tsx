'use client';
import LoginView from './login-view';
import { useLoginStore } from './useLoginStore';
import { submitLoginEpic } from './login.epics';
import { useRouter } from 'next/navigation';
import { useEpic } from '@sharakai/use-redux-observable-epic';

export default function LoginWithRegisteredEpics() {
    useEpic(submitLoginEpic(useRouter()));

    return <Login />;
}

function Login() {
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

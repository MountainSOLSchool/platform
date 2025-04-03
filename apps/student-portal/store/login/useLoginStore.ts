import { useDispatch, useSelector } from 'react-redux';
import LoginView from '../../app/login/login-view';
import { loginSlice, selectLoginViewModel } from './loginSlice';
import { LoginMode } from '../../app/login/login-view-model';

export function useLoginStore(): {
    viewModel: Parameters<typeof LoginView>[0]['viewModel'];
    login: () => void;
    sendPasswordResetEmail: () => void;
    setEmail: (email: string) => void;
    setPassword: (email: string) => void;
    setMode: (mode: LoginMode) => void;
} {
    const viewModel = useSelector(selectLoginViewModel);
    const dispatch = useDispatch();

    return {
        viewModel,
        login: () => dispatch(loginSlice.actions.logIn()),
        sendPasswordResetEmail: () =>
            dispatch(loginSlice.actions.sendPasswordResetEmail()),
        setEmail: (email) => dispatch(loginSlice.actions.setEmail(email)),
        setPassword: (password) =>
            dispatch(loginSlice.actions.setPassword(password)),
        setMode: (mode) => dispatch(loginSlice.actions.setMode(mode)),
    };
}

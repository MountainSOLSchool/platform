import { createSelector, createSlice } from '@reduxjs/toolkit';
import { LoginMode, LoginViewModel } from './login-view-model';
import { create, enforce, skipWhen, test } from 'vest';
import { Requested, RequestState } from '@sol/react/request';

const getSuite = () =>
    create(
        'login',
        (login: {
            email: string;
            password: string;
            hasTriedToLogInOnce: boolean;
        }) => {
            skipWhen(
                () => !login.hasTriedToLogInOnce,
                () => {
                    test('email', 'Please enter an email', () => {
                        enforce(login.email).isNotEmpty();
                    });
                    test('password', 'Please enter a password', () => {
                        enforce(login.password).isNotEmpty();
                    });
                }
            );
        }
    );

export type State = {
    email: string;
    password: string;
    mode: LoginMode;
    requestState: Requested<void>;
};

const initialState: State = {
    email: '',
    password: '',
    mode: LoginMode.SIGN_IN,
    requestState: RequestState.Empty,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action: { payload: string }) => {
            state.email = action.payload;
        },
        setPassword: (state, action: { payload: string }) => {
            state.password = action.payload;
        },
        setMode: (state, action: { payload: LoginMode }) => {
            state.mode = action.payload;
        },
        setRequestState: (state, action) => {
            state.requestState = action.payload;
        },
        succeeded: (state) => {
            state.requestState = undefined;
        },
        failed: (state, error: unknown) => {
            state.requestState = RequestState.Error;
        },
        logIn: (state) => {
            state.requestState = RequestState.Loading;
        },
        sendPasswordResetEmail: (state) => state,
    },
});

export default loginSlice.reducer;

const selectState = (state: { login: State }) => state.login;

const selectRequestState = createSelector(
    [selectState],
    (state) => state.requestState
);

export const selectIsSubmitInProgress = createSelector(
    [selectRequestState],
    (requestState) => requestState === RequestState.Loading
);

const selectEmail = createSelector([selectState], (state) => state.email);

const selectPassword = createSelector([selectState], (state) => state.password);

const selectMode = createSelector([selectState], (state) => state.mode);

const selectHasTriedToLogInOnce = createSelector(
    [selectRequestState],
    (requestState) => requestState !== RequestState.Empty
);

export const selectValidationErrors = createSelector(
    [selectEmail, selectPassword, selectHasTriedToLogInOnce],
    (email, password, hasTriedToLogInOnce) => {
        const suite = getSuite();
        const result = suite({
            email,
            password,
            hasTriedToLogInOnce,
        });
        const errors = result.getErrors();
        return {
            email: errors?.email?.[0] ?? '',
            password: errors?.password?.[0] ?? '',
        };
    }
);

export const selectLoginForm = createSelector(
    [selectEmail, selectPassword],
    (email, password) => ({ email, password })
);

export const selectLoginViewModel = createSelector(
    [selectMode, selectEmail, selectIsSubmitInProgress, selectValidationErrors],
    (mode, email, isSubmitInProgress, errors): LoginViewModel => {
        return {
            header: '',
            mode,
            email,
            isSubmitInProgress,
            shouldShowResetSuggestion: false,
            errors,
        };
    }
);

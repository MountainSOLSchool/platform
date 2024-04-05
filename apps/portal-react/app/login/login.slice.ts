// features/login/loginSlice.js
import { createSelector, createSlice } from '@reduxjs/toolkit';

enum AuthMode {
    LOGIN,
    SIGN_UP,
}

const initialState = {
    email: '',
    password: '',
    mode: AuthMode.LOGIN,
    requestState: 'idle', // 'idle', 'invalid', 'pending', 'success', 'failure'
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setIsCreatingNewAccount: (state, action) => {
            state.isCreatingNewAccount = action.payload;
        },
        setRequestState: (state, action) => {
            state.requestState = action.payload;
        },
        reset: () => initialState,
        submit: (
            state,
            action: { payload: { email: string; password: string } }
        ) => state,
    },
});

export const {
    setEmail,
    setPassword,
    setIsCreatingNewAccount,
    setRequestState,
    reset,
    submit,
} = loginSlice.actions;

export default loginSlice.reducer;

const selectState = (state: typeof initialState) => state;

const selectRequestState = createSelector(
    [selectState],
    (state) => state.requestState
);

export const selectIsLoggingIn = createSelector(
    [selectRequestState],
    (requestState) => requestState === 'pending'
);

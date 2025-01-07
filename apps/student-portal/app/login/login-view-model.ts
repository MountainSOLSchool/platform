export enum LoginMode {
    SIGN_IN,
    SIGN_UP,
}

export interface LoginViewModel {
    header: string;
    mode: LoginMode;
    email: string;
    isSubmitInProgress: boolean;
    shouldShowResetSuggestion: boolean;
    errors: {
        email: string;
        password: string;
    };
}

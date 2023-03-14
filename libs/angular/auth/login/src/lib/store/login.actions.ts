import { createAction, props } from '@ngrx/store';

export const VisitLoginIntent = createAction(
    '[Go to Login Button] Visit Login Intent'
);

export const LoginIntent = createAction(
    '[Login Service] Login Intent',
    props<{ email: string; password: string }>()
);

export const ResetPasswordIntent = createAction(
    '[Login Service] Reset password intent',
    props<{ email: string }>()
);

export const LoginFailed = createAction('[Login Service] Login failed');

export const CreateAccountIntent = createAction(
    '[Login Service] Create Account Intent',
    props<{ email: string; password: string }>()
);

export const LoginSuccess = createAction('[Login Effects] Login Success');

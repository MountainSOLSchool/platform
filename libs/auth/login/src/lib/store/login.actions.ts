import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const VisitLoginIntent = createAction(
    '[Go to Login Button] Visit Login Intent'
);

export const LoginIntent = createAction(
    '[Login Service] Login Intent',
    props<{ email: string; password: string }>()
);

export const CreateAccountIntent = createAction(
    '[Login Service] Create Account Intent',
    props<{ email: string; password: string }>()
);

export const LoginSuccess = createAction('[Login Effects] Login Success');

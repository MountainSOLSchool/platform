import { createAction } from '@ngrx/store';

export const userLoginInitiated = createAction(
    '[User Login] User Login Initiated',
    (currentRoute: string) => ({ currentRoute })
);

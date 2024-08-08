import { createActionGroup, props } from '@ngrx/store';
import { Requested } from '../models/requested.type';

export const requestActions = createActionGroup({
    source: 'Request Service',
    events: {
        Changed: props<{ uid: string; requested: Requested<unknown> }>(),
    },
});

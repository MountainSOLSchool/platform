import { createActionGroup, props } from '@ngrx/store';

export const reportComponentActions = createActionGroup({
    source: 'Report component',
    events: {
        'Download forms intent': props<{ className: string }>(),
        'Copy emails intent': props<{ className: string }>(),
    },
});

export const reportEffectsActions = createActionGroup({
    source: 'Report effects',
    events: {
        'Started downloading forms': props<{ className: string }>(),
        'Finished downloading forms': props<{ className: string }>(),
        'Failed downloading forms': props<{ className: string }>(),
        'Started downloading class emails': props<{ className: string }>(),
        'Finished downloading class emails': props<{ className: string }>(),
        'Failed downloading class emails': props<{ className: string }>(),
    },
});

import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { requestActions } from './request.actions';
import { RequestState, Requested } from '../models/requested.type';

type Feature = {
    [uid: string]: Requested<unknown>;
};

const initialState: Feature = {};

export const requestFeature = createFeature({
    name: 'requestFeature',
    reducer: createReducer(
        initialState,
        on(requestActions.changed, (state, { uid, requested }): Feature => {
            return {
                ...state,
                [uid]: requested,
            };
        })
    ),
});

export const selectRequest = createSelector(
    (uid: string) => uid,
    (uid) =>
        createSelector(
            requestFeature.selectRequestFeatureState,
            (state) => state[uid] ?? RequestState.Empty
        )
);

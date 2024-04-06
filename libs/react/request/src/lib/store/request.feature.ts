import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RequestState, Requested } from '../models/requested.type';

type Slice = {
    [uid: string]: Requested<unknown>;
};

const initialState: Slice = {};

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        changed(
            state,
            action: { payload: { uid: string; requested: Requested<unknown> } }
        ) {
            const { uid, requested } = action.payload;
            state[uid] = requested;
        },
    },
});

export const { changed } = requestsSlice.actions;
export default requestsSlice.reducer;

const selectSlice = (state: object) => (state as { requests: Slice }).requests;

export const selectRequest = createSelector([(uid: string) => uid], (uid) =>
    createSelector(selectSlice, (state) => state[uid] ?? RequestState.Empty)
);

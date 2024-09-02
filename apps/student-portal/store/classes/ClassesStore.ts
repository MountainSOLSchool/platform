import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Requested, RequestState } from '@sol/react/request';

type State = {
    semesters: Requested<
        Array<{
            id: string;
            name: string;
        }>
    >;
    classesBySemesterId: Record<
        string,
        Requested<
            Array<{
                id: string;
                name: string;
            }>
        >
    >;
};

const initialState: State = {
    semesters: RequestState.Empty,
    classesBySemesterId: {},
};

export const classesSlice = createSlice({
    name: 'classesSlice',
    initialState,
    reducers: {
        ready: (state) => {
            // Purposefully empty
        },
        semestersLoadStarted: (state) => {
            state.semesters = RequestState.Loading;
        },
        semestersLoadSucceeded: (
            state,
            action: {
                payload: Array<{
                    id: string;
                    name: string;
                }>;
            }
        ) => {
            state.semesters = action.payload;
        },
        semestersLoadFailed: (state) => {
            state.semesters = RequestState.Error;
        },
        readyForSemesterClasses: (state, action: { payload: string }) => {
            state.classesBySemesterId[action.payload] = RequestState.Empty;
        },
        classesLoadStarted: (
            state,
            action: { payload: { semesterId: string } }
        ) => {
            state.classes = RequestState.Loading;
        },
        classesLoadSucceeded: (
            state,
            action: {
                payload: Array<{
                    id: string;
                    name: string;
                }>;
            }
        ) => {
            state.classes = action.payload;
        },
        classesLoadFailed: (state) => {
            state.classes = RequestState.Error;
        },
    },
});

export default classesSlice.reducer;

const selectState = (state: { classesSlice: State }) => state.classesSlice;

export const selectSemesters = createSelector(
    [selectState],
    (state) => state.semesters
);

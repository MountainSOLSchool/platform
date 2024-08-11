import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Requested, RequestState } from '@sol/react/request';
import { UnitsViewModel } from './units-view-model';

type State = {
    students: Requested<
        Array<{ first_name: string; last_name: string; id: string }>
    >;
};

const initialState: State = {
    students: RequestState.Empty,
};

export const unitsSlice = createSlice({
    name: 'updateUnits',
    initialState,
    reducers: {
        studentLoadSucceeded: (
            state,
            action: {
                payload: Array<{
                    first_name: string;
                    last_name: string;
                    id: string;
                }>;
            }
        ) => {
            state.students = action.payload;
        },
        studentLoadFailed: (state) => {
            state.students = RequestState.Error;
        },
        ready: (state) => {
            state.students = RequestState.Loading;
        },
    },
});

export default unitsSlice.reducer;

const selectState = (state: { updateUnits: State }) => state.updateUnits;

export const selectStudents = createSelector(
    [selectState],
    (state) => state.students
);

export const selectIsStudentLoadingInProgress = createSelector(
    [selectStudents],
    (requestState) => requestState === RequestState.Loading
);

export const selectUnitsViewModel = createSelector(
    [selectStudents],
    (students): UnitsViewModel => {
        return {
            students,
        };
    }
);

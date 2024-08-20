import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Requested, RequestedUtility, RequestState } from '@sol/react/request';
import { UpdateStudentUnitsProps } from './UpdateStudentUnits';
import { UnitDbEntry } from '@sol/classes/domain';

type State = {
    students: Requested<
        Array<{ first_name: string; last_name: string; id: string }>
    >;
    selectedStudentId: string | undefined;
    selectedStudentCompletedUnitIds: Requested<Array<string>>;
    paths: Requested<
        Array<{
            id: string;
            name: string;
            description: string;
            unitIds: Array<string>;
        }>
    >;
    units: Requested<Record<string, UnitDbEntry>>;
    changedUnitCompletions: Record<string, boolean>;
};

const initialState: State = {
    students: RequestState.Empty,
    selectedStudentId: undefined,
    selectedStudentCompletedUnitIds: RequestState.Empty,
    units: RequestState.Empty,
    paths: RequestState.Empty,
    changedUnitCompletions: {},
};

export const unitsSlice = createSlice({
    name: 'updateUnits',
    initialState,
    reducers: {
        // TODO: should track loading states of these requests, too
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
        studentCompletedUnitIdsLoadSucceeded: (
            state,
            action: { payload: Array<string> }
        ) => {
            state.selectedStudentCompletedUnitIds = action.payload;
        },
        unitsLoadSucceeded: (
            state,
            action: {
                payload: Record<string, UnitDbEntry>;
            }
        ) => {
            state.units = action.payload;
        },
        pathsLoadSucceeded: (
            state,
            action: {
                // TODO: make this a re-usable type for a "frontend path model"
                payload: Array<{
                    id: string;
                    name: string;
                    description: string;
                    unitIds: Array<string>;
                }>;
            }
        ) => {
            state.paths = action.payload;
        },
        studentLoadFailed: (state) => {
            state.students = RequestState.Error;
        },
        studentCompletedUnitIdsLoadFailed: (state) => {
            state.selectedStudentCompletedUnitIds = RequestState.Error;
        },
        unitsLoadFailed: (state) => {
            state.units = RequestState.Error;
        },
        pathsLoadFailed: (state) => {
            state.paths = RequestState.Error;
        },
        setSelectedStudentId: (state, action: { payload: string }) => {
            state.selectedStudentId = action.payload;
            state.selectedStudentCompletedUnitIds = RequestState.Loading;
        },
        setUnitCompletion: (
            state,
            action: { payload: { unitId: string; isCompleted: boolean } }
        ) => {
            state.changedUnitCompletions[action.payload.unitId] =
                action.payload.isCompleted;
        },
        ready: (state) => {
            state.students = RequestState.Loading;
            state.units = RequestState.Loading;
        },
        saveChanges: (state) => {
            // TODO: track the request state
        },
        saveCompletedUnitsSucceeded: (state) => {
            // TODO: track the request state
        },
        saveCompletedUnitsFailed: (state) => {
            // TODO: track the request state
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

export const selectSelectedStudentId = createSelector(
    [selectState],
    (state) => state.selectedStudentId
);

export const selectSelectedStudentCompletedUnitIds = createSelector(
    [selectState],
    (state) => state.selectedStudentCompletedUnitIds
);

export const selectChangedUnitCompletions = createSelector(
    [selectState],
    (state) => state.changedUnitCompletions
);

export const selectCompletedAndChangedCompletedUnitIds = createSelector(
    [selectSelectedStudentCompletedUnitIds, selectChangedUnitCompletions],
    (completedUnitIds, changedCompletedUnitIds) => {
        const hasLoadedCompletedUnitIds =
            RequestedUtility.isLoaded(completedUnitIds);
        const addedCompletedUnitIds = hasLoadedCompletedUnitIds
            ? Object.entries(changedCompletedUnitIds)
                  .filter(
                      ([unitId, isCompleted]) =>
                          isCompleted && !completedUnitIds.includes(unitId)
                  )
                  .map(([unitId]) => unitId)
            : new Array<string>();
        const uncompletedUnitIds = hasLoadedCompletedUnitIds
            ? completedUnitIds.filter(
                  (unitId) => changedCompletedUnitIds[unitId] === false
              )
            : [];
        const updatedCompletedUnitIds = hasLoadedCompletedUnitIds
            ? completedUnitIds.filter(
                  (unitId) => !uncompletedUnitIds.includes(unitId)
              )
            : [];
        return Array.from(
            new Set([...updatedCompletedUnitIds, ...addedCompletedUnitIds])
        );
    }
);

export const selectIsStudentCompletedUnitIdsLoadingInProgress = createSelector(
    [selectSelectedStudentCompletedUnitIds],
    (requestState) => requestState === RequestState.Loading
);

export const selectUnits = createSelector(
    [selectState],
    (state) => state.units
);

export const selectPaths = createSelector(
    [selectState],
    (state) => state.paths
);

export const selectIsUnitsLoadingInProgress = createSelector(
    [selectUnits],
    (requestState) => requestState === RequestState.Loading
);

export const selectUpdateStudentUnitsProps = createSelector(
    [
        selectStudents,
        selectSelectedStudentId,
        selectCompletedAndChangedCompletedUnitIds,
        selectUnits,
        selectPaths,
    ],
    (
        students,
        selectedStudentId,
        completedUnitIds,
        units,
        paths
    ): UpdateStudentUnitsProps => {
        return {
            students,
            selectedStudentId,
            completedUnitIds,
            units: RequestedUtility.isLoaded(units) ? units : {},
            paths: RequestedUtility.isLoaded(paths) ? paths : [],
        };
    }
);

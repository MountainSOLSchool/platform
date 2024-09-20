import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Requested, RequestedUtility, RequestState } from '@sol/react/request';
import { UpdateStudentUnitsViewProps } from './UpdateStudentUnitsView';
import { UnitDbEntry } from '@sol/classes/domain';
import { Path } from '../../models/path.type';

type State = {
    students: Requested<
        Array<{ first_name: string; last_name: string; id: string }>
    >;
    semesters: Requested<Array<{ displayName: string; semesterId: string }>>;
    classes: Requested<Array<{ displayName: string; classId: string }>>;
    selectedSemesterId: string | undefined;
    selectedClassId: string | undefined;
    selectedStudentId: string | undefined;
    selectedStudentCompletedUnitIds: Requested<Array<string>>;
    paths: Requested<Array<Path>>;
    units: Requested<Record<string, UnitDbEntry>>;
    changedUnitCompletions: Record<string, boolean>;
    saveChanges: Requested<void>;
};

const initialState: State = {
    students: RequestState.Empty,
    semesters: RequestState.Empty,
    classes: RequestState.Empty,
    selectedSemesterId: undefined,
    selectedClassId: undefined,
    selectedStudentId: undefined,
    selectedStudentCompletedUnitIds: RequestState.Empty,
    units: RequestState.Empty,
    paths: RequestState.Empty,
    changedUnitCompletions: {},
    saveChanges: RequestState.Empty,
};

export const unitsSlice = createSlice({
    name: 'updateUnits',
    initialState,
    reducers: {
        semestersLoadSucceeded: (
            state,
            action: {
                payload: Array<{ displayName: string; semesterId: string }>;
            }
        ) => {
            state.semesters = action.payload;
        },
        classesLoadSucceeded: (
            state,
            action: {
                payload: Array<{ displayName: string; classId: string }>;
            }
        ) => {
            state.classes = action.payload;
        },
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
                payload: Array<Path>;
            }
        ) => {
            state.paths = action.payload;
        },
        semestersLoadStarted: (state) => {
            state.semesters = RequestState.Loading;
        },
        classesLoadStarted: (state) => {
            state.classes = RequestState.Loading;
        },
        studentLoadStarted: (state) => {
            state.students = RequestState.Loading;
        },
        studentCompletedUnitIdsLoadStarted: (state) => {
            state.selectedStudentCompletedUnitIds = RequestState.Loading;
        },
        unitsLoadStarted: (state) => {
            state.units = RequestState.Loading;
        },
        pathsLoadStarted: (state) => {
            state.paths = RequestState.Loading;
        },
        semestersLoadFailed: (state) => {
            state.semesters = RequestState.Error;
        },
        classesLoadFailed: (state) => {
            state.classes = RequestState.Error;
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
        setSelectedSemesterId: (state, action: { payload: string }) => {
            state.selectedSemesterId = action.payload;
            state.selectedClassId = undefined;
            resetSelectedStudent(state);
        },
        setSelectedClassId: (state, action: { payload: string }) => {
            state.selectedClassId = action.payload;
            resetSelectedStudent(state);
        },
        setSelectedStudentId: (state, action: { payload: string }) => {
            state.selectedStudentId = action.payload;
            state.selectedStudentCompletedUnitIds = RequestState.Loading;
            state.changedUnitCompletions = {};
        },
        setUnitCompletion: (
            state,
            action: { payload: { unitId: string; isCompleted: boolean } }
        ) => {
            if (
                state.changedUnitCompletions[action.payload.unitId] ===
                undefined
            ) {
                state.changedUnitCompletions[action.payload.unitId] =
                    action.payload.isCompleted;
            } else {
                delete state.changedUnitCompletions[action.payload.unitId];
            }
        },
        ready: (state) => {
            state.students = RequestState.Loading;
            state.units = RequestState.Loading;
        },
        saveChanges: (state) => {
            state.saveChanges = RequestState.Loading;
        },
        saveCompletedUnitsSucceeded: (state) => {
            state.saveChanges = undefined;
            state.selectedStudentCompletedUnitIds =
                selectCompletedAndChangedCompletedUnitIds({
                    updateUnits: state,
                });
            state.changedUnitCompletions = {};
        },
        saveCompletedUnitsFailed: (state) => {
            state.saveChanges = RequestState.Error;
        },
    },
});

function resetSelectedStudent(state: State) {
    state.selectedStudentId = undefined;
    state.selectedStudentCompletedUnitIds = RequestState.Empty;
    state.changedUnitCompletions = {};
}

export default unitsSlice.reducer;

const selectState = (state: { updateUnits: State }) => state.updateUnits;

export const selectStudents = createSelector(
    [selectState],
    (state) => state.students
);

export const selectSemesters = createSelector(
    [selectState],
    (state) => state.semesters
);

export const selectClasses = createSelector(
    [selectState],
    (state) => state.classes
);

export const selectIsStudentLoadingInProgress = createSelector(
    [selectStudents],
    (requestState) => requestState === RequestState.Loading
);

export const selectSelectedSemesterId = createSelector(
    [selectState],
    (state) => state.selectedSemesterId
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
        const addedCompletedUnitIds =
            hasLoadedCompletedUnitIds &&
            Object.entries(changedCompletedUnitIds)
                .filter(
                    ([unitId, isCompleted]) =>
                        isCompleted && !completedUnitIds.includes(unitId)
                )
                .map(([unitId]) => unitId);
        const uncompletedUnitIds =
            hasLoadedCompletedUnitIds &&
            completedUnitIds.filter(
                (unitId) => changedCompletedUnitIds[unitId] === false
            );
        const updatedCompletedUnitIds =
            hasLoadedCompletedUnitIds &&
            completedUnitIds.filter(
                (unitId) => !uncompletedUnitIds.includes(unitId)
            );
        return (
            (hasLoadedCompletedUnitIds &&
                Array.from(
                    new Set([
                        ...updatedCompletedUnitIds,
                        ...addedCompletedUnitIds,
                    ])
                )) ||
            completedUnitIds
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

export const selectIsSaveInProgress = createSelector(
    [selectState],
    (state) => state.saveChanges === RequestState.Loading
);

export const selectUnitNameAndCompletionChange = createSelector(
    [selectUnits, selectChangedUnitCompletions],
    (units, changedUnitCompletions) => {
        return Object.entries(changedUnitCompletions).map(
            ([unitId, isCompleted]) => {
                return {
                    name: units[unitId].name,
                    added: isCompleted,
                };
            }
        );
    }
);

export const selectUpdateStudentUnitsProps = createSelector(
    [
        selectStudents,
        selectSemesters,
        selectClasses,
        selectSelectedStudentId,
        selectCompletedAndChangedCompletedUnitIds,
        selectUnits,
        selectPaths,
        selectIsSaveInProgress,
    ],
    (
        students,
        semesters,
        classes,
        selectedStudentId,
        completedUnitIds,
        units,
        paths,
        isSaveInProgress
    ): UpdateStudentUnitsViewProps => {
        return {
            students,
            semesters,
            classes,
            selectedStudentId,
            completedUnitIds,
            units,
            paths,
            isSaveInProgress,
        };
    }
);

import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Requested, RequestedUtility, RequestState } from '@sol/react/request';
import { UpdateStudentUnitsViewProps } from '../../components/units/update/UpdateStudentUnitsView';
import { UnitDbEntry } from '@sol/classes/domain';
import { Path } from '../../models/path.type';
import { StudentSelectionType } from '../../components/units/update/StudentSelectionType.type';

export type RepeatableUnitCompletion = {
    unitId: string;
    recordedDate: string;
    appliedToPath?: string;
};

export type State = {
    students: Requested<
        Array<{ first_name: string; last_name: string; id: string }>
    >;
    semesters: Requested<Array<{ displayName: string; semesterId: string }>>;
    classes: Requested<
        Array<{
            displayName: string;
            classId: string;
            studentIds: Array<string>;
            unitIds: Array<string>;
        }>
    >;
    selectedSemesterId: string | undefined;
    selectedClassId: string | undefined;
    selectedStudentId: string | undefined;
    selectedStudentCompletedUnitIds: Requested<Array<string>>;
    repeatableCompletions: Array<RepeatableUnitCompletion>; // Store as array
    paths: Requested<Array<Path>>;
    units: Requested<Record<string, UnitDbEntry>>;
    changedUnitCompletions: Record<string, boolean>;
    saveChanges: Requested<void>;
    selectionType: StudentSelectionType;
};

const initialState: State = {
    students: RequestState.Empty,
    semesters: RequestState.Empty,
    classes: RequestState.Empty,
    selectedSemesterId: undefined,
    selectedClassId: undefined,
    selectedStudentId: undefined,
    selectedStudentCompletedUnitIds: RequestState.Empty,
    repeatableCompletions: [], // Initialize as empty array
    units: RequestState.Empty,
    paths: RequestState.Empty,
    changedUnitCompletions: {},
    saveChanges: RequestState.Empty,
    selectionType: 'all',
};

export const updateUnitsSlice = createSlice({
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
                payload: Array<{
                    displayName: string;
                    classId: string;
                    studentIds: Array<string>;
                    unitIds: Array<string>;
                }>;
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
        studentCompletedUnitsLoadSucceeded: (
            state,
            action: {
                payload: {
                    regularUnitIds: Array<string>;
                    repeatableCompletions: Array<RepeatableUnitCompletion>;
                };
            }
        ) => {
            state.selectedStudentCompletedUnitIds =
                action.payload.regularUnitIds;
            state.repeatableCompletions = action.payload.repeatableCompletions;
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
        studentCompletedUnitsLoadStarted: (state) => {
            state.selectedStudentCompletedUnitIds = RequestState.Loading;
            state.repeatableCompletions = []; // Reset repeatable completions
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
        studentCompletedUnitsLoadFailed: (state) => {
            state.selectedStudentCompletedUnitIds = RequestState.Error;
            state.repeatableCompletions = []; // Reset repeatable completions on error
        },
        unitsLoadFailed: (state) => {
            state.units = RequestState.Error;
        },
        pathsLoadFailed: (state) => {
            state.paths = RequestState.Error;
        },
        setSelectionType: (
            state,
            action: { payload: StudentSelectionType }
        ) => {
            state.selectionType = action.payload;
            state.selectedSemesterId = undefined;
            state.selectedClassId = undefined;
            state.selectedStudentId = undefined;
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
            state.repeatableCompletions = []; // Reset repeatable completions
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
        // New actions for repeatable completions
        addRepeatableCompletion: (
            state,
            action: { payload: { unitId: string } }
        ) => {
            const newCompletion: RepeatableUnitCompletion = {
                unitId: action.payload.unitId,
                recordedDate: new Date().toISOString(),
                appliedToPath: undefined,
            };

            state.repeatableCompletions.push(newCompletion);
        },
        updateRepeatableCompletion: (
            state,
            action: {
                payload: {
                    completion: RepeatableUnitCompletion;
                    appliedToPath: string;
                };
            }
        ) => {
            const index = state.repeatableCompletions.findIndex(
                (completion) =>
                    completion.unitId + completion.recordedDate ===
                    action.payload.completion.unitId +
                        action.payload.completion.recordedDate
            );

            if (index !== -1) {
                state.repeatableCompletions[index] = {
                    ...state.repeatableCompletions[index],
                    appliedToPath: action.payload.appliedToPath,
                };
            }
        },
        removeRepeatableCompletion: (
            state,
            action: {
                payload: {
                    unitId: string;
                    recordedDate: string;
                    appliedToPath?: string;
                };
            }
        ) => {
            state.repeatableCompletions = state.repeatableCompletions.filter(
                (completion) =>
                    completion.unitId + completion.recordedDate !==
                    action.payload.unitId + action.payload.recordedDate
            );
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
    state.repeatableCompletions = [];
    state.changedUnitCompletions = {};
}

export default updateUnitsSlice.reducer;

const selectState = (state: { updateUnits: State }) => state.updateUnits;

export const selectAllStudents = createSelector(
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

export const selectRepeatableCompletions = createSelector(
    [selectState],
    (state) => state.repeatableCompletions
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

export const selectUnits = createSelector(
    [selectState],
    (state) => state.units
);

export const selectPaths = createSelector(
    [selectState],
    (state) => state.paths
);

export const selectIsSaveInProgress = createSelector(
    [selectState],
    (state) => state.saveChanges === RequestState.Loading
);

export const selectUnitNameAndCompletionChange = createSelector(
    [selectUnits, selectChangedUnitCompletions],
    (units, changedUnitCompletions) => {
        if (!RequestedUtility.isLoaded(units)) {
            return [];
        }

        return Object.entries(changedUnitCompletions).map(
            ([unitId, isCompleted]) => {
                return {
                    name: units[unitId]?.name || unitId,
                    added: isCompleted,
                };
            }
        );
    }
);

export const selectSelectedClassId = createSelector(
    [selectState],
    (state) => state.selectedClassId
);

export const selectSelectedClassStudents = createSelector(
    [selectClasses, selectSelectedClassId],
    (classes, selectedClassId): Requested<Array<string>> => {
        return RequestedUtility.mapLoaded(classes, (classez) => {
            const selectedClass = classez.find(
                (clazz) => clazz.classId === selectedClassId
            );
            return selectedClass?.studentIds ?? [];
        });
    }
);

export const selectQueriedStudents = createSelector(
    [
        selectAllStudents,
        selectSelectedClassStudents,
        selectSelectedSemesterId,
        selectSelectedClassId,
    ],
    (
        allStudents,
        selectedClassStudents,
        selectedSemesterId,
        selectedClassId
    ) => {
        // If no semester/class is selected, show all students
        if (!selectedSemesterId && !selectedClassId) {
            return allStudents;
        }

        // If we have a selection but data is loading/error, preserve that state
        if (!RequestedUtility.isLoaded(selectedClassStudents)) {
            return selectedClassStudents;
        }

        if (!RequestedUtility.isLoaded(allStudents)) {
            return allStudents;
        }

        // Filter students based on class selection
        return allStudents.filter((student) =>
            selectedClassStudents.includes(student.id)
        );
    }
);

export const selectSelectionType = createSelector(
    [selectState],
    (state) => state.selectionType
);

export const selectSelectedClass = createSelector(
    [selectClasses, selectSelectedClassId],
    (classes, selectedClassId) => {
        return RequestedUtility.mapLoaded(classes, (classez) =>
            classez.filter((clazz) => clazz.classId === selectedClassId)
        );
    }
);

export const selectSelectedClassUnitIds = createSelector(
    [selectSelectedClass],
    (clazz) => {
        const unitIds = RequestedUtility.mapLoaded(clazz, (classez) =>
            classez.flatMap((clazz) => clazz.unitIds)
        );
        return RequestedUtility.isLoaded(unitIds) ? unitIds : [];
    }
);

export const selectUpdateStudentUnitsProps = createSelector(
    [
        selectQueriedStudents,
        selectSemesters,
        selectClasses,
        selectSelectedSemesterId,
        selectSelectedClassId,
        selectSelectedClassUnitIds,
        selectSelectedStudentId,
        selectCompletedAndChangedCompletedUnitIds,
        selectRepeatableCompletions,
        selectUnits,
        selectPaths,
        selectIsSaveInProgress,
        selectSelectionType,
    ],
    (
        queriedStudents,
        semesters,
        classes,
        selectedSemesterId,
        selectedClassId,
        selectedClassUnitIds,
        selectedStudentId,
        completedUnitIds,
        repeatableCompletions,
        units,
        paths,
        isSaveInProgress,
        selectionType
    ): UpdateStudentUnitsViewProps => {
        return {
            students: queriedStudents,
            semesters,
            selectionType,
            classes,
            selectedSemesterId,
            selectedClassId,
            selectedClassUnitIds,
            selectedStudentId,
            completedUnitIds,
            repeatableCompletions,
            units,
            paths,
            isSaveInProgress,
        };
    }
);

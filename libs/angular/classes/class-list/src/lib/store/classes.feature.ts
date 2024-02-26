import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { classesActions } from './classes.actions';
import {
    Requested,
    RequestedUtility,
    RequestState,
} from '@sol/angular/request';

type Feature = {
    classes: Record<string, Requested<SemesterClass>>;
    groups: Record<string, Requested<SemesterClassGroup>>;
    availableForEnrollment: Requested<{
        classIds: Set<string>;
        groupIds: Set<string>;
    }>;
    classIdsBySemesterId: {
        current: Requested<Array<string>>;
        [semesterId: string]: Requested<Array<string>>;
    };
};

const initialState: Feature = {
    classes: {},
    groups: {},
    availableForEnrollment: {
        classIds: new Set(),
        groupIds: new Set(),
    },
    classIdsBySemesterId: {
        current: RequestState.Empty,
    },
};

export const classesFeature = createFeature({
    name: 'classesFeature',
    reducer: createReducer(
        initialState,
        on(
            classesActions.loadClassesStart,
            classesActions.loadClassGroupsStart,
            (state): Feature => ({
                ...state,
                classes: {},
                groups: {},
            })
        ),
        on(
            classesActions.loadClassesRequestChanged,
            (state, { ids, classes }) => {
                let updatedClasses: Record<string, Requested<SemesterClass>>;
                if (RequestedUtility.isLoaded(classes)) {
                    updatedClasses = classes.reduce(
                        (acc, curr) => ({ ...acc, [curr.id]: curr }),
                        {}
                    );
                } else {
                    updatedClasses = ids.reduce(
                        (acc, curr) => ({ ...acc, [curr]: classes }),
                        {}
                    );
                }
                return {
                    ...state,
                    classes: {
                        ...state.classes,
                        ...updatedClasses,
                    },
                };
            }
        ),
        on(
            classesActions.loadClassGroupsRequestChanged,
            (state, { ids, groups }) => {
                let updatedGroups: Record<
                    string,
                    Requested<SemesterClassGroup>
                >;
                if (RequestedUtility.isLoaded(groups)) {
                    updatedGroups = groups.reduce(
                        (acc, curr) => ({ ...acc, [curr.id]: curr }),
                        {}
                    );
                } else {
                    updatedGroups = ids.reduce(
                        (acc, curr) => ({ ...acc, [curr]: groups }),
                        {}
                    );
                }
                return {
                    ...state,
                    groups: {
                        ...state.groups,
                        ...updatedGroups,
                    },
                };
            }
        ),
        on(
            classesActions.loadAvailableEnrollmentRequestChanged,
            (state, { request }) => {
                if (RequestedUtility.isLoaded(request)) {
                    const { classes, groups } = request;
                    return {
                        ...state,
                        classes: {
                            ...state.classes,
                            ...classes.reduce(
                                (acc, curr) => ({ ...acc, [curr.id]: curr }),
                                {}
                            ),
                            ...groups.reduce(
                                (classesFromGroups, group) => ({
                                    ...classesFromGroups,
                                    ...group.classes.reduce((acc, curr) => ({
                                        ...acc,
                                        [curr.id]: curr,
                                    })),
                                }),
                                {}
                            ),
                        },
                        groups: groups.reduce(
                            (acc, curr) => ({ ...acc, [curr.id]: curr }),
                            state.groups
                        ),
                        availableForEnrollment: {
                            classIds: new Set(classes.map((c) => c.id)),
                            groupIds: new Set(groups.map((g) => g.id)),
                        },
                    };
                } else {
                    return {
                        ...state,
                        availableForEnrollment: request,
                    };
                }
            }
        ),
        on(
            classesActions.loadCurrentSemesterClassesRequestChanged,
            (state, { classes }) => {
                if (RequestedUtility.isLoaded(classes)) {
                    return {
                        ...state,
                        classes: classes.reduce(
                            (acc, curr) => ({ ...acc, [curr.id]: curr }),
                            state.classes
                        ),
                        classIdsBySemesterId: {
                            current: classes.map((c) => c.id),
                        },
                    };
                } else {
                    return {
                        ...state,
                        classIdsBySemesterId: {
                            current: classes,
                        },
                    };
                }
            }
        )
    ),
});

export const selectLoadedClasses = createSelector(
    classesFeature.selectClasses,
    (classes) => {
        return Object.fromEntries(
            Object.entries(classes).filter(
                (entry): entry is [string, SemesterClass] => {
                    const [, semesterClass] = entry;
                    return RequestedUtility.isLoaded(semesterClass);
                }
            )
        );
    }
);

export const selectCurrentSemesterClassIds = createSelector(
    classesFeature.selectClassIdsBySemesterId,
    (classIdsBySemesterId) => {
        return classIdsBySemesterId.current;
    }
);

export const selectCurrentSemesterClasses = createSelector(
    selectCurrentSemesterClassIds,
    selectLoadedClasses,
    (currentSemesterClassIds, classes) => {
        let currentSemesterClasses: Requested<Array<SemesterClass>>;
        if (RequestedUtility.isLoaded(currentSemesterClassIds)) {
            currentSemesterClasses = currentSemesterClassIds.map(
                (id) => classes[id]
            );
        } else {
            currentSemesterClasses = currentSemesterClassIds;
        }
        return currentSemesterClasses;
    }
);

export const selectClassesByIds = createSelector(
    (ids: Array<string>) => ids,
    (ids) =>
        createSelector(classesFeature.selectClasses, (classes) => {
            const classEntriesForIds = Object.entries(classes).filter(([id]) =>
                ids.includes(id)
            );
            let classesForIds: Requested<Array<SemesterClass>>;
            if (
                classEntriesForIds
                    .map(([, r]) => r)
                    .every(RequestedUtility.isLoaded)
            ) {
                classesForIds = Object.values(
                    classes as Record<string, SemesterClass>
                );
            } else {
                classesForIds = Object.values(classes).includes(
                    RequestState.Loading
                )
                    ? RequestState.Loading
                    : RequestState.Error;
            }
            return classesForIds;
        })
);

export const selectClassGroupsByIds = createSelector(
    (ids: Array<string>) => ids,
    (ids) =>
        createSelector(classesFeature.selectGroups, (groups) => {
            const groupEntriesForIds = Object.entries(groups).filter(([id]) =>
                ids.includes(id)
            );
            let groupsForIds: Requested<Array<SemesterClassGroup>>;
            if (
                groupEntriesForIds
                    .map(([, r]) => r)
                    .every(RequestedUtility.isLoaded)
            ) {
                groupsForIds = Object.values(
                    groups as Record<string, SemesterClassGroup>
                );
            } else {
                groupsForIds = Object.values(groups).includes(
                    RequestState.Loading
                )
                    ? RequestState.Loading
                    : RequestState.Error;
            }
            return groupsForIds;
        })
);

export const selectAvailableClassesAndGroups = createSelector(
    (state) => state,
    classesFeature.selectClassesFeatureState,
    (state, feature) => {
        const { availableForEnrollment } = feature;
        let returnAvailableForEnrollment: Requested<{
            classes: Array<SemesterClass>;
            groups: Array<SemesterClassGroup>;
        }>;
        if (RequestedUtility.isLoaded(availableForEnrollment)) {
            const selectTheClasses = selectClassesByIds(
                Array.from(availableForEnrollment.classIds)
            );
            const classes = selectTheClasses(state);
            const selectTheGroups = selectClassGroupsByIds(
                Array.from(availableForEnrollment.groupIds)
            );
            const groups = selectTheGroups(state);
            if (
                RequestedUtility.isLoaded(classes) &&
                RequestedUtility.isLoaded(groups)
            ) {
                returnAvailableForEnrollment = { classes, groups };
            } else {
                returnAvailableForEnrollment = RequestedUtility.hasAnyError([
                    classes,
                    groups,
                ])
                    ? RequestState.Error
                    : RequestState.Loading;
            }
        } else {
            returnAvailableForEnrollment = availableForEnrollment;
        }
        return returnAvailableForEnrollment;
    }
);

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
        [semesterId: string]: {
            classIds: Set<string>;
            groupIds: Set<string>;
        };
    }>;
    classIdsBySemesterId: {
        current: Requested<Array<string>>;
        [semesterId: string]: Requested<Array<string>>;
    };
};

const initialState: Feature = {
    classes: {},
    groups: {},
    availableForEnrollment: {},
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
            (state, { query, classesBySemester }) => {
                const ids = query.map((c) => c.id);
                let updatedClasses: Record<string, Requested<SemesterClass>>;
                const classes = RequestedUtility.isLoaded(classesBySemester)
                    ? Object.values(classesBySemester).flatMap((c) => c)
                    : classesBySemester;
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
            (state, { query, groupsBySemester }) => {
                const ids = query.map((c) => c.id);
                let updatedGroups: Record<
                    string,
                    Requested<SemesterClassGroup>
                >;
                const groups = RequestedUtility.isLoaded(groupsBySemester)
                    ? Object.values(groupsBySemester).flatMap((c) => c)
                    : groupsBySemester;
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
                    console.log('request', request);
                    const semesters = Object.values(request);
                    const classes = semesters.flatMap((s) => s.classes);
                    const groups = semesters.flatMap((s) => s.groups);

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
                        availableForEnrollment: Object.fromEntries(
                            Object.entries(request).map(
                                ([id, { classes, groups }]) => [
                                    id,
                                    {
                                        classIds: new Set(
                                            classes.map((c) => c.id)
                                        ),
                                        groupIds: new Set(
                                            groups.map((g) => g.id)
                                        ),
                                    },
                                ]
                            )
                        ),
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
    classesFeature.selectAvailableForEnrollment,
    (state, availableForEnrollment) => {
        let returnAvailableForEnrollment: Requested<{
            [semesterId: string]: {
                classes: Array<SemesterClass>;
                groups: Array<SemesterClassGroup>;
            };
        }>;
        if (RequestedUtility.isLoaded(availableForEnrollment)) {
            const allClassIds = Object.values(availableForEnrollment).flatMap(
                ({ classIds }) => Array.from(classIds)
            );
            const selectTheClasses = selectClassesByIds(allClassIds);
            const classes = selectTheClasses(state);
            const allGroupIds = Object.values(availableForEnrollment).flatMap(
                ({ groupIds }) => Array.from(groupIds)
            );
            const selectTheGroups = selectClassGroupsByIds(
                Array.from(allGroupIds)
            );
            const groups = selectTheGroups(state);
            if (
                RequestedUtility.isLoaded(classes) &&
                RequestedUtility.isLoaded(groups)
            ) {
                returnAvailableForEnrollment = Object.fromEntries(
                    Object.keys(availableForEnrollment).map((id) => [
                        id,
                        {
                            classes: classes.filter((c) =>
                                availableForEnrollment[id].classIds.has(c.id)
                            ),
                            groups: groups.filter((g) =>
                                availableForEnrollment[id].groupIds.has(g.id)
                            ),
                        },
                    ])
                );
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

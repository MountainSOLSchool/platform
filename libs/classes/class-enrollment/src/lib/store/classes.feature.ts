import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { classesActions } from './classes.actions';

interface Feature {
    classes: Record<string, SemesterClass>;
    groups: Record<string, SemesterClassGroup>;
    availableForEnrollment: {
        classIds: Set<string>;
        groupIds: Set<string>;
    };
}

const initialState: Feature = {
    classes: {},
    groups: {},
    availableForEnrollment: {
        classIds: new Set(),
        groupIds: new Set(),
    },
};

export const classesFeature = createFeature({
    name: 'classesFeature',
    reducer: createReducer(
        initialState,
        on(classesActions.loadClassesSuccess, (state, { classes }) => ({
            ...state,
            classes: classes.reduce(
                (acc, curr) => ({ ...acc, [curr.id]: curr }),
                {}
            ),
        })),
        on(classesActions.loadClassGroupsSuccess, (state, { groups }) => ({
            ...state,
            groups: groups.reduce(
                (acc, curr) => ({ ...acc, [curr.id]: curr }),
                state.groups
            ),
        })),
        on(
            classesActions.loadAvailableEnrollmentSuccess,
            (state, { classes, groups }) => ({
                ...state,
                classes: classes.reduce(
                    (acc, curr) => ({ ...acc, [curr.id]: curr }),
                    state.classes
                ),
                groups: groups.reduce(
                    (acc, curr) => ({ ...acc, [curr.id]: curr }),
                    state.groups
                ),
                availableForEnrollment: {
                    classIds: new Set(classes.map((c) => c.id)),
                    groupIds: new Set(groups.map((g) => g.id)),
                },
            })
        )
    ),
});

export const selectAvailableClassesAndGroups = createSelector(
    classesFeature.selectClassesFeatureState,
    (feature) => {
        if (
            Object.keys(feature.classes).length &&
            Object.keys(feature.availableForEnrollment).length
        ) {
            const classes = Object.values(feature.classes).filter((c) =>
                feature.availableForEnrollment.classIds.has(c.id)
            );
            const groups = Object.values(feature.groups).filter((g) =>
                feature.availableForEnrollment.groupIds.has(g.id)
            );
            return { classes, groups };
        } else {
            return undefined;
        }
    }
);

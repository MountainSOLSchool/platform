import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';

export const classesActions = createActionGroup({
    source: 'Class List Service',
    events: {
        'Load Classes Start': props<{ ids: Array<string> }>(),
        'Load Classes Success': props<{ classes: Array<SemesterClass> }>(),
        'Load Available Enrollment Start': emptyProps(),
        'Load Available Enrollment Success': props<{
            classes: Array<SemesterClass>;
            groups: Array<SemesterClassGroup>;
        }>(),
        'Load Class Groups Start': props<{ ids: Array<string> }>(),
        'Load Class Groups Success': props<{
            groups: Array<SemesterClassGroup>;
        }>(),
    },
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { Requested } from '@sol/angular/request';

export const classesActions = createActionGroup({
    source: 'Class List Service',
    events: {
        'Load Classes Start': props<{ ids: Array<string> }>(),
        'Load Classes Request Changed': props<{
            ids: Array<string>;
            classes: Requested<Array<SemesterClass>>;
        }>(),
        'Load Available Enrollment Start': emptyProps(),
        'Load Available Enrollment Request Changed': props<{
            request: Requested<{
                classes: Array<SemesterClass>;
                groups: Array<SemesterClassGroup>;
            }>;
        }>(),
        'Load Class Groups Start': props<{ ids: Array<string> }>(),
        'Load Class Groups Request Changed': props<{
            ids: Array<string>;
            groups: Requested<Array<SemesterClassGroup>>;
        }>(),
        'Load Current Semester Classes Start': emptyProps(),
        'Load Current Semester Classes Request Changed': props<{
            classes: Requested<Array<SemesterClass>>;
        }>(),
        'Load Qualified Classes Start': props<{
            classes: Array<{ id: string; semesterId: string }>;
        }>(),
        'Load Qualified Classes Request Changed': props<{
            classes: Array<{ id: string; semesterId: string }>;
            loaded: Requested<Array<SemesterClass>>;
        }>(),
    },
});

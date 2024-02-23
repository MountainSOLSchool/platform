import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { classesActions } from '../store/classes.actions';
import {
    selectAvailableClassesAndGroups,
    selectClassesByIds,
    selectClassGroupsByIds,
    selectCurrentSemesterClasses,
} from '../store/classes.feature';
import { Requested } from '@sol/angular/request';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';

@Injectable({ providedIn: 'root' })
export class ClassListService {
    private readonly store = inject(Store);

    getAvailableEnrollmentClassesAndGroups() {
        this.store.dispatch(classesActions.loadAvailableEnrollmentStart());
        return this.store.select(selectAvailableClassesAndGroups);
    }

    getClassesByIds(ids: Array<string>) {
        if (ids.length === 0) return of([]);
        this.store.dispatch(classesActions.loadClassesStart({ ids }));
        return this.store.select(selectClassesByIds(ids));
    }

    getCurrentSemesterClasses() {
        this.store.dispatch(classesActions.loadCurrentSemesterClassesStart());
        return this.store.select(selectCurrentSemesterClasses);
    }

    getClassGroupsByIds(ids: Array<string>) {
        if (ids.length === 0) return of([]);
        this.store.dispatch(classesActions.loadClassGroupsStart({ ids }));
        return this.store.select(selectClassGroupsByIds(ids));
    }

    getClassesBySemesterIds(semesterIds: Array<string>): Observable<
        Requested<{
            [semesterId: string]: {
                classes: SemesterClass[];
                groups: SemesterClassGroup[];
            };
        }>
    > {
        return of({
            spring2024: {
                classes: [
                    {
                        title: 'Class 1',
                        startMs: 0,
                        endMs: 0,
                        registrationEndMs: 0,
                        id: '1',
                        classType: 'Class',
                        gradeRangeStart: 0,
                        gradeRangeEnd: 0,
                        description: 'Description',
                        cost: 0,
                        location: 'Location',
                        instructors: [],
                        dailyTimes: 'Daily Times',
                        weekday: 'Weekday',
                        thumbnailUrl: 'Thumbnail Url',
                        enrolledCount: 0,
                        live: true,
                        pausedForEnrollment: false,
                        students: [],
                        semesterId: 'spring2024',
                    },
                ],
                groups: [],
            },
            winter2024: {
                classes: [
                    {
                        title: 'Class 1',
                        startMs: 0,
                        endMs: 0,
                        registrationEndMs: 0,
                        id: '1',
                        classType: 'Class',
                        gradeRangeStart: 0,
                        gradeRangeEnd: 0,
                        description: 'Description',
                        cost: 0,
                        location: 'Location',
                        instructors: [],
                        dailyTimes: 'Daily Times',
                        weekday: 'Weekday',
                        thumbnailUrl: 'Thumbnail Url',
                        enrolledCount: 0,
                        live: true,
                        pausedForEnrollment: false,
                        students: [],
                        semesterId: 'winter2024',
                    },
                ],
                groups: [],
            },
        });
    }
}

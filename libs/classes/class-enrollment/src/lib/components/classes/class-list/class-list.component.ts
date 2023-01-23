import { Component, inject, Output } from '@angular/core';
import {
    BehaviorSubject,
    combineLatest,
    debounceTime,
    delay,
    filter,
    map,
    merge,
    ObservedValueOf,
    of,
    shareReplay,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs';
import { EnrollmentWorkflowStore } from '../../enrollment-workflow/enrollment-workflow.store';
import { CardModule } from 'primeng/card';
import { CommonModule, DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { ClassListService } from '../../../services/class-list.service';
import { LetModule } from '@rx-angular/template/let';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IfModule } from '@rx-angular/template/if';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    standalone: true,
    imports: [
        CardModule,
        CommonModule,
        CheckboxModule,
        InputTextModule,
        ChipModule,
        SkeletonModule,
        FormsModule,
        LetModule,
        SelectButtonModule,
        TagModule,
        ToggleButtonModule,
        ProgressSpinnerModule,
        IfModule,
        DropdownModule,
    ],
    selector: 'sol-class-picker',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.css'],
    providers: [DatePipe],
})
export class ClassesComponent {
    private readonly classListService = inject(ClassListService);
    private readonly datePipe = inject(DatePipe);
    readonly workflow = inject(EnrollmentWorkflowStore);

    private search$ = new BehaviorSubject('');

    // emits true after a search has been performed, and emits false 500ms afterwards

    private gradeFilter$ = new BehaviorSubject<[] | [number, number]>([]);

    private isFakeSearchStarted$ = combineLatest([
        this.search$,
        this.gradeFilter$,
    ]).pipe(map(() => true));

    readonly isFakeSearchLoading$ = merge(
        this.isFakeSearchStarted$,
        this.isFakeSearchStarted$.pipe(
            delay(800),
            map(() => false)
        ),
        of(false)
    ).pipe(tap((x) => console.log('isFakeSearchLoading$', x)));

    selectedClassIds$ = this.workflow.select(
        (state) => state.enrollment.selectedClasses
    );

    @Output() validityChange = this.selectedClassIds$.pipe(
        map((selectedClasses) => selectedClasses.length > 0)
    );

    classes$ = this.classListService.getFutureClasses().pipe(
        shareReplay(),
        map((classes) =>
            classes
                .map((c) => {
                    return {
                        ...c,
                        classDateTimes:
                            c.startMs && c.endMs
                                ? this.datePipe.transform(
                                      new Date(c.startMs),
                                      'shortDate'
                                  ) +
                                  ' - ' +
                                  this.datePipe.transform(
                                      new Date(c.endMs),
                                      'shortDate'
                                  )
                                : '',
                    };
                })
                .sort((a, b) => a.startMs - b.startMs)
        ),
        switchMap((classes) =>
            this.selectedClassIds$.pipe(
                map((selectedClasses) => {
                    return classes.map((c) => {
                        return {
                            ...c,
                            selected: selectedClasses.includes(c.id),
                        };
                    });
                })
            )
        )
    );

    readonly filterOptions$ = this.classes$.pipe(
        map((classes) =>
            [
                ...classes
                    .reduce(
                        (map, c) =>
                            map.set(
                                `Grades ${c.gradeRangeStart}-${c.gradeRangeEnd}`,
                                c
                            ),
                        new Map<
                            `Grades ${number}-${number}`,
                            ObservedValueOf<typeof this.classes$>[number]
                        >()
                    )
                    .entries(),
            ]
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([label, { gradeRangeStart, gradeRangeEnd }]) => ({
                    name: label,
                    value: [gradeRangeStart, gradeRangeEnd],
                }))
        )
    );

    classesResult$ = combineLatest([
        this.classes$,
        this.search$,
        this.gradeFilter$,
    ]).pipe(
        map(([classes, search, gradeFilter]) => {
            const searched = classes.filter((c) => {
                return (
                    c.title.toLowerCase().includes(search.toLowerCase()) ||
                    c.description
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    c.location.toLowerCase().includes(search.toLowerCase()) ||
                    c.classDateTimes
                        .toLowerCase()
                        .includes(search.toLowerCase())
                );
            });
            const [startGrade, endGrade] = gradeFilter;
            const filtered =
                startGrade && endGrade
                    ? searched.filter(
                          (c) =>
                              c.gradeRangeStart === startGrade &&
                              c.gradeRangeEnd === endGrade
                      )
                    : searched;
            return filtered;
        })
    );

    selectedClasses$ = this.selectedClassIds$.pipe(
        withLatestFrom(this.classes$),
        map(([selectedIds, classes]) =>
            classes.filter((c) => selectedIds.includes(c.id))
        )
    );

    selectionChanged({
        id: classId,
        selected,
    }: {
        id: string;
        selected: boolean;
    }) {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                selectedClasses: selected
                    ? Array.from(
                          new Set([...s.enrollment.selectedClasses, classId])
                      )
                    : s.enrollment.selectedClasses.filter(
                          (id) => id !== classId
                      ),
            },
        }));
    }

    searchChange(search: string) {
        this.search$.next(search);
    }

    filterChange(filter: [] | [number, number]) {
        console.log(filter);
        this.gradeFilter$.next(filter);
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
} from '@angular/core';
import {
    BehaviorSubject,
    combineLatest,
    delay,
    map,
    merge,
    Observable,
    ObservedValueOf,
    of,
    shareReplay,
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
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IfModule } from '@rx-angular/template/if';
import { DropdownModule } from 'primeng/dropdown';
import { ForModule } from '@rx-angular/template/for';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

interface ClassRow {
    classes: Array<SemesterClass & { classDateTimes: string }>;
    group?: SemesterClassGroup;
    start: Date;
}

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        ToggleButtonModule,
        ProgressSpinnerModule,
        IfModule,
        DropdownModule,
        ForModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        ButtonModule,
    ],
    selector: 'sol-class-picker',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.css'],
    providers: [DatePipe],
})
export class ClassesComponent {
    private readonly interacted$ = new BehaviorSubject(false);
    @Input() set interacted(value: boolean) {
        this.interacted$.next(value);
    }
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
    );

    selectedClassIds$ = this.workflow.select(
        (state) => state.enrollment.selectedClasses
    );

    isValid$ = this.selectedClassIds$.pipe(
        map((selectedClasses) => selectedClasses.length > 0),
        shareReplay()
    );

    isInvalid$ = combineLatest([this.isValid$, this.interacted$]).pipe(
        map(([isValid, interacted]) => !isValid && interacted)
    );

    @Output() validityChange = this.isValid$.pipe();

    classRows$: Observable<Array<ClassRow>> = this.classListService
        .getAvailableEnrollmentClassesAndGroups()
        .pipe(
            shareReplay(),
            map(({ classes, groups }) => {
                const classesAsClassRows = classes
                    .map((c) => ({
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
                    }))
                    .map((c) => ({
                        classes: [c],
                        start: new Date(c.startMs),
                    }));
                const groupsAsClassRows = groups.map((g) => ({
                    classes: g.classes.map((c) => ({
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
                    })),
                    group: g,
                    start: new Date(g.classes[0].startMs),
                }));
                return [...classesAsClassRows, ...groupsAsClassRows].sort(
                    (a, b) => a.start.getTime() - b.start.getTime()
                );
            })
        );

    classes$ = this.classRows$.pipe(
        map((rows) =>
            rows.map((row) => row.classes).reduce((a, b) => a.concat(b), [])
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

    filteredClassRows$ = combineLatest([
        this.classRows$,
        this.search$,
        this.gradeFilter$,
        this.selectedClassIds$,
    ]).pipe(
        map(([classRows, search, gradeFilter, selectedClassIds]) => {
            const searched = classRows.filter((row) => {
                return !!row.classes.find(
                    (c) =>
                        c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.description
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        c.location
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        c.classDateTimes
                            .toLowerCase()
                            .includes(search.toLowerCase())
                );
            });
            const [startGrade, endGrade] = gradeFilter;
            const filtered =
                startGrade && endGrade
                    ? searched.filter(
                          (row) =>
                              !!row.classes.find(
                                  (c) =>
                                      c.gradeRangeStart === startGrade &&
                                      c.gradeRangeEnd === endGrade
                              )
                      )
                    : searched;
            return filtered.map((row) => ({
                ...row,
                selected: row.classes.every((c) =>
                    selectedClassIds.includes(c.id)
                ),
                classes: row.classes.map((c) => ({
                    ...c,
                    selected: selectedClassIds.includes(c.id),
                })),
            }));
        })
    );

    selectedClasses$ = this.selectedClassIds$.pipe(
        withLatestFrom(this.classes$),
        map(([selectedIds, classes]) =>
            classes.filter((c) => selectedIds.includes(c.id))
        )
    );

    selectedSummerClasses$ = this.selectedClasses$.pipe(
        map((classes) =>
            classes.filter((c) =>
                ['Summer Camp Full Day', 'Summer Camp Half Day'].includes(
                    c.classType
                )
            )
        )
    );

    hasSelectedSummerClass$ = this.selectedSummerClasses$.pipe(
        map((classes) => classes.length > 0)
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
        this.gradeFilter$.next(filter);
    }

    trackClassCard(index: number, classCard: { id: string }) {
        return classCard.id;
    }

    trackClassRow(index: number, classRow: ClassRow) {
        return classRow.group?.id ?? classRow.classes[0].id;
    }

    getClassRowSavings(classRow: ClassRow) {
        const classesCost = classRow.classes.reduce(
            // TODO: cost is a string, but should be a number
            (agg, aClass) => agg + Number(aClass.cost),
            0
        );
        const groupCost = classRow.group?.cost ?? 0;
        const savings = classesCost - groupCost;
        return savings;
    }

    rowSelectedChange(classRow: ClassRow, selected: boolean) {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                selectedClassGroups: selected
                    ? Array.from(
                          new Set([
                              ...s.enrollment.selectedClassGroups,
                              classRow.group?.id ?? '',
                          ])
                      )
                    : s.enrollment.selectedClassGroups.filter(
                          (id) => id !== classRow.group?.id
                      ),
            },
        }));

        classRow.classes.forEach((c) =>
            this.selectionChanged({ id: c.id, selected })
        );
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Input,
    Output,
    signal,
} from '@angular/core';
import {
    delay,
    filter,
    map,
    merge,
    of,
    shareReplay,
    skip,
    switchMap,
} from 'rxjs';
import { EnrollmentWorkflowStore } from '../../enrollment-workflow/enrollment-workflow.store';
import { CardModule } from 'primeng/card';
import {
    AsyncPipe,
    DatePipe,
    NgStyle,
    NgTemplateOutlet,
} from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SliderModule } from 'primeng/slider';
import { AutoFocusModule } from 'primeng/autofocus';
import { InputNumberModule } from 'primeng/inputnumber';
import { ClassListService } from '@sol/angular/classes/list';
import {
    RequestedOperatorsUtility,
    requestStateDirectives,
} from '@sol/angular/request';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { TabViewModule } from 'primeng/tabview';
import { ClassesSkeletonComponent } from '../classes-skeleton/classes-skeleton.component';
import { ClassRowComponent } from '../class-row/class-row.component';

interface ClassRow {
    classes: Array<SemesterClass & { classDateTimes: string }>;
    group?: SemesterClassGroup;
    start: Date;
    index: number;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        NgStyle,
        CardModule,
        CheckboxModule,
        InputTextModule,
        ChipModule,
        SkeletonModule,
        FormsModule,
        SelectButtonModule,
        ToggleButtonModule,
        ProgressSpinnerModule,
        DropdownModule,
        MultiSelectModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        ButtonModule,
        OverlayPanelModule,
        SliderModule,
        AutoFocusModule,
        InputNumberModule,
        requestStateDirectives,
        TabViewModule,
        NgTemplateOutlet,
        ClassesSkeletonComponent,
        ClassRowComponent,
    ],
    selector: 'sol-class-picker',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.css'],
    providers: [DatePipe],
})
export class ClassesComponent {
    private readonly _interacted = signal(false);
    @Input() set interacted(value: boolean) {
        this._interacted.set(value);
    }
    private readonly classListService = inject(ClassListService);
    private readonly semesterListService = inject(ClassesSemesterListService);
    private readonly datePipe = inject(DatePipe);
    readonly workflow = inject(EnrollmentWorkflowStore);

    private search = signal('');

    private gradeFilter = signal<[] | [number, number]>([]);

    private isFakeSearchStarted$ = merge(
        toObservable(this.search).pipe(skip(1)),
        toObservable(this.gradeFilter).pipe(skip(1))
    ).pipe(map(() => true));

    readonly isFakeSearchLoading$ = merge(
        this.isFakeSearchStarted$,
        this.isFakeSearchStarted$.pipe(
            delay(800),
            map(() => false)
        ),
        of(false)
    ).pipe();

    selectedWorkflowClasses = this.workflow.selectSignal(
        (state) => state.enrollment.selectedClasses
    );

    selectedClassIds = computed(() =>
        this.selectedWorkflowClasses().map((c) => c.id)
    );

    isValid = computed(() => this.selectedClassIds().length > 0);

    isInvalid = computed(() => !this.isValid() && this._interacted());

    @Output() validityChange = toObservable(this.isValid);

    readonly semesterOptions = toSignal(
        this.semesterListService.getEnrollableSemesters().pipe(
            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
            map((semesters) => semesters.map(({ id, name }) => ({ id, name })))
        )
    );

    readonly classRowsBySemesters = toSignal(
        toObservable(this.semesterOptions).pipe(
            filter((semesters) => !!semesters && semesters.length > 0),
            map((semesters) => semesters as NonNullable<typeof semesters>),
            map((semesters) => semesters.map((s) => s.id)),
            switchMap((semesterIds) =>
                this.classListService.getClassesBySemesterIds(semesterIds).pipe(
                    RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                    shareReplay(),
                    map((classesBySemester) => {
                        return Object.fromEntries(
                            Object.entries(classesBySemester).map(
                                ([semesterId, { classes, groups }]) => {
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
                                            selected: false,
                                        }));
                                    const groupsAsClassRows = groups.map(
                                        (g) => ({
                                            classes: g.classes.map((c) => ({
                                                ...c,
                                                classDateTimes:
                                                    c.startMs && c.endMs
                                                        ? this.datePipe.transform(
                                                              new Date(
                                                                  c.startMs
                                                              ),
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
                                            start: new Date(
                                                g.classes[0].startMs
                                            ),
                                            selected: false,
                                        })
                                    );
                                    const combined: Array<
                                        | (typeof classesAsClassRows)[number]
                                        | (typeof groupsAsClassRows)[number]
                                    > = [
                                        ...classesAsClassRows,
                                        ...groupsAsClassRows,
                                    ];
                                    return [
                                        semesterId,
                                        combined
                                            .sort(
                                                (a, b) =>
                                                    a.start.getTime() -
                                                    b.start.getTime()
                                            )
                                            .map((row, index) => ({
                                                ...row,
                                                selected: false,
                                                index,
                                            })),
                                    ] as const;
                                }
                            )
                        );
                    })
                )
            )
        )
    );

    classes = computed(() => {
        const classRowsBySemesters = this.classRowsBySemesters();
        return classRowsBySemesters
            ? Object.values(classRowsBySemesters)
                  .flat()
                  .map((row) => row.classes)
                  .reduce((a, b) => a.concat(b), [])
            : undefined;
    });

    readonly filterOptions = computed(() => {
        const classes = this.classes();
        return classes
            ? [
                  ...classes
                      .reduce(
                          (map, c) =>
                              map.set(
                                  `Grades ${c.gradeRangeStart}-${c.gradeRangeEnd}`,
                                  c
                              ),
                          new Map<
                              `Grades ${number}-${number}`,
                              NonNullable<
                                  ReturnType<typeof this.classes>
                              >[number]
                          >()
                      )
                      .entries(),
              ]
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([label, { gradeRangeStart, gradeRangeEnd }]) => ({
                      name: label,
                      value: [gradeRangeStart, gradeRangeEnd],
                  }))
            : undefined;
    });

    private readonly userCostsToSelectedClassIds = this.workflow.selectSignal(
        (state) => state.enrollment.userCostsToSelectedClassIds
    );

    private readonly selectedAdditionalOptionIdsByClassId =
        this.workflow.selectSignal(
            (state) => state.enrollment.additionalOptionIdsByClassId
        );

    filteredClassRowsBySemesters = computed(() => {
        const classRowsBySemesters = this.classRowsBySemesters();
        return classRowsBySemesters
            ? Object.fromEntries(
                  Object.entries(classRowsBySemesters).map(
                      ([semesterId, classRows]) => {
                          const searched = classRows.filter((row) => {
                              const search = this.search();
                              return !!row.classes.find(
                                  (c) =>
                                      c.title
                                          .toLowerCase()
                                          .includes(search.toLowerCase()) ||
                                      c.description
                                          ?.toLowerCase()
                                          .includes(search.toLowerCase()) ||
                                      c.location
                                          ?.toLowerCase()
                                          .includes(search.toLowerCase()) ||
                                      c.classDateTimes
                                          ?.toLowerCase()
                                          .includes(search.toLowerCase())
                              );
                          });
                          const [startGrade, endGrade] = this.gradeFilter();
                          const filtered =
                              startGrade && endGrade
                                  ? searched?.filter(
                                        (row) =>
                                            !!row.classes.find(
                                                (c) =>
                                                    c.gradeRangeStart ===
                                                        startGrade &&
                                                    c.gradeRangeEnd === endGrade
                                            )
                                    )
                                  : searched;
                          const result = filtered?.map((row) => ({
                              ...row,
                              selected: row.classes.every((c) =>
                                  this.selectedClassIds().includes(c.id)
                              ),
                              classes: row.classes.map((c) => ({
                                  ...c,
                                  selected: this.selectedClassIds().includes(
                                      c.id
                                  ),
                                  userCost:
                                      this.userCostsToSelectedClassIds()[c.id],
                                  initialCost: c.cost,
                                  additionalCost: (() => {
                                      const additional =
                                          this.selectedAdditionalOptionIdsByClassId()[
                                              c.id
                                          ] ?? [];
                                      return (
                                          (c.additionalOptions ?? [])
                                              .filter((option) =>
                                                  additional.includes(option.id)
                                              )
                                              .reduce(
                                                  (agg, o) => agg + o.cost,
                                                  0
                                              ) ?? 0
                                      );
                                  })(),
                              })),
                          }));
                          return [semesterId, result] as const;
                      }
                  )
              )
            : undefined;
    });

    selectedClasses = computed(() => {
        const selected = this.selectedClassIds();
        return this.classes()?.filter((c) => selected.includes(c.id));
    });

    selectedSummerClasses = computed(
        () =>
            this.selectedClasses()?.filter((c) =>
                ['Summer Camp Full Day', 'Summer Camp Half Day'].includes(
                    c.classType
                )
            ) ?? []
    );

    hasSelectedSummerClass = computed(
        () => this.selectedSummerClasses().length > 0
    );

    selectionChanged({
        classSelection,
        selectedAdditionalOptionIds,
        selected,
        userCost,
    }: {
        classSelection: { id: string; semesterId: string };
        selected: boolean;
        selectedAdditionalOptionIds?: Array<string>;
        userCost?: number;
    }) {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                selectedClasses: selected
                    ? Array.from(
                          new Set([
                              ...s.enrollment.selectedClasses,
                              classSelection,
                          ])
                      )
                    : s.enrollment.selectedClasses.filter(
                          (selectedClass) =>
                              selectedClass.id !== classSelection.id
                      ),
                userCostsToSelectedClassIds: {
                    ...s.enrollment.userCostsToSelectedClassIds,
                    [classSelection.id]: userCost,
                },
                additionalOptionIdsByClassId: selected
                    ? {
                          ...s.enrollment.additionalOptionIdsByClassId,
                          [classSelection.id]:
                              selectedAdditionalOptionIds ?? [],
                      }
                    : {
                          ...s.enrollment.additionalOptionIdsByClassId,
                          [classSelection.id]: [],
                      },
            },
        }));
    }

    searchChange(search: string) {
        this.search.set(search);
    }

    filterChange(filter: [] | [number, number]) {
        this.gradeFilter.set(filter);
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

    rowSelectedChange(
        classRow: ClassRow,
        selected: boolean,
        extra?: {
            classUserCosts: Record<string, number>;
            selectedAdditionalOptionIds: Array<string>;
        }
    ) {
        classRow.classes.forEach((c) =>
            this.selectionChanged({
                classSelection: {
                    id: c.id,
                    semesterId: c.semesterId,
                },
                selected,
                selectedAdditionalOptionIds:
                    extra?.selectedAdditionalOptionIds ?? [],
            })
        );
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Input,
    Signal,
    signal,
} from '@angular/core';
import { CurrencyPipe, DatePipe, JsonPipe, NgClass } from '@angular/common';
import { switchMap, of } from 'rxjs';
import { TreeTableModule } from 'primeng/treetable';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ClassListService } from '@sol/angular/classes/list';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TreeNode } from 'primeng/api';

interface AdditionalOption {
    id: string;
    description: string;
    cost: number;
}

interface ClassCostSummary {
    name: string;
    semester: string;
    date: string;
    cost: number;
    _startMs: number;
    additionalOptions?: AdditionalOption[];
}

export function mapToTreeTableData(data: ClassCostSummary[]): TreeNode[] {
    // Group data by semester
    const semesterGroups = data.reduce(
        (groups, item) => {
            if (!groups[item.semester]) {
                groups[item.semester] = [];
            }
            groups[item.semester].push(item);
            return groups;
        },
        {} as Record<string, ClassCostSummary[]>
    );

    // Convert to TreeNode structure
    return Object.entries(semesterGroups)
        .map(([semester, classes]): TreeNode => {
            const totalCost = classes.reduce((sum, cls) => {
                // Include base class cost
                let classCost = cls.cost || 0;
                // Add costs of additional options
                if (cls.additionalOptions) {
                    classCost += cls.additionalOptions.reduce(
                        (optSum, opt) => optSum + (opt.cost || 0),
                        0
                    );
                }
                return sum + classCost;
            }, 0);

            return {
                key: semester,
                data: {
                    name: semester,
                    semester: semester,
                    date: classes[0].date,
                    cost: totalCost,
                },
                children: classes.map(
                    (cls): TreeNode => ({
                        key: `${semester}-${cls.name}`,
                        data: {
                            name: cls.name,
                            semester: cls.semester,
                            date: cls.date,
                            cost: cls.cost || 0, // Ensure we default to 0 if cost is undefined
                        },
                        children: cls.additionalOptions?.map(
                            (option): TreeNode => ({
                                key: `${semester}-${cls.name}-${option.id}`,
                                data: {
                                    name: option.description,
                                    semester: '',
                                    date: '',
                                    cost: option.cost || 0,
                                    isOption: true,
                                },
                                leaf: true,
                            })
                        ),
                        leaf: !cls.additionalOptions?.length,
                    })
                ),
                expanded: true,
            };
        })
        .sort((a, b) => {
            const aDate = new Date(a.data.date);
            const bDate = new Date(b.data.date);
            return aDate.getTime() - bDate.getTime();
        });
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-class-summary-table',
    templateUrl: './class-summary-table.component.html',
    imports: [
        CurrencyPipe,
        TreeTableModule,
        ProgressSpinnerModule,
        JsonPipe,
        NgClass,
    ],
    providers: [DatePipe],
})
export class ClassSummaryTableComponent {
    private readonly classList = inject(ClassListService);
    private readonly datePipe = inject(DatePipe);

    private readonly _classes = signal(
        new Array<{ id: string; semesterId: string }>()
    );
    private readonly _groups = signal(
        new Array<{ id: string; semesterId: string }>()
    );
    private readonly _finalCostsToClassIds = signal<
        Record<string, number | undefined> | undefined
    >(undefined);
    private readonly _finalCostsToGroupIds = signal<
        Record<string, number | undefined> | undefined
    >(undefined);
    private readonly enrollableSemesters = toSignal(
        inject(ClassesSemesterListService)
            .getEnrollableSemesters()
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
    );
    private readonly classGroups = toSignal(
        toObservable(this._groups).pipe(
            switchMap((groups) =>
                this.classList
                    .getClassGroups(groups)
                    .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            )
        )
    );
    private readonly clasesAndGroups = computed(() => {
        return [this._classes(), this.classGroups()] as const;
    });
    readonly theClasses = toSignal(
        toObservable(this.clasesAndGroups).pipe(
            switchMap(([classes, groups]) => {
                return groups
                    ? this.classList
                          .getClasses(
                              classes.filter(
                                  ({ id }) =>
                                      !groups.some((g) =>
                                          g.classes.some((c) => c.id === id)
                                      )
                              )
                          )
                          .pipe(
                              RequestedOperatorsUtility.ignoreAllStatesButLoaded()
                          )
                    : of(undefined);
            })
        )
    );

    @Input() set classes(classes: Array<{ id: string; semesterId: string }>) {
        if (classes !== this._classes()) {
            this._classes.set(classes);
        }
    }
    @Input() set groups(groups: Array<{ id: string; semesterId: string }>) {
        if (groups !== this._groups()) {
            this._groups.set(groups);
        }
    }
    @Input() set finalCostsToClassIds(
        finalCostsToClassIds:
            | Record<string, number | undefined>
            | null
            | undefined
    ) {
        if (
            finalCostsToClassIds &&
            finalCostsToClassIds !== this._finalCostsToClassIds()
        ) {
            this._finalCostsToClassIds.set(finalCostsToClassIds);
        }
    }

    @Input() set finalCostsToGroupIds(
        finalCostsToGroupIds:
            | Record<string, number | undefined>
            | null
            | undefined
    ) {
        if (
            finalCostsToGroupIds &&
            finalCostsToGroupIds !== this._finalCostsToGroupIds()
        ) {
            this._finalCostsToGroupIds.set(finalCostsToGroupIds);
        }
    }

    @Input() set additionalOptionIdsByClassId(
        value: Record<string, string[]> | undefined
    ) {
        if (value !== this._additionalOptionIdsByClassId?.()) {
            this._additionalOptionIdsByClassId.set(value);
        }
    }
    readonly _additionalOptionIdsByClassId = signal<
        Record<string, string[]> | undefined
    >(undefined);

    private readonly tableClassGroups = computed(() => {
        const groupIds = this._groups().map((g) => g.id);
        const enrollableSemesters = this.enrollableSemesters();
        return this.classGroups()
            ?.filter((cg) => groupIds.includes(cg.id))
            .map((group) => ({
                name: group.name,
                semester:
                    enrollableSemesters?.find(
                        (semester) =>
                            semester.id === group.classes[0].semesterId
                    )?.name ?? '--',
                _startMs: group.classes[0].startMs,
                date:
                    group.classes[0].startMs && group.classes[0].endMs
                        ? this.datePipe.transform(
                              new Date(group.classes[0].startMs),
                              'shortDate'
                          ) +
                          ' - ' +
                          this.datePipe.transform(
                              new Date(group.classes[0].endMs),
                              'shortDate'
                          )
                        : '',
                cost: this._finalCostsToGroupIds()?.[group.id] ?? group.cost,
            }));
    });

    private readonly tableClasses = computed(() => {
        const classIds = this._classes().map((c) => c.id);
        const enrollableSemesters = this.enrollableSemesters();
        const additionalOptionIdsByClassId =
            this._additionalOptionIdsByClassId() ?? {};

        return this.theClasses()
            ?.filter(
                (aClass) =>
                    !this.classGroups()?.some((cg) =>
                        cg.classes.some((c) => c.id === aClass.id)
                    )
            )
            .filter((c) => classIds.includes(c.id))
            .map((c) => {
                const selectedOptions = additionalOptionIdsByClassId[c.id]
                    ?.map((optionId) =>
                        c.additionalOptions?.find((opt) => opt.id === optionId)
                    )
                    .filter(
                        (opt): opt is NonNullable<typeof opt> =>
                            opt !== undefined
                    );

                return {
                    name: c.title,
                    semester:
                        enrollableSemesters?.find(
                            (semester) => semester.id === c.semesterId
                        )?.name ?? '--',
                    _startMs: c.startMs,
                    date:
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
                    cost: this._finalCostsToClassIds()?.[c.id] ?? c.cost,
                    additionalOptions: selectedOptions,
                };
            });
    });

    readonly classCostSummaryRows: Signal<TreeNode[] | undefined> = computed(
        () => {
            const tableClasses = this.tableClasses();
            const tableClassGroups = this.tableClassGroups();

            if (!tableClasses || !tableClassGroups) {
                return undefined;
            }

            const combinedData = [...tableClasses, ...tableClassGroups].sort(
                (a, b) => a._startMs - b._startMs
            );

            return mapToTreeTableData(combinedData);
        }
    );

    readonly isLoading = computed(() => !this.classCostSummaryRows());
}

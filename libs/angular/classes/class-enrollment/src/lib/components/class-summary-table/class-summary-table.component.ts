import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Input,
    Signal,
    signal,
} from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { switchMap, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClassListService } from '@sol/angular/classes/list';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';

interface AdditionalOption {
    id: string;
    description: string;
    cost: number;
}

interface ClassDetails {
    title: string;
    additionalOptions?: AdditionalOption[];
}

interface ClassCostSummary {
    name: string;
    semester: string;
    date: string;
    cost: number;
    _startMs: number;
    additionalOptions?: AdditionalOption[];
    classes?: ClassDetails[];
    isPartOfGroup?: boolean;
}

interface SummaryRow {
    key: string;
    name: string;
    semester: string;
    date: string;
    cost: number | '';
    level: 0 | 1 | 2;
    isOption: boolean;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-class-summary-table',
    templateUrl: './class-summary-table.component.html',
    styles: [
        `
            .summary-table-wrapper {
                min-width: 300px;
                width: 100%;
            }
            .summary-table {
                width: 100%;
            }
            .summary-table .level-0 {
                font-weight: 600;
            }
            .summary-table .level-2 {
                padding-left: 2.5rem;
                color: var(--sol-on-surface-variant, #555);
            }
            .summary-table .semester-row {
                background: var(--sol-surface-variant, #f5f5f5);
            }
            .summary-table .option-row td {
                border-top: none;
            }
            .loading {
                display: flex;
                justify-content: center;
                padding: 2rem;
            }
        `,
    ],
    imports: [CurrencyPipe, MatTableModule, MatProgressSpinnerModule, NgClass],
    providers: [DatePipe],
})
export class ClassSummaryTableComponent {
    private readonly classList = inject(ClassListService);
    private readonly datePipe = inject(DatePipe);
    private readonly semesterService = inject(ClassesSemesterListService);

    private readonly classesSignal = signal<
        Array<{ id: string; semesterId: string }>
    >([]);
    private readonly groupsSignal = signal<
        Array<{ id: string; semesterId: string }>
    >([]);
    private readonly finalCostsToClassIdsSignal = signal<
        Record<string, number | undefined> | undefined
    >(undefined);
    private readonly finalCostsToGroupIdsSignal = signal<
        Record<string, number | undefined> | undefined
    >(undefined);
    private readonly additionalOptionIdsSignal = signal<
        Record<string, string[]> | undefined
    >(undefined);

    readonly enrollableSemesters = toSignal(
        this.semesterService
            .getEnrollableSemesters()
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
    );

    readonly classGroups = toSignal(
        toObservable(this.groupsSignal).pipe(
            switchMap((groups) =>
                this.classList
                    .getClassGroups(groups)
                    .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            )
        )
    );

    readonly classesFullData = toSignal(
        toObservable(
            computed(() => [this.classesSignal(), this.classGroups()] as const)
        ).pipe(
            switchMap(([classes, groups]) =>
                this.getFilteredClasses(classes, groups)
            )
        )
    );

    readonly classCostSummaryRows: Signal<SummaryRow[] | undefined> = computed(
        () => {
            const tableData = this.prepareTableData();
            return tableData ? mapToFlatRows(tableData) : undefined;
        }
    );

    readonly isLoading = computed(() => !this.classCostSummaryRows());

    readonly displayedColumns = ['name', 'semester', 'date', 'cost'];

    @Input() set classes(classes: Array<{ id: string; semesterId: string }>) {
        this.classesSignal.set(classes);
    }

    @Input() set groups(groups: Array<{ id: string; semesterId: string }>) {
        this.groupsSignal.set(groups);
    }

    @Input() set finalCostsToClassIds(
        costs: Record<string, number | undefined> | null | undefined
    ) {
        if (costs) {
            this.finalCostsToClassIdsSignal.set(costs);
        }
    }

    @Input() set finalCostsToGroupIds(
        costs: Record<string, number | undefined> | null | undefined
    ) {
        if (costs) {
            this.finalCostsToGroupIdsSignal.set(costs);
        }
    }

    @Input() set additionalOptionIdsByClassId(
        value: Record<string, string[]> | undefined
    ) {
        this.additionalOptionIdsSignal.set(value);
    }

    private getFilteredClasses(
        classes: Array<{ id: string; semesterId: string }>,
        groups: SemesterClassGroup[] | undefined
    ) {
        if (!groups) {
            return of(undefined);
        }

        const filteredClasses = classes.filter(
            ({ id }) => !groups.some((g) => g.classes.some((c) => c.id === id))
        );

        return this.classList
            .getClasses(filteredClasses)
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded());
    }

    private prepareTableData(): ClassCostSummary[] | undefined {
        const tableClasses = this.prepareClassesData();
        const tableGroups = this.prepareGroupsData();

        if (!tableClasses || !tableGroups) {
            return undefined;
        }

        return [...tableClasses, ...tableGroups].sort(
            (a, b) => a._startMs - b._startMs
        );
    }

    private prepareClassesData(): ClassCostSummary[] | undefined {
        const classes = this.classesFullData();
        const classIds = this.classesSignal().map((c) => c.id);
        const enrollableSemesters = this.enrollableSemesters();
        const additionalOptionIdsByClassId =
            this.additionalOptionIdsSignal() ?? {};
        const selectedGroups = this.classGroups();

        if (!classes || !enrollableSemesters) {
            return undefined;
        }

        return classes
            .filter((aClass) => classIds.includes(aClass.id))
            .map((c) => {
                const isPartOfIncompleteGroup =
                    selectedGroups?.some(
                        (cg) =>
                            cg.classes.some(
                                (groupClass) => groupClass.id === c.id
                            ) &&
                            !cg.classes.every((groupClass) =>
                                classIds.includes(groupClass.id)
                            )
                    ) ?? false;

                const selectedOptions = this.getSelectedOptions(
                    c.id,
                    c.additionalOptions,
                    additionalOptionIdsByClassId
                );

                return {
                    name: c.title,
                    semester: this.getSemesterName(
                        c.semesterId,
                        enrollableSemesters
                    ),
                    _startMs: c.startMs,
                    date: this.formatDateRange(c.startMs, c.endMs),
                    cost: this.finalCostsToClassIdsSignal()?.[c.id] ?? c.cost,
                    additionalOptions: selectedOptions,
                    isPartOfGroup: isPartOfIncompleteGroup,
                };
            });
    }

    private prepareGroupsData(): ClassCostSummary[] | undefined {
        const groupIds = this.groupsSignal().map((g) => g.id);
        const enrollableSemesters = this.enrollableSemesters();
        const additionalOptionIdsByClassId =
            this.additionalOptionIdsSignal() ?? {};
        const groups = this.classGroups();

        if (!groups || !enrollableSemesters) {
            return undefined;
        }

        return groups
            .filter((cg) => groupIds.includes(cg.id))
            .map((group) => {
                const groupCost =
                    this.finalCostsToGroupIdsSignal()?.[group.id] ?? group.cost;
                const classesWithOptions = this.prepareClassesWithOptions(
                    group.classes,
                    additionalOptionIdsByClassId
                );

                return {
                    name: group.name,
                    semester: this.getSemesterName(
                        group.classes[0].semesterId,
                        enrollableSemesters
                    ),
                    _startMs: group.classes[0].startMs,
                    date: this.formatDateRange(
                        group.classes[0].startMs,
                        group.classes[0].endMs
                    ),
                    cost: groupCost,
                    classes: classesWithOptions,
                };
            });
    }

    private getSelectedOptions(
        classId: string,
        availableOptions: AdditionalOption[] | undefined,
        optionsByClassId: Record<string, string[]>
    ): AdditionalOption[] {
        return (
            optionsByClassId[classId]
                ?.map((optionId) =>
                    availableOptions?.find((opt) => opt.id === optionId)
                )
                .filter((opt): opt is AdditionalOption => opt !== undefined) ??
            []
        );
    }

    private getSemesterName(
        semesterId: string,
        enrollableSemesters: { id: string; name: string }[]
    ): string {
        return (
            enrollableSemesters.find((semester) => semester.id === semesterId)
                ?.name ?? '--'
        );
    }

    private formatDateRange(startMs: number, endMs: number): string {
        if (!startMs || !endMs) {
            return '';
        }

        const startDate = this.datePipe.transform(
            new Date(startMs),
            'shortDate'
        );
        const endDate = this.datePipe.transform(new Date(endMs), 'shortDate');
        return `${startDate} - ${endDate}`;
    }

    private prepareClassesWithOptions(
        classes: SemesterClass[],
        additionalOptionIdsByClassId: Record<string, string[]>
    ): ClassDetails[] {
        return classes.map((cls) => ({
            title: cls.title,
            additionalOptions: this.getSelectedOptions(
                cls.id,
                cls.additionalOptions,
                additionalOptionIdsByClassId
            ),
        }));
    }
}

function mapToFlatRows(data: ClassCostSummary[]): SummaryRow[] {
    const grouped = groupBySemester(data);
    const semesters = Object.entries(grouped).sort(
        ([, a], [, b]) => (a[0]?._startMs ?? 0) - (b[0]?._startMs ?? 0)
    );
    const rows: SummaryRow[] = [];
    for (const [semester, items] of semesters) {
        rows.push({
            key: semester,
            name: semester,
            semester: '',
            date: '',
            cost: '',
            level: 0,
            isOption: false,
        });
        const sortedItems = items
            .slice()
            .sort((a, b) => a._startMs - b._startMs);
        for (const item of sortedItems) {
            const itemCost = item.isPartOfGroup ? 0 : item.cost || 0;
            rows.push({
                key: `${semester}-${item.name}`,
                name: item.name,
                semester: item.semester,
                date: item.date,
                cost: itemCost,
                level: 1,
                isOption: false,
            });
            const optionRows = item.classes
                ? createGroupOptionRows(semester, item.name, item.classes)
                : createClassOptionRows(
                      semester,
                      item.name,
                      item.additionalOptions
                  );
            rows.push(...optionRows);
        }
    }
    return rows;
}

function groupBySemester(
    data: ClassCostSummary[]
): Record<string, ClassCostSummary[]> {
    return data.reduce(
        (groups, item) => {
            groups[item.semester] = groups[item.semester] || [];
            groups[item.semester].push(item);
            return groups;
        },
        {} as Record<string, ClassCostSummary[]>
    );
}

function createGroupOptionRows(
    semester: string,
    groupName: string,
    classes: ClassDetails[]
): SummaryRow[] {
    return classes.flatMap((cls) =>
        (cls.additionalOptions || []).map((option) => ({
            key: `${semester}-${groupName}-${cls.title}-${option.id}`,
            name: `${cls.title} - ${option.description}`,
            semester: '',
            date: '',
            cost: option.cost || 0,
            level: 2 as const,
            isOption: true,
        }))
    );
}

function createClassOptionRows(
    semester: string,
    className: string,
    options?: AdditionalOption[]
): SummaryRow[] {
    return (options || []).map((option) => ({
        key: `${semester}-${className}-${option.id}`,
        name: option.description,
        semester: '',
        date: '',
        cost: option.cost || 0,
        level: 2 as const,
        isOption: true,
    }));
}

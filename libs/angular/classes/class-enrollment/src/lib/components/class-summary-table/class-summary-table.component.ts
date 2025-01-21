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

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-class-summary-table',
    templateUrl: './class-summary-table.component.html',
    standalone: true,
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

    readonly classCostSummaryRows: Signal<TreeNode[] | undefined> = computed(
        () => {
            const tableData = this.prepareTableData();
            return tableData ? mapToTreeTableData(tableData) : undefined;
        }
    );

    readonly isLoading = computed(() => !this.classCostSummaryRows());

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

    private calculateGroupAdditionalOptionsCost(
        classes: SemesterClass[],
        additionalOptionIdsByClassId: Record<string, string[]>
    ): number {
        return classes.reduce((sum, cls) => {
            const selectedOptions = this.getSelectedOptions(
                cls.id,
                cls.additionalOptions,
                additionalOptionIdsByClassId
            );
            return (
                sum +
                selectedOptions.reduce(
                    (optSum, opt) => optSum + (opt.cost || 0),
                    0
                )
            );
        }, 0);
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

function mapToTreeTableData(data: ClassCostSummary[]): TreeNode[] {
    return Object.entries(groupBySemester(data))
        .map(createSemesterNode)
        .sort(sortByDate);
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

function createSemesterNode([semester, items]: [
    string,
    ClassCostSummary[],
]): TreeNode {
    return {
        key: semester,
        data: {
            name: semester,
            semester: '',
            date: '',
            cost: '',
        },
        children: items.map((item) => createClassNode(semester, item)),
        expanded: true,
    };
}

function createClassNode(semester: string, item: ClassCostSummary): TreeNode {
    const optionsCost = calculateOptionsCost(item.additionalOptions);
    const allOptions = item.classes
        ? createGroupOptionsNodes(semester, item.name, item.classes)
        : createClassOptionsNodes(semester, item.name, item.additionalOptions);

    const hasOptions = allOptions.length > 0;
    const classCost = item.isPartOfGroup ? 0 : item.cost || 0;

    return {
        key: `${semester}-${item.name}`,
        data: {
            name: item.name,
            semester: item.semester,
            date: item.date,
            cost: classCost,
            hasChildren: hasOptions,
        },
        children: allOptions,
        leaf: !hasOptions,
        expanded: hasOptions,
    };
}

function createGroupOptionsNodes(
    semester: string,
    groupName: string,
    classes: ClassDetails[]
): TreeNode[] {
    return classes.flatMap((cls) =>
        (cls.additionalOptions || []).map((option) => ({
            key: `${semester}-${groupName}-${cls.title}-${option.id}`,
            data: {
                name: `${cls.title} - ${option.description}`,
                semester: '',
                date: '',
                cost: option.cost || 0,
                isOption: true,
            },
            leaf: true,
        }))
    );
}

function createClassOptionsNodes(
    semester: string,
    className: string,
    options?: AdditionalOption[]
): TreeNode[] {
    return (options || []).map((option) => ({
        key: `${semester}-${className}-${option.id}`,
        data: {
            name: option.description,
            semester: '',
            date: '',
            cost: option.cost || 0,
            isOption: true,
        },
        leaf: true,
    }));
}

function calculateOptionsCost(options?: AdditionalOption[]): number {
    return options?.reduce((sum, opt) => sum + (opt.cost || 0), 0) || 0;
}

function sortByDate(a: TreeNode, b: TreeNode): number {
    return new Date(a.data.date).getTime() - new Date(b.data.date).getTime();
}

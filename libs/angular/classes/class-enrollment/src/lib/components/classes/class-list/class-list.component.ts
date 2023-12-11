import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Input,
    Output,
    Signal,
    signal,
} from '@angular/core';
import { combineLatest, delay, map, merge, of, shareReplay, skip } from 'rxjs';
import { EnrollmentWorkflowStore } from '../../enrollment-workflow/enrollment-workflow.store';
import { CardModule } from 'primeng/card';
import { AsyncPipe, CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { RxLet } from '@rx-angular/template/let';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { SliderModule } from 'primeng/slider';
import { AutoFocusModule } from 'primeng/autofocus';
import { InputNumberModule } from 'primeng/inputnumber';
import { ClassListService } from '@sol/angular/classes/list';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MarkdownComponent } from 'ngx-markdown';

interface ClassRow {
    classes: Array<SemesterClass & { classDateTimes: string }>;
    group?: SemesterClassGroup;
    start: Date;
}

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        NgStyle,
        CurrencyPipe,
        CardModule,
        CheckboxModule,
        InputTextModule,
        ChipModule,
        SkeletonModule,
        FormsModule,
        RxLet,
        SelectButtonModule,
        ToggleButtonModule,
        ProgressSpinnerModule,
        DropdownModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        ButtonModule,
        OverlayPanelModule,
        SliderModule,
        AutoFocusModule,
        InputNumberModule,
        MarkdownComponent,
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
    private readonly datePipe = inject(DatePipe);
    readonly workflow = inject(EnrollmentWorkflowStore);

    private search = signal('');

    private gradeFilter = signal<[] | [number, number]>([]);

    private isFakeSearchStarted$ = combineLatest([
        toObservable(this.search).pipe(skip(1)),
        toObservable(this.gradeFilter).pipe(skip(1)),
    ]).pipe(map(() => true));

    readonly isFakeSearchLoading$ = merge(
        this.isFakeSearchStarted$,
        this.isFakeSearchStarted$.pipe(
            delay(800),
            map(() => false)
        ),
        of(false)
    );

    selectedClassIds = this.workflow.selectSignal(
        (state) => state.enrollment.selectedClasses
    );

    isValid = computed(() => this.selectedClassIds().length > 0);

    isInvalid = computed(() => !this.isValid() && this._interacted());

    @Output() validityChange = toObservable(this.isValid);

    classRows: Signal<Array<ClassRow> | undefined> = toSignal(
        this.classListService.getAvailableEnrollmentClassesAndGroups().pipe(
            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
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
        ),
        { initialValue: undefined }
    );

    classes = computed(
        () =>
            this.classRows()
                ?.map((row) => row.classes)
                .reduce((a, b) => a.concat(b), [])
    );

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

    filteredClassRows = computed(() => {
        const searched = this.classRows()?.filter((row) => {
            const search = this.search();
            return !!row.classes.find(
                (c) =>
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
        const [startGrade, endGrade] = this.gradeFilter();
        const filtered =
            startGrade && endGrade
                ? searched?.filter(
                      (row) =>
                          !!row.classes.find(
                              (c) =>
                                  c.gradeRangeStart === startGrade &&
                                  c.gradeRangeEnd === endGrade
                          )
                  )
                : searched;
        return filtered?.map((row) => ({
            ...row,
            selected: row.classes.every((c) =>
                this.selectedClassIds().includes(c.id)
            ),
            classes: row.classes.map((c) => ({
                ...c,
                selected: this.selectedClassIds().includes(c.id),
                userCost: this.userCostsToSelectedClassIds()[c.id] ?? c.cost,
            })),
        }));
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

    selectionChanged(
        {
            id: classId,
            selected,
            userCost,
        }: {
            id: string;
            selected: boolean;
            userCost?: number;
        },
        overlayPanel?: OverlayPanel
    ) {
        overlayPanel?.hide();
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
                userCostsToSelectedClassIds: {
                    ...s.enrollment.userCostsToSelectedClassIds,
                    [classId]: userCost,
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

    rowSelectedChange(classRow: ClassRow, selected: boolean) {
        classRow.classes.forEach((c) =>
            this.selectionChanged({ id: c.id, selected })
        );
    }

    hasPausedClass(classRow: ClassRow): boolean {
        return classRow.classes.some((c) => c.pausedForEnrollment);
    }
}

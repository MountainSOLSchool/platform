import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Input,
    Signal,
    signal,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { switchMap, of } from 'rxjs';
import { TableModule } from 'primeng/table';
import { RxLet } from '@rx-angular/template/let';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ClassListService } from '@sol/angular/classes/list';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-class-summary-table',
    templateUrl: './class-summary-table.component.html',
    imports: [CurrencyPipe, RxLet, TableModule, ProgressSpinnerModule],
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
    private readonly _userCostsToClassIds = signal<
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
    private readonly theClasses = toSignal(
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
    @Input() set userCostsToClassIds(
        userCostsToClassIds:
            | Record<string, number | undefined>
            | null
            | undefined
    ) {
        if (
            userCostsToClassIds &&
            userCostsToClassIds !== this._userCostsToClassIds()
        ) {
            this._userCostsToClassIds.set(userCostsToClassIds);
        }
    }

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
                cost: group.cost,
            }));
    });

    private readonly tableClasses = computed(() => {
        const classIds = this._classes().map((c) => c.id);
        const enrollableSemesters = this.enrollableSemesters();
        return this.theClasses()
            ?.filter(
                (aClass) =>
                    !this.classGroups()?.some((cg) =>
                        cg.classes.some((c) => c.id === aClass.id)
                    )
            )
            .filter((c) => classIds.includes(c.id))
            .map((c) => ({
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
                cost: this._userCostsToClassIds()?.[c.id] ?? c.cost,
            }));
    });

    readonly classCostSummaryRows: Signal<
        | Array<{ name: string; semester: string; date: string; cost: number }>
        | undefined
    > = computed(() => {
        const tableClasses = this.tableClasses();
        const tableClassGroups = this.tableClassGroups();
        return tableClasses && tableClassGroups
            ? [...tableClasses, ...tableClassGroups].sort(
                  (a, b) => a._startMs - b._startMs
              )
            : undefined;
    });

    readonly isLoading = computed(() => !this.classCostSummaryRows());
}

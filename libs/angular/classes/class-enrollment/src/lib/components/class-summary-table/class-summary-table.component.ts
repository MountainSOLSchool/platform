import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
    BehaviorSubject,
    map,
    Observable,
    shareReplay,
    startWith,
    switchMap,
    combineLatest,
    take,
} from 'rxjs';
import { TableModule } from 'primeng/table';
import { RxLet } from '@rx-angular/template/let';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ClassListService } from '@sol/angular/classes/list';
import { RequestedOperatorsUtility } from '@sol/angular/request';

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

    private readonly classes$ = new BehaviorSubject(
        new Array<{ id: string; semesterId: string }>()
    );
    private readonly groups$ = new BehaviorSubject(
        new Array<{ id: string; semesterId: string }>()
    );
    private readonly userCostsToClassIds$ = new BehaviorSubject<
        Record<string, number | undefined> | undefined
    >(undefined);

    @Input() set classes(classes: Array<{ id: string; semesterId: string }>) {
        this.classes$.next(classes);
    }
    @Input() set groups(groups: Array<{ id: string; semesterId: string }>) {
        this.groups$.next(groups);
    }
    @Input() set userCostsToClassIds(
        userCostsToClassIds:
            | Record<string, number | undefined>
            | null
            | undefined
    ) {
        if (userCostsToClassIds) {
            this.userCostsToClassIds$.next(userCostsToClassIds);
        }
    }

    readonly classCostSummaryRows$: Observable<
        | Array<{ name: string; semester: string; date: string; cost: number }>
        | undefined
    > = combineLatest([
        this.classes$,
        this.groups$,
        this.userCostsToClassIds$,
    ]).pipe(
        take(1),
        switchMap(([classes, groups, userCostsToClassIds]) => {
            const classGroups$ = this.classList
                .getClassGroups(groups)
                .pipe(
                    RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                    shareReplay()
                );
            const groupIds = groups.map((g) => g.id);
            const tableClassGroups$ = classGroups$.pipe(
                map((classGroups) => {
                    return classGroups
                        .filter((cg) => groupIds.includes(cg.id))
                        .map((group) => ({
                            name: group.name,
                            semester: group.classes[0].semesterId,
                            date:
                                group.classes[0].startMs &&
                                group.classes[0].endMs
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
                })
            );
            const classIds = classes.map((c) => c.id);
            const tableClasses$ = classGroups$.pipe(
                take(1),
                switchMap((groups) => {
                    console.log('getting again');
                    return this.classList
                        .getClasses(
                            classes.filter(
                                ({ id }) =>
                                    !groups.some((g) =>
                                        g.classes.some((c) => c.id === id)
                                    )
                            )
                        )
                        .pipe(
                            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                            map((classes) => {
                                return classes
                                    .filter((c) => classIds.includes(c.id))
                                    .map((c) => ({
                                        name: c.title,
                                        semester: c.semesterId,
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
                                        cost:
                                            userCostsToClassIds?.[c.id] ??
                                            c.cost,
                                    }));
                            })
                        );
                })
            );
            return combineLatest([tableClasses$, tableClassGroups$]).pipe(
                map(([classes, classGroups]) =>
                    [...classes, ...classGroups].sort((a, b) =>
                        a.name.localeCompare(b.name)
                    )
                )
            );
        }),
        startWith(undefined)
    );
}

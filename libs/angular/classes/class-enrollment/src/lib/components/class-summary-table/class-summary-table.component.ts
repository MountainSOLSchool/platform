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

    private readonly classIds$ = new BehaviorSubject(new Array<string>());
    private readonly groupIds$ = new BehaviorSubject(new Array<string>());
    private readonly userCostsToClassIds$ = new BehaviorSubject<
        Record<string, number | undefined> | undefined
    >(undefined);

    @Input() set classIds(ids: Array<string>) {
        this.classIds$.next(ids);
    }
    @Input() set groupIds(ids: Array<string>) {
        this.groupIds$.next(ids);
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
        this.classIds$,
        this.groupIds$,
        this.userCostsToClassIds$,
    ]).pipe(
        switchMap(([classIds, groupIds, userCostsToClassIds]) => {
            const classGroups$ = this.classList
                .getClassGroupsByIds(groupIds)
                .pipe(
                    RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                    shareReplay()
                );
            const tableClassGroups$ = classGroups$.pipe(
                map((classGroups) => {
                    return classGroups
                        .filter((c) => groupIds.includes(c.id))
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
            const tableClasses$ = classGroups$.pipe(
                switchMap((groups) => {
                    return this.classList
                        .getClassesByIds(
                            classIds.filter(
                                (id) =>
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

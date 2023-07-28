import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
    BehaviorSubject,
    map,
    Observable,
    shareReplay,
    startWith,
    switchMap,
    combineLatest,
} from 'rxjs';
import { ClassListService } from '../../services/class-list.service';
import { TableModule } from 'primeng/table';
import { RxLet } from '@rx-angular/template/let';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-class-summary-table',
    templateUrl: './class-summary-table.component.html',
    imports: [CommonModule, RxLet, TableModule, ProgressSpinnerModule],
    providers: [DatePipe],
})
export class ClassSummaryTableComponent {
    private readonly classList = inject(ClassListService);
    private readonly datePipe = inject(DatePipe);

    private readonly classIds$ = new BehaviorSubject(new Array<string>());
    private readonly groupIds$ = new BehaviorSubject(new Array<string>());

    @Input() set classIds(ids: Array<string>) {
        this.classIds$.next(ids);
    }
    @Input() set groupIds(ids: Array<string>) {
        this.groupIds$.next(ids);
    }

    readonly classCostSummaryRows$: Observable<
        Array<{ name: string; date: string; cost: number }> | undefined
    > = combineLatest([this.classIds$, this.groupIds$]).pipe(
        switchMap(([classIds, groupIds]) => {
            const classGroups$ = this.classList
                .getClassGroupsByIds(groupIds)
                .pipe(shareReplay());
            const tableClassGroups$ = classGroups$.pipe(
                map((classGroups) => {
                    return classGroups
                        .filter((c) => groupIds.includes(c.id))
                        .map((group) => ({
                            name: group.name,
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
                            map((classes) => {
                                return classes
                                    .filter((c) => classIds.includes(c.id))
                                    .map((c) => ({
                                        name: c.title,
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
                                        cost: c.cost,
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

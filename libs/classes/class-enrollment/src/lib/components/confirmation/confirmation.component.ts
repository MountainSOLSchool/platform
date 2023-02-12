import { CommonModule, DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
} from '@angular/core';
import { LetModule } from '@rx-angular/template/let';
import { ChipModule } from 'primeng/chip';
import {
    BehaviorSubject,
    combineLatest,
    filter,
    map,
    Observable,
    of,
    shareReplay,
    startWith,
    Subject,
    switchMap,
    tap,
} from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { ClassListService } from '../../services/class-list.service';
import { ForModule } from '@rx-angular/template/for';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IfModule } from '@rx-angular/template/if';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { CheckoutComponent } from '../checkout/checkout.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ClassSummaryTableComponent } from '../class-summary-table/class-summary-table.component';
@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ChipModule,
        LetModule,
        ForModule,
        IfModule,
        FieldsetModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        ProgressSpinnerModule,
        TagModule,
        TableModule,
        CheckoutComponent,
        ClassSummaryTableComponent,
    ],
    providers: [DatePipe],
    selector: 'sol-class-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);
    private readonly classList = inject(ClassListService);
    private readonly datePipe = inject(DatePipe);

    readonly userEmail$ = inject(AngularFireAuth).user.pipe(
        map((user) => user?.email),
        filter((email): email is string => !!email)
    );

    _allStepsComplete = false;

    get allStepsComplete() {
        return this._allStepsComplete;
    }
    @Input() set allStepsComplete(complete: boolean) {
        this._allStepsComplete = complete;
    }

    @Input() interacted = false;

    @Output() validityChange = new Subject<boolean>();

    thing = this.validityChange
        .pipe(tap((change) => console.log('changed', change)))
        .subscribe();

    private readonly enrollment$ = this.workflow.select(
        ({ enrollment }) => enrollment
    );
    private readonly basketCosts$ = this.workflow.select(
        ({ basketCosts }) => basketCosts
    );

    private readonly validDiscountCodes$ = this.basketCosts$.pipe(
        map((c) => c.discountAmounts.map(({ code }) => code))
    );

    private readonly validDiscountAmounts$ = this.basketCosts$.pipe(
        map((c) => c.discountAmounts)
    );

    private readonly invalidDiscountCodes$ = combineLatest([
        this.validDiscountCodes$,
        this.enrollment$,
    ]).pipe(
        map(([validCodes, enrollment]) =>
            enrollment.discountCodes.filter(
                (code) => !validCodes.includes(code)
            )
        )
    );
    private readonly classCostSummaryRows$: Observable<
        Array<{ name: string; date: string; cost: number }> | undefined
    > = this.enrollment$.pipe(
        switchMap((enrollment) => {
            const classGroups$ = this.classList
                .getClassGroupsByIds(enrollment.selectedClassGroups)
                .pipe(shareReplay());
            const tableClassGroups$ = classGroups$.pipe(
                map((classGroups) => {
                    return classGroups
                        .filter((c) =>
                            enrollment.selectedClassGroups.includes(c.id)
                        )
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
                            enrollment.selectedClasses.filter(
                                (id) =>
                                    !groups.some((g) =>
                                        g.classes.some((c) => c.id === id)
                                    )
                            )
                        )
                        .pipe(
                            map((classes) => {
                                return classes
                                    .filter((c) =>
                                        enrollment.selectedClasses.includes(
                                            c.id
                                        )
                                    )
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

    readonly viewModel$ = combineLatest([
        this.enrollment$,
        this.basketCosts$,
        this.validDiscountAmounts$,
        this.invalidDiscountCodes$,
        this.classCostSummaryRows$,
        this.workflow.select(({ isLoadingDiscounts }) => isLoadingDiscounts),
    ]).pipe(
        map(
            ([
                enrollment,
                basketCosts,
                validDiscountAmounts,
                invalidCodes,
                classCostSummaryRows,
                isLoadingDiscounts,
            ]) => ({
                enrollment,
                basketCosts,
                validDiscountAmounts,
                invalidCodes,
                classCostSummaryRows,
                isLoadingDiscounts,
            })
        )
    );

    student$ = this.enrollment$.pipe(map((enrollment) => enrollment.student));

    readonly randomValueThatResetsPaymentCollector$ = this.workflow.select(
        (s) => s.randomValueThatResetsPaymentCollector
    );

    submit() {
        this.workflow.submit();
    }

    applyDiscountCode(codeElement: HTMLInputElement) {
        const code = codeElement.value.toUpperCase();
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                discountCodes: Array.from(
                    new Set([...s.enrollment.discountCodes, code])
                ),
            },
        }));

        codeElement.value = '';
    }

    removeDiscountCode(code: string) {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                discountCodes: s.enrollment.discountCodes.filter(
                    (c) => c !== code
                ),
            },
        }));
    }
}

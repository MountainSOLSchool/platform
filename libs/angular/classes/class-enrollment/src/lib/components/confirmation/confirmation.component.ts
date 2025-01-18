import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Input,
    Output,
} from '@angular/core';
import { RxLet } from '@rx-angular/template/let';
import { ChipModule } from 'primeng/chip';
import { combineLatest, filter, map, Subject, tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { RxFor } from '@rx-angular/template/for';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RxIf } from '@rx-angular/template/if';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ClassSummaryTableComponent } from '../class-summary-table/class-summary-table.component';
import { UserService } from '@sol/auth/user';
import { ClassListService } from '@sol/angular/classes/list';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DatePipe,
        CurrencyPipe,
        ChipModule,
        RxLet,
        RxFor,
        RxIf,
        FieldsetModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        ProgressSpinnerModule,
        TagModule,
        TableModule,
        CheckoutComponent,
        ClassSummaryTableComponent,
        DatePipe,
        JsonPipe,
    ],
    providers: [],
    selector: 'sol-class-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);
    private readonly classList = inject(ClassListService);

    readonly userEmail$ = inject(UserService)
        .getUser()
        .pipe(
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

    private bySemester = toSignal(
        this.classList
            .getAvailableEnrollmentClassesAndGroups()
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
    );

    readonly finalTotal = toSignal(
        this.basketCosts$.pipe(
            map(({ finalTotal }) => finalTotal),
            tap((total) => {
                if (!total) {
                    this.validityChange.next(true);
                }
            })
        )
    );

    private readonly enrollmentSignal = toSignal(this.enrollment$);

    readonly selectedClassGroups = computed(() => {
        const enrollment = this.enrollmentSignal();
        const bySemester = this.bySemester();
        return bySemester && enrollment
            ? Object.entries(bySemester)
                  .flatMap(([semesterId, { groups }]) =>
                      groups.map((group) => ({ semesterId, group }))
                  )
                  .filter(({ group: { classes } }) =>
                      classes.every(
                          ({ id, semesterId }) =>
                              !!enrollment.selectedClasses.find(
                                  (selectedClass) =>
                                      selectedClass.id === id &&
                                      selectedClass.semesterId === semesterId
                              )
                      )
                  )
                  .map(({ semesterId, group }) => ({
                      id: group.id,
                      semesterId,
                  }))
            : undefined;
    });

    private selectedClasses = computed(() => {
        const enrollment = this.enrollmentSignal();
        const bySemester = this.bySemester();
        return bySemester && enrollment
            ? Object.entries(bySemester)
                  .flatMap(([semesterId, { classes }]) =>
                      classes.map((aClass) => ({ semesterId, aClass }))
                  )
                  .filter(({ aClass: { id, semesterId } }) =>
                      enrollment.selectedClasses.some(
                          (selectedClass) =>
                              selectedClass.id === id &&
                              selectedClass.semesterId === semesterId
                      )
                  )
                  .map(({ aClass }) => aClass)
            : undefined;
    });

    private selectedGroups = computed(() => {
        const enrollment = this.enrollmentSignal();
        const bySemester = this.bySemester();
        return bySemester && enrollment
            ? Object.entries(bySemester)
                  .flatMap(([semesterId, { groups }]) =>
                      groups.map((group) => ({ semesterId, group }))
                  )
                  .filter(({ group: { classes } }) =>
                      classes.every(
                          ({ id, semesterId }) =>
                              !!enrollment.selectedClasses.find(
                                  (selectedClass) =>
                                      selectedClass.id === id &&
                                      selectedClass.semesterId === semesterId
                              )
                      )
                  )
                  .map(({ group }) => group)
            : undefined;
    });

    readonly additionalCostsToClassIds = computed(() => {
        const selectedClasses = this.selectedClasses();
        const additionalOptionIdsByClassId = this.workflow.selectSignal(
            ({ enrollment: { additionalOptionIdsByClassId } }) =>
                additionalOptionIdsByClassId
        )();
        return (selectedClasses ?? []).reduce(
            (acc, { id, additionalOptions }) => ({
                ...acc,
                [id]: additionalOptionIdsByClassId[id]
                    ? additionalOptionIdsByClassId[id]
                          .map((id) =>
                              additionalOptions?.find((o) => o.id === id)
                          )
                          .reduce((agg, o) => agg + (o?.cost ?? 0), 0)
                    : 0,
            }),
            {} as Record<string, number>
        );
    });

    readonly finalCostsToClassIds = computed(() => {
        const selectedClasses = this.selectedClasses();
        const userCostsToSelectedClassIds = this.workflow.selectSignal(
            ({ enrollment: { userCostsToSelectedClassIds } }) =>
                userCostsToSelectedClassIds
        )();
        return userCostsToSelectedClassIds
            ? Object.entries(userCostsToSelectedClassIds).reduce(
                  (acc, [classId, userCost]) => ({
                      ...acc,
                      [classId]:
                          (selectedClasses?.find((c) => c.id === classId)
                              ?.cost ?? 0) + (userCost ?? 0),
                  }),
                  {}
              )
            : undefined;
    });

    readonly finalCostsToGroupIds = computed(() => {
        const selectedGroups = this.selectedGroups();
        const additionalOptionIdsByClassId = this.workflow.selectSignal(
            ({ enrollment: { additionalOptionIdsByClassId } }) =>
                additionalOptionIdsByClassId
        )();
        return (selectedGroups ?? []).reduce(
            (acc, { id, classes, cost }) => {
                return {
                    ...acc,
                    [id]: classes.reduce((agg, { id, additionalOptions }) => {
                        return (
                            agg +
                            (additionalOptionIdsByClassId[id]
                                ? additionalOptionIdsByClassId[id]
                                      .map((id) =>
                                          additionalOptions?.find(
                                              (o) => o.id === id
                                          )
                                      )
                                      .reduce(
                                          (agg, o) => agg + (o?.cost ?? 0),
                                          0
                                      )
                                : 0)
                        );
                    }, cost),
                };
            },
            {} as Record<string, number>
        );
    });

    readonly viewModel$ = combineLatest([
        this.enrollment$,
        this.basketCosts$,
        this.validDiscountAmounts$,
        this.invalidDiscountCodes$,
        this.workflow.select(({ isLoadingDiscounts }) => isLoadingDiscounts),
    ]).pipe(
        map(
            ([
                enrollment,
                basketCosts,
                validDiscountAmounts,
                invalidCodes,
                isLoadingDiscounts,
            ]) => ({
                enrollment,
                basketCosts,
                validDiscountAmounts,
                invalidCodes,
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

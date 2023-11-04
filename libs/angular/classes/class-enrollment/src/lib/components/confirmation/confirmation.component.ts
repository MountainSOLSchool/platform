import { CommonModule, DatePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
} from '@angular/core';
import { RxLet } from '@rx-angular/template/let';
import { ChipModule } from 'primeng/chip';
import { combineLatest, filter, map, Subject } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { ClassListService } from '../../services/class-list.service';
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
@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
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

    private readonly selectedClassGroupIds$ = combineLatest([
        this.classList.getAvailableEnrollmentClassesAndGroups(),
        this.enrollment$,
    ]).pipe(
        map(([{ groups }, { selectedClasses }]) => {
            return groups
                .filter(({ classes }) =>
                    classes.every(({ id }) => selectedClasses.includes(id))
                )
                .map((group) => group.id);
        })
    );

    private readonly userCostsToClassIds$ = this.workflow.select(
        ({ enrollment: { userCostsToSelectedClassIds } }) =>
            userCostsToSelectedClassIds
    );

    readonly viewModel$ = combineLatest([
        this.enrollment$,
        this.basketCosts$,
        this.validDiscountAmounts$,
        this.invalidDiscountCodes$,
        this.workflow.select(({ isLoadingDiscounts }) => isLoadingDiscounts),
        this.selectedClassGroupIds$,
        this.userCostsToClassIds$,
    ]).pipe(
        map(
            ([
                enrollment,
                basketCosts,
                validDiscountAmounts,
                invalidCodes,
                isLoadingDiscounts,
                selectedClassGroupIds,
                userCostsToClassIds,
            ]) => ({
                enrollment,
                basketCosts,
                validDiscountAmounts,
                invalidCodes,
                isLoadingDiscounts,
                selectedClassGroupIds,
                userCostsToClassIds,
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

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { Observable, map, shareReplay } from 'rxjs';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { SemesterEnrollment } from '@sol/classes/domain';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RequestedOperatorsUtility } from '@sol/angular/request';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        CurrencyPipe,
        ProgressBarModule,
        TableModule,
        ButtonModule,
        RippleModule,
        DatePipe,
    ],
    templateUrl: './enrollments.component.html',
})
export class EnrollmentsComponent {
    private readonly functionsApi = inject(FirebaseFunctionsService);

    readonly enrollments$ = inject(FirebaseFunctionsService)
        .call<Array<SemesterEnrollment>>('adminEnrollments')
        .pipe(
            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
            map((enrollments) => {
                return enrollments
                    .concat()
                    .sort((a, b) => b.timestamp._seconds - a.timestamp._seconds)
                    .map((enrollment) => ({
                        ...enrollment,
                        date: enrollment.timestamp._seconds * 1000,
                        ...enrollment.discounts
                            .map((discount, i) => ({
                                [`discount${i}_description`]:
                                    discount.description,
                                [`discount${i}_amount`]: discount.amount,
                            }))
                            .reduce((acc, cur) => ({ ...acc, ...cur }), {}),
                    }));
            }),
            shareReplay()
        );

    readonly longestDiscounts$: Observable<Array<number>> =
        this.enrollments$.pipe(
            map((enrollments) =>
                enrollments.reduce(
                    (greatest: number, enrollment) =>
                        enrollment.discounts?.length > greatest
                            ? enrollment.discounts.length
                            : greatest,
                    0
                )
            ),
            map((longest) => Array.from(new Array(longest)))
        );

    readonly columns$ = this.longestDiscounts$.pipe(
        map((longest) => [
            { field: 'studentName', header: 'Student Name' },
            { field: 'date', header: 'Date' },
            { field: 'finalCost', header: 'Final Cost' },
            ...longest.map((_, i) => ({
                field: `discount${i}_description`,
                header: `Discount ${i + 1} Name`,
            })),
            ...longest.map((_, i) => ({
                field: `discount${i}_amount`,
                header: `Discount ${i + 1} Amount`,
            })),
        ])
    );
}

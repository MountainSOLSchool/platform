import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { map, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { RxLet } from '@rx-angular/template/let';
import { SemesterEnrollment } from '@sol/classes/domain';
import { RxFor } from '@rx-angular/template/for';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ProgressBarModule,
        TableModule,
        RxLet,
        RxFor,
        ButtonModule,
        RippleModule,
    ],
    templateUrl: './enrollments.component.html',
})
export class EnrollmentsComponent {
    private readonly functionsApi = inject(FunctionsApi);

    readonly enrollments$ = inject(FunctionsApi)
        .call<Array<SemesterEnrollment>>('adminEnrollments')
        .pipe(
            map((enrollments) => {
                return enrollments.map((enrollment) => ({
                    ...enrollment,
                    ...enrollment.discounts
                        .map((discount, i) => ({
                            [`discount${i}_description`]: discount.description,
                            [`discount${i}_amount`]: discount.amount,
                        }))
                        .reduce((acc, cur) => ({ ...acc, ...cur }), {}),
                }));
            }),
            shareReplay()
        );

    readonly longestDiscounts$ = this.enrollments$.pipe(
        map((enrollments) =>
            enrollments.reduce(
                (greatest: number, enrollment: any) =>
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

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { Observable, map, shareReplay, firstValueFrom, Subject, switchMap, startWith } from 'rxjs';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { SemesterEnrollment } from '@sol/classes/domain';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { MatButtonModule } from '@angular/material/button';
import { Dialog } from '@angular/cdk/dialog';
import {
    ConfirmRevokeDialogComponent,
    ConfirmRevokeDialogData,
    ConfirmRevokeDialogResult,
} from './confirm-revoke-dialog.component';
import { MountainSolApiService } from '@sol/angular/firebase/api';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        CurrencyPipe,
        ProgressBarModule,
        TableModule,
        ButtonModule,
        RippleModule,
        DatePipe,
        MatButtonModule,
    ],
    templateUrl: './enrollments.component.html',
})
export class EnrollmentsComponent {
    readonly #functions = inject(FirebaseFunctionsService);
    readonly #dialog = inject(Dialog);
    readonly #api = inject(MountainSolApiService);
    readonly #refreshTrigger = new Subject<void>();

    readonly revoking = signal<string | null>(null);
    readonly revokeError = signal<string | null>(null);

    readonly enrollments$ = this.#refreshTrigger.pipe(
        startWith(undefined),
        switchMap(() =>
            this.#functions
                .call<Array<SemesterEnrollment>>('adminEnrollments')
                .pipe(
                    RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                )
        ),
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
            { field: 'status', header: 'Status' },
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

    async confirmRevoke(enrollment: SemesterEnrollment & { date: number }) {
        const classes = 'classes' in enrollment
            ? enrollment.classes
            : [];

        const dialogRef = this.#dialog.open<
            ConfirmRevokeDialogResult | undefined,
            ConfirmRevokeDialogData
        >(ConfirmRevokeDialogComponent, {
            width: '450px',
            data: {
                enrollmentId: enrollment.id,
                studentName: enrollment.studentName,
                finalCost: enrollment.finalCost,
                classes,
            },
        });

        const result = await firstValueFrom(dialogRef.closed);
        if (result) {
            this.revoking.set(enrollment.id);
            this.revokeError.set(null);
            try {
                await firstValueFrom(
                    this.#api.revokeEnrollment({
                        enrollmentId: enrollment.id,
                        classIdsToRevoke: result.classIdsToRevoke,
                        refundAmount: result.refundAmount,
                    })
                );
                this.#refreshTrigger.next();
            } catch {
                this.revokeError.set(
                    'Revocation failed. The refund may not have been processed — check Braintree before retrying.'
                );
            } finally {
                this.revoking.set(null);
            }
        }
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    signal,
    viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import {
    Subject,
    firstValueFrom,
    map,
    shareReplay,
    startWith,
    switchMap,
} from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SemesterEnrollment } from '@sol/classes/domain';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Dialog } from '@angular/cdk/dialog';
import {
    ConfirmRevokeDialogComponent,
    ConfirmRevokeDialogData,
    ConfirmRevokeDialogResult,
} from './confirm-revoke-dialog.component';
import { MountainSolApiService } from '@sol/angular/firebase/api';

type EnrollmentRow = SemesterEnrollment & {
    date: number;
    classNamesDisplay: string;
    [key: `discount${number}_description`]: string | undefined;
    [key: `discount${number}_amount`]: number | undefined;
};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CurrencyPipe,
        DatePipe,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
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

    readonly enrollments = toSignal(
        this.#refreshTrigger.pipe(
            startWith(undefined),
            switchMap(() =>
                this.#functions
                    .call<Array<SemesterEnrollment>>('adminEnrollments')
                    .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            ),
            map<Array<SemesterEnrollment>, Array<EnrollmentRow>>(
                (enrollments) =>
                    enrollments
                        .concat()
                        .sort(
                            (a, b) =>
                                b.timestamp._seconds - a.timestamp._seconds
                        )
                        .map((enrollment) => ({
                            ...enrollment,
                            date: enrollment.timestamp._seconds * 1000,
                            classNamesDisplay:
                                enrollment.classNames?.join(', ') ?? '',
                            ...enrollment.discounts
                                .map((discount, i) => ({
                                    [`discount${i}_description`]:
                                        discount.description,
                                    [`discount${i}_amount`]: discount.amount,
                                }))
                                .reduce(
                                    (acc, cur) => ({ ...acc, ...cur }),
                                    {} as Record<string, unknown>
                                ),
                        })) as Array<EnrollmentRow>
            ),
            shareReplay()
        )
    );

    readonly longestDiscounts = computed(() =>
        (this.enrollments() ?? []).reduce(
            (greatest, enrollment) =>
                enrollment.discounts?.length > greatest
                    ? enrollment.discounts.length
                    : greatest,
            0
        )
    );

    readonly discountIndexes = computed(() =>
        Array.from({ length: this.longestDiscounts() }, (_, i) => i)
    );

    readonly displayedColumns = computed(() => [
        'studentName',
        'date',
        'classNamesDisplay',
        'finalCost',
        'status',
        ...this.discountIndexes().flatMap((i) => [
            `discount${i}_description`,
            `discount${i}_amount`,
        ]),
        'actions',
    ]);

    readonly dataSource = new MatTableDataSource<EnrollmentRow>([]);
    readonly sort = viewChild(MatSort);
    readonly paginator = viewChild(MatPaginator);

    constructor() {
        effect(() => {
            this.dataSource.data = this.enrollments() ?? [];
        });
        effect(() => {
            const s = this.sort();
            const p = this.paginator();
            if (s) this.dataSource.sort = s;
            if (p) this.dataSource.paginator = p;
        });
    }

    async confirmRevoke(enrollment: EnrollmentRow) {
        const classes = 'classes' in enrollment ? enrollment.classes : [];

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

    exportToCsv() {
        const rows = this.dataSource.data;
        if (rows.length === 0) return;
        const cols = this.displayedColumns().filter((c) => c !== 'actions');
        const header = cols.join(',');
        const escape = (v: unknown) =>
            v === undefined || v === null
                ? ''
                : `"${String(v).replace(/"/g, '""')}"`;
        const body = rows
            .map((r) =>
                cols
                    .map((c) =>
                        c === 'date'
                            ? escape(new Date(r.date).toLocaleDateString())
                            : escape((r as Record<string, unknown>)[c])
                    )
                    .join(',')
            )
            .join('\n');
        const blob = new Blob([`${header}\n${body}`], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'enrollments.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
}

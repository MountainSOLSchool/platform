import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
} from '@angular/core';

import { SemesterEnrollment } from '@sol/classes/domain';
import { ClassSummaryTableComponent } from '@sol/classes/enrollment';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'sol-enrollment-view',
    template: `@let enrollmentValue = enrollment();
    <p-card [header]="enrollmentValue.studentName">
        @if (enrollmentValue.enrollmentType === 'addendum') {
            <p style="color: #1565c0; font-weight: 500; margin-bottom: 0.5rem;">
                Addendum to existing enrollment
            </p>
        }
        <p>
            <b>{{ enrollmentValue.enrollmentType === 'addendum' ? 'Amount charged:' : 'Final cost:' }}</b>
            <br />{{ enrollmentValue.finalCost | currency }}
            {{ enrollmentValue.enrollmentType === 'addendum' ? '(Additional charges only)' : '(Includes additional options and discounts)' }}
        </p>
        <p>
            <b>Date:</b><br />
            {{ enrollmentValue.timestamp._seconds * 1000 | date: 'short' }}
        </p>
        <p>
            <b>Transaction ID:</b>
            {{
                enrollmentValue.transactionId === ''
                    ? 'Paid by Check'
                    : enrollmentValue.transactionId
            }}
        </p>
        <p><b>{{ enrollmentValue.enrollmentType === 'addendum' ? 'Changes:' : 'Classes:' }}</b></p>
        <sol-class-summary-table
            [classes]="assertHasClasses(enrollmentValue) ? enrollmentValue.classes : []"
            [additionalOptionIdsByClassId]="enrollmentValue.additionalOptionIdsByClassId ?? {}"
        ></sol-class-summary-table>
        @if (canAddToEnrollment()) {
            <div style="margin-top: 1rem;">
                <a mat-raised-button
                   color="primary"
                   [routerLink]="['/classes/enrollment/addendum', enrollmentValue.id]">
                    <mat-icon>add</mat-icon>
                    Add to Enrollment
                </a>
            </div>
        }
    </p-card>`,
    imports: [
        ClassSummaryTableComponent,
        CurrencyPipe,
        CardModule,
        DatePipe,
        MatButtonModule,
        MatIconModule,
        RouterLink,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentComponent {
    readonly enrollment = input.required<SemesterEnrollment>();
    readonly enrollableSemesterIds = input<Array<string>>([]);

    readonly canAddToEnrollment = computed(() => {
        const enrollment = this.enrollment();
        if (enrollment.enrollmentType === 'addendum') return false;
        const enrollableIds = this.enrollableSemesterIds();
        if (enrollableIds.length === 0) return false;
        if ('classes' in enrollment) {
            return enrollment.classes.some((c) =>
                enrollableIds.includes(c.semesterId)
            );
        }
        return false;
    });

    assertHasClasses(
        enrollment: SemesterEnrollment
    ): enrollment is SemesterEnrollment & {
        classes: Array<{ id: string; semesterId: string }>;
    } {
        return 'classes' in enrollment;
    }
}

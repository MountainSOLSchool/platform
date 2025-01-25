import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SemesterEnrollment } from '@sol/classes/domain';
import { ClassSummaryTableComponent } from '@sol/classes/enrollment';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'sol-enrollment-view',
    template: `@let enrollmentValue = enrollment();
    <p-card [header]="enrollmentValue.studentName">
        <p>
            <b>Final cost:</b>
            <br />{{ enrollmentValue.finalCost | currency }} (Includes additional
            options and discounts)
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
        <p><b>Classes:</b></p>
        <!-- TODO: how to display historical data? -->
        <sol-class-summary-table
            [classes]="assertHasClasses(enrollmentValue) ? enrollmentValue.classes : []"
        ></sol-class-summary-table>
    </p-card>`,
    imports: [ClassSummaryTableComponent, CurrencyPipe, CardModule, DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentComponent {
    readonly enrollment = input.required<SemesterEnrollment>();

    assertHasClasses(
        enrollment: SemesterEnrollment
    ): enrollment is SemesterEnrollment & {
        classes: Array<{ id: string; semesterId: string }>;
    } {
        return 'classes' in enrollment;
    }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SemesterEnrollment } from '@sol/classes/domain';
import { ClassSummaryTableComponent } from '@sol/classes/enrollment';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'sol-enrollment-view',
    template: `<p-card [header]="enrollment.studentName">
        <p>
            <b>Final cost:</b>
            <br />{{ enrollment.finalCost | currency }} (Includes additional
            options and discounts)
        </p>
        <p>
            <b>Date:</b><br />
            {{ enrollment.timestamp._seconds * 1000 | date: 'short' }}
        </p>
        <p>
            <b>Transaction ID:</b>
            {{
                enrollment.transactionId === ''
                    ? 'Paid by Check'
                    : enrollment.transactionId
            }}
        </p>
        <p><b>Classes:</b></p>
        <!-- TODO: how to display historical data? -->
        <sol-class-summary-table
            [classes]="assertHasClasses(enrollment) ? enrollment.classes : []"
        ></sol-class-summary-table>
    </p-card>`,
    imports: [ClassSummaryTableComponent, CurrencyPipe, CardModule, DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentViewComponent {
    @Input({ required: true })
    enrollment!: SemesterEnrollment;

    assertHasClasses(
        enrollment: SemesterEnrollment
    ): enrollment is SemesterEnrollment & {
        classes: Array<{ id: string; semesterId: string }>;
    } {
        return 'classes' in enrollment;
    }
}

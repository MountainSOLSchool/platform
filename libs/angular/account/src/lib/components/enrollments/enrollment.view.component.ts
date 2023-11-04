import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SemesterEnrollment } from '@sol/classes/domain';
import { ClassSummaryTableComponent } from '@sol/classes/enrollment';
import { CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'sol-enrollment-view',
    template: `<p-card [header]="enrollment.studentName">
        <p>
            <b>Final cost:</b>
            {{ enrollment.finalCost | currency }}
        </p>
        <p>
            <b>Transaction Id:</b>
            {{ enrollment.transactionId }}
        </p>
        <p><b>Classes:</b></p>
        <sol-class-summary-table
            [classIds]="enrollment.classIds"
        ></sol-class-summary-table>
    </p-card>`,
    imports: [ClassSummaryTableComponent, CurrencyPipe, CardModule],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentViewComponent {
    @Input({ required: true })
    enrollment!: SemesterEnrollment;
}

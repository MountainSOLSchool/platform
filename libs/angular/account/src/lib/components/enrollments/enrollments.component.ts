import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FunctionsApi } from '@sol/firebase/functions-api';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { LetModule } from '@rx-angular/template/let';
import { SemesterEnrollment } from '@sol/classes/domain';
import { ClassSummaryTableComponent } from '../../../../../classes/class-enrollment/src/lib/components/class-summary-table/class-summary-table.component';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h2>Enrollments</h2>
        <ng-container *rxLet="enrollments$; let enrollments; suspense: skeleton"
            ><ng-container *ngIf="enrollments.length > 0; else none"
                ><div
                    style="margin-top: 2rem"
                    *ngFor="let enrollment of enrollments$ | async"
                >
                    <p-card [header]="enrollment.studentName + ', Summer 2023'">
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
                    </p-card></div></ng-container
            ><ng-template #none
                >You have no enrollments.</ng-template
            ></ng-container
        >
        <ng-template #skeleton>
            <div class="flex mb-3">
                <div>
                    <p-skeleton width="10rem" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="5rem" styleClass="mb-2"></p-skeleton>
                    <p-skeleton height=".5rem"></p-skeleton>
                </div>
            </div>
            <p-skeleton width="100%" height="150px"></p-skeleton>
            <div class="flex justify-content-between mt-3">
                <p-skeleton width="4rem" height="2rem"></p-skeleton>
                <p-skeleton width="4rem" height="2rem"></p-skeleton>
            </div>
        </ng-template>
    `,
    styles: [
        `
            .custom-skeleton {
                border: 1px solid var(--surface-d);
                border-radius: 4px;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 2rem;
                width: 50rem;
            }

            .custom-skeleton ul {
                list-style: none;
            }
        `,
    ],
    imports: [
        CommonModule,
        CardModule,
        SkeletonModule,
        LetModule,
        ClassSummaryTableComponent,
    ],
})
export class AccountEnrollmentsComponent {
    readonly enrollments$ =
        inject(FunctionsApi).call<Array<SemesterEnrollment>>('enrollments');
}

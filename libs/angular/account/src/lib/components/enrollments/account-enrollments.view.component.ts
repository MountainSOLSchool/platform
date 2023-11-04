import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SemesterEnrollment } from '@sol/classes/domain';
import {
    Requested,
    SolLoadedDirective,
    SolLoadingDirective,
    SolErrorDirective,
    SolEmptyDirective,
} from '@sol/angular/request';
import { EnrollmentViewComponent } from './enrollment.view.component';
import { EnrollmentSkeletonViewComponent } from './enrollment-skeleton.view.component';

@Component({
    selector: 'sol-account-enrollments-view',
    template: `<h2>Enrollments</h2>
        <ng-container *solEmpty="enrollments">
            <ng-container *ngTemplateOutlet="skeleton"></ng-container>
        </ng-container>
        <ng-container *solLoading="enrollments">
            <ng-container *ngTemplateOutlet="skeleton"></ng-container>
        </ng-container>
        <ng-container *solError="enrollments">
            <p>There was an error loading your enrollments.</p>
        </ng-container>
        <ng-container *solLoaded="enrollments">
            <ng-container *ngIf="enrollments.length > 0; else empty">
                <sol-enrollment-view
                    style="margin-top: 2rem"
                    *ngFor="let enrollment of sortEnrollments(enrollments)"
                    [enrollment]="enrollment"
                ></sol-enrollment-view>
            </ng-container>
            <ng-template #empty>
                <p>You have no enrollments.</p>
            </ng-template>
        </ng-container>
        <ng-template #skeleton>
            <sol-enrollment-skeleton-view></sol-enrollment-skeleton-view>
        </ng-template> `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        SolEmptyDirective,
        NgTemplateOutlet,
        SolLoadingDirective,
        SolErrorDirective,
        SolLoadedDirective,
        EnrollmentViewComponent,
        EnrollmentSkeletonViewComponent,
        NgForOf,
        NgIf,
    ],
})
export class AccountEnrollmentsViewComponent {
    @Input({ required: true })
    enrollments!: Requested<Array<SemesterEnrollment>>;

    sortEnrollments(
        enrollments: Array<SemesterEnrollment>
    ): Array<SemesterEnrollment> {
        console.log('SORTING 🎲');
        return enrollments.sort(
            (a, b) => b.timestamp._seconds - a.timestamp._seconds
        );
    }
}

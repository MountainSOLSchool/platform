import { NgTemplateOutlet } from '@angular/common';
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
        <sol-enrollment-skeleton-view
            *solEmpty="enrollments"
        ></sol-enrollment-skeleton-view>
        <sol-enrollment-skeleton-view
            *solLoading="enrollments"
        ></sol-enrollment-skeleton-view>
        <ng-container *solError="enrollments">
            <p>There was an error loading your enrollments.</p>
        </ng-container>
        <ng-container *solLoaded="enrollments">
            @if (enrollments.length > 0) {
                @for (
                    enrollment of sortEnrollments(enrollments);
                    track enrollment
                ) {
                    <div style="margin-top: 2rem">
                        <sol-enrollment-view
                            [enrollment]="enrollment"
                        ></sol-enrollment-view>
                    </div>
                }
            } @else {
                <p>You have no enrollments.</p>
            }
        </ng-container>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        SolEmptyDirective,
        NgTemplateOutlet,
        SolLoadingDirective,
        SolErrorDirective,
        SolLoadedDirective,
        EnrollmentViewComponent,
        EnrollmentSkeletonViewComponent,
    ],
})
export class AccountEnrollmentsViewComponent {
    @Input({ required: true })
    enrollments!: Requested<Array<SemesterEnrollment>>;

    sortEnrollments(
        enrollments: Array<SemesterEnrollment>
    ): Array<SemesterEnrollment> {
        return enrollments.sort(
            (a, b) => b.timestamp._seconds - a.timestamp._seconds
        );
    }
}

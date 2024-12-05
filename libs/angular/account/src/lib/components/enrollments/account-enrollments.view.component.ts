import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ResourceStatus,
} from '@angular/core';

import { SemesterEnrollment } from '@sol/classes/domain';

import { EnrollmentViewComponent } from './enrollment.view.component';
import { EnrollmentSkeletonViewComponent } from './enrollment-skeleton.view.component';

@Component({
    selector: 'sol-account-enrollments-view',
    template: `<h2>Enrollments</h2>
        @switch (enrollments.status) {
            @case (rs.Loading) {
                <sol-enrollment-skeleton-view />
            }
            @case (rs.Idle) {
                <sol-enrollment-skeleton-view />
            }
            @case (rs.Error) {
                <p>There was an error loading your enrollments.</p>
            }
            @default {
                @if (enrollments.value && enrollments.value.length > 0) {
                    @for (
                        enrollment of sortEnrollments(enrollments.value);
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
            }
        }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [EnrollmentViewComponent, EnrollmentSkeletonViewComponent],
})
export class AccountEnrollmentsViewComponent {
    @Input({ required: true })
    enrollments!: {
        value: Array<SemesterEnrollment> | undefined;
        status: ResourceStatus;
    };

    readonly rs = ResourceStatus;

    sortEnrollments(
        enrollments: Array<SemesterEnrollment>
    ): Array<SemesterEnrollment> {
        return enrollments.sort(
            (a, b) => b.timestamp._seconds - a.timestamp._seconds
        );
    }
}

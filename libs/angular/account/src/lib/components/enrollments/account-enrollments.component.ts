import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SemesterEnrollment } from '@sol/classes/domain';
import { rxResource } from '@angular/core/rxjs-interop';
import { AccountEnrollmentsApiService } from '../../services/account-enrollments-api.service';
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentSkeletonComponent } from './enrollment-skeleton.component';

@Component({
    selector: 'sol-account-enrollments',
    template: `<h2>Enrollments</h2>
        @switch (enrollments.status()) {
            @case ('loading') {
                <sol-enrollment-skeleton />
            }
            @case ('idle') {
                <sol-enrollment-skeleton />
            }
            @case ('error') {
                <p>There was an error loading your enrollments.</p>
            }
            @default {
                @let enrollmentsValue = enrollments.value();
                @if (enrollmentsValue && enrollmentsValue.length > 0) {
                    @for (
                        enrollment of sortEnrollments(enrollmentsValue);
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
    imports: [EnrollmentComponent, EnrollmentSkeletonComponent],
    standalone: true,
})
export class AccountEnrollmentsComponent {
    readonly #accountEnrollmentsApiService = inject(
        AccountEnrollmentsApiService
    );

    readonly enrollments = rxResource({
        stream: () => this.#accountEnrollmentsApiService.getAll(),
    });

    public sortEnrollments(
        enrollments: Array<SemesterEnrollment>
    ): Array<SemesterEnrollment> {
        return enrollments.sort(
            (a, b) => b.timestamp._seconds - a.timestamp._seconds
        );
    }
}

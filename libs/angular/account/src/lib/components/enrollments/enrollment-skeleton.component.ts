import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SkeletonComponent } from '@sol/angular/skeleton';

@Component({
    selector: 'sol-enrollment-skeleton',
    template: `<div class="flex mb-3">
            <div>
                <sol-skeleton width="10rem" class="mb-2"></sol-skeleton>
                <sol-skeleton width="5rem" class="mb-2"></sol-skeleton>
                <sol-skeleton height=".5rem"></sol-skeleton>
            </div>
        </div>
        <sol-skeleton width="100%" height="150px"></sol-skeleton>
        <div class="flex justify-content-between mt-3">
            <sol-skeleton width="4rem" height="2rem"></sol-skeleton>
            <sol-skeleton width="4rem" height="2rem"></sol-skeleton>
        </div>`,
    imports: [SkeletonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentSkeletonComponent {}

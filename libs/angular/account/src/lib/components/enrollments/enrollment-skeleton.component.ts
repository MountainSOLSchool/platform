import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'sol-enrollment-skeleton',
    template: `<div class="flex mb-3">
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
        </div>`,
    imports: [SkeletonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentSkeletonComponent {}

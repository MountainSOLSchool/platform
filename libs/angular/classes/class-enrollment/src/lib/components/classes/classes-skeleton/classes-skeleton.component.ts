import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SkeletonModule } from 'primeng/skeleton';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SkeletonModule],
    selector: 'sol-classes-skeleton',
    templateUrl: './classes-skeleton.component.html',
})
export class ClassesSkeletonComponent {}

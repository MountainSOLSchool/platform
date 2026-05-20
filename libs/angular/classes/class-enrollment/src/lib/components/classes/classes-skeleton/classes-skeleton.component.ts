import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SkeletonComponent } from '@sol/angular/skeleton';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SkeletonComponent],
    selector: 'sol-classes-skeleton',
    templateUrl: './classes-skeleton.component.html',
})
export class ClassesSkeletonComponent {}

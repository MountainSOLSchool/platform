import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SkeletonComponent } from '@sol/angular/skeleton';

const SKELETON_ROWS: ReadonlyArray<number> = [0, 1, 2, 3, 4];

@Component({
    selector: 'sol-class-printouts-skeleton-view',
    template: `<table mat-table [dataSource]="skeletonRows">
        <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef style="width: 40%">Name</th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton height="1rem" width="60%"></sol-skeleton>
            </td>
        </ng-container>
        <ng-container matColumnDef="enrolledCount">
            <th mat-header-cell *matHeaderCellDef># Enrolled Students</th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton height="1rem" width="40%"></sol-skeleton>
            </td>
        </ng-container>
        <ng-container matColumnDef="start">
            <th mat-header-cell *matHeaderCellDef>Start</th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton height="1rem" width="50%"></sol-skeleton>
            </td>
        </ng-container>
        <ng-container matColumnDef="end">
            <th mat-header-cell *matHeaderCellDef>End</th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton height="1rem" width="50%"></sol-skeleton>
            </td>
        </ng-container>
        <ng-container matColumnDef="forms">
            <th mat-header-cell *matHeaderCellDef style="width: 20%"></th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton height="2rem" width="80%"></sol-skeleton>
            </td>
        </ng-container>
        <ng-container matColumnDef="emails">
            <th mat-header-cell *matHeaderCellDef style="width: 15%"></th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton height="2rem" width="80%"></sol-skeleton>
            </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatTableModule, SkeletonComponent],
})
export class ClassPrintoutsLoadingComponent {
    readonly displayedColumns: ReadonlyArray<string> = [
        'title',
        'enrolledCount',
        'start',
        'end',
        'forms',
        'emails',
    ];
    readonly skeletonRows = SKELETON_ROWS;
}

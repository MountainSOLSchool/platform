import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SkeletonComponent } from '@sol/angular/skeleton';

@Component({
    selector: 'sol-student-info-loading',
    template: `<table mat-table [dataSource]="placeholderRows">
        <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef style="width: 25%">Name</th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton width="80%" height="1rem"></sol-skeleton>
            </td>
        </ng-container>
        <ng-container matColumnDef="age">
            <th mat-header-cell *matHeaderCellDef style="width: 10%">Age</th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton width="40%" height="1rem"></sol-skeleton>
            </td>
        </ng-container>
        <ng-container matColumnDef="school">
            <th mat-header-cell *matHeaderCellDef style="width: 20%">School</th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton width="70%" height="1rem"></sol-skeleton>
            </td>
        </ng-container>
        <ng-container matColumnDef="contact">
            <th mat-header-cell *matHeaderCellDef style="width: 20%">
                Contact
            </th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton width="70%" height="1rem"></sol-skeleton>
            </td>
        </ng-container>
        <ng-container matColumnDef="flags">
            <th mat-header-cell *matHeaderCellDef style="width: 10%"></th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton width="60%" height="1rem"></sol-skeleton>
            </td>
        </ng-container>
        <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef style="width: 15%"></th>
            <td mat-cell *matCellDef="let row">
                <sol-skeleton width="80%" height="2rem"></sol-skeleton>
            </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatTableModule, SkeletonComponent],
})
export class StudentInfoLoadingComponent {
    readonly displayedColumns = [
        'name',
        'age',
        'school',
        'contact',
        'flags',
        'actions',
    ];
    readonly placeholderRows = Array.from({ length: 5 }, (_, i) => ({ i }));
}

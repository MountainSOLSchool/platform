import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'sol-class-printouts-skeleton-view',
    template: `<p-table [loading]="true">
        <ng-template pTemplate="header">
            <tr>
                <th pSortableColumn="title" style="width: 40%">
                    Name <p-sortIcon field="title"></p-sortIcon>
                </th>
                <th pSortableColumn="enrolledCount">
                    # Enrolled Students
                    <p-sortIcon field="enrolledCount"></p-sortIcon>
                </th>
                <th pSortableColumn="start">
                    Start
                    <p-sortIcon field="start"></p-sortIcon>
                </th>
                <th pSortableColumn="end">
                    End
                    <p-sortIcon field="end"></p-sortIcon>
                </th>
                <th style="width: 20%"></th>
                <th style="width: 15%"></th>
            </tr>
        </ng-template>
    </p-table>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TableModule],
})
export class ClassPrintoutsLoadingViewComponent {}

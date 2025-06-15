import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'sol-student-info-loading',
    template: `<p-table [loading]="true">
        <ng-template pTemplate="header">
            <tr>
                <th style="width: 25%">Name</th>
                <th style="width: 10%">Age</th>
                <th style="width: 20%">School</th>
                <th style="width: 20%">Contact</th>
                <th style="width: 10%"></th>
                <th style="width: 15%"></th>
            </tr>
        </ng-template>
    </p-table>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TableModule],
})
export class StudentInfoLoadingComponent {}

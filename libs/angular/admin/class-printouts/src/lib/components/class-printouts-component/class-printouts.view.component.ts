import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ClassPrintoutsLoadingComponent } from './class-printouts-loading.component';
import { ClassPrintoutRow } from '../../models/class-printout-row.type';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'sol-class-printouts-view',
    template: `<div
            style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px"
        >
            <h1>Class Forms and Contacts</h1>
            @let selectedSemesterValue = selectedSemester();
            <p-dropdown
                [options]="semesters()"
                placeholder="Select a semester"
                optionLabel="name"
                optionValue="id"
                [loading]="!selectedSemesterValue"
                [showClear]="false"
                [ngModel]="selectedSemesterValue"
                (ngModelChange)="selectedSemesterChange.emit($event)"
            ></p-dropdown>
        </div>
        @let rowsValue = rows();
        @if (!rowsValue) {
            <sol-class-printouts-skeleton-view></sol-class-printouts-skeleton-view>
        } @else {
            <div style="margin-top: 20px">
                <p-table
                    [value]="rowsValue"
                    responsiveLayout="scroll"
                    sortMode="single"
                >
                    <ng-template pTemplate="header">
                        <tr>
                            <th pSortableColumn="title" style="width: 25%">
                                Name <p-sortIcon field="title"></p-sortIcon>
                            </th>
                            <th
                                pSortableColumn="enrolledCount"
                                style="width: 15%"
                            >
                                # Enrolled Students
                                <p-sortIcon field="enrolledCount"></p-sortIcon>
                            </th>
                            <th pSortableColumn="start" style="width: 15%">
                                Start
                                <p-sortIcon field="start"></p-sortIcon>
                            </th>
                            <th pSortableColumn="end" style="width: 15%">
                                End
                                <p-sortIcon field="end"></p-sortIcon>
                            </th>
                            <th style="width: 15%"></th>
                            <th style="width: 15%"></th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-data>
                        @if (assertSemesterClass(data); as row) {
                            <tr>
                                <td>{{ row.title }}</td>
                                <td>{{ row.enrolledCount }}</td>
                                <td>{{ row.start }}</td>
                                <td>{{ row.end }}</td>
                                <td>
                                    <p-button
                                        class="sol-button"
                                        label="View Forms"
                                        icon="pi pi-window-maximize"
                                        [id]="row.id + 'downloadBtn'"
                                        (click)="downloadClick.emit(row.id)"
                                    >
                                    </p-button>
                                </td>
                                <td>
                                    <p-button
                                        class="sol-button"
                                        [id]="row.id + 'emailsBtn'"
                                        label="View Emails"
                                        icon="pi pi-window-maximize"
                                        [loading]="
                                            classIdOfEmailsBeingCopied() ===
                                            row.id
                                        "
                                        (click)="copyEmailsClick.emit(row)"
                                    >
                                    </p-button>
                                </td>
                            </tr>
                        }
                    </ng-template>
                </p-table>
            </div>
        }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonModule,
        TableModule,
        ClassPrintoutsLoadingComponent,
        DropdownModule,
        FormsModule,
    ],
})
export class ClassPrintoutsViewComponent {
    readonly rows = input.required<Array<ClassPrintoutRow> | undefined>();
    readonly classIdOfEmailsBeingCopied = input.required<string | undefined>();
    readonly semesters = input.required<
        Array<{ id: string; name: string }> | undefined
    >();
    readonly selectedSemester = input.required<string | undefined>();

    copyEmailsClick = output<ClassPrintoutRow>();

    downloadClick = output<string>();

    selectedSemesterChange = output<string>();

    assertSemesterClass(obj: unknown): ClassPrintoutRow {
        return obj as ClassPrintoutRow;
    }
}

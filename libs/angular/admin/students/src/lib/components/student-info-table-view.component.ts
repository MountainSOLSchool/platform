import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { StudentInfoLoadingComponent } from './student-info-loading.component';
import { InputTextModule } from 'primeng/inputtext';

export interface StudentTableRow {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    age: number;
    school: string;
    email: string;
    phone: string;
    hasLifeThreateningAllergies: boolean;
    allergies?: string;
}

@Component({
    selector: 'sol-student-info-table-view',
    template: `<div class="mb-4">
            <h1>Student Information Sheets</h1>
            <p class="text-gray-600">
                View and print emergency information sheets for all students
            </p>
        </div>
        @let studentsValue = students();
        @if (!studentsValue) {
            <sol-student-info-loading></sol-student-info-loading>
        } @else {
            <div style="margin-top: 20px">
                <p-table
                    #dt
                    [value]="studentsValue"
                    [paginator]="true"
                    [rows]="25"
                    [showCurrentPageReport]="true"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
                    [globalFilterFields]="['firstName', 'lastName', 'school', 'email']"
                    responsiveLayout="scroll"
                    sortMode="single"
                >
                    <ng-template pTemplate="caption">
                        <div class="flex justify-between align-items-center gap-4">
                            <span>Total Students: {{ studentsValue.length }}</span>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search"></i>
                                <input
                                    pInputText
                                    type="text"
                                    (input)="dt.filterGlobal($any($event.target).value, 'contains')"
                                    placeholder="Search students..."
                                />
                            </span>
                        </div>
                    </ng-template>
                    <ng-template pTemplate="header">
                        <tr>
                            <th pSortableColumn="lastName" style="width: 25%">
                                Name <p-sortIcon field="lastName"></p-sortIcon>
                            </th>
                            <th pSortableColumn="age" style="width: 10%">
                                Age <p-sortIcon field="age"></p-sortIcon>
                            </th>
                            <th pSortableColumn="school" style="width: 20%">
                                School <p-sortIcon field="school"></p-sortIcon>
                            </th>
                            <th style="width: 20%">Contact</th>
                            <th style="width: 10%"></th>
                            <th style="width: 15%"></th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-student let-dt="dt">
                        <tr>
                            <td>
                                <strong>{{ student.lastName }}, {{ student.firstName }}</strong>
                            </td>
                            <td>{{ student.age }}</td>
                            <td>{{ student.school }}</td>
                            <td>
                                <div class="text-sm">
                                    @if (student.email) {
                                        <div>{{ student.email }}</div>
                                    }
                                    @if (student.phone) {
                                        <div>{{ student.phone }}</div>
                                    }
                                </div>
                            </td>
                            <td>
                                @if (student.hasLifeThreateningAllergies) {
                                    <p-tag
                                        severity="danger"
                                        icon="pi pi-exclamation-triangle"
                                        value="Life-Threatening Allergies"
                                    ></p-tag>
                                }
                            </td>
                            <td>
                                <p-button
                                    class="sol-button"
                                    [id]="student.id + 'viewBtn'"
                                    label="View Info Sheet"
                                    icon="pi pi-eye"
                                    size="small"
                                    [loading]="studentIdBeingViewed() === student.id"
                                    (click)="viewInfoClick.emit(student)"
                                >
                                </p-button>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="emptymessage">
                        <tr>
                            <td colspan="6" class="text-center">
                                No students found.
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonModule,
        TableModule,
        StudentInfoLoadingComponent,
        TagModule,
        InputTextModule,
    ],
})
export class StudentInfoTableViewComponent {
    readonly students = input.required<Array<StudentTableRow> | undefined>();
    readonly studentIdBeingViewed = input.required<string | undefined>();

    viewInfoClick = output<StudentTableRow>();
}

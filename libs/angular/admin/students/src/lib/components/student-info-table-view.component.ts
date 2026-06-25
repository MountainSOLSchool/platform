import {
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
    output,
    viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StudentInfoLoadingComponent } from './student-info-loading.component';

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
                <div class="flex justify-between align-items-center gap-4 mb-2">
                    <span>Total Students: {{ studentsValue.length }}</span>
                    <mat-form-field appearance="outline" class="search-field">
                        <mat-icon matPrefix>search</mat-icon>
                        <input
                            matInput
                            type="text"
                            (input)="
                                dataSource.filter = (
                                    $any($event.target).value ?? ''
                                )
                                    .trim()
                                    .toLowerCase()
                            "
                            placeholder="Search students..."
                        />
                    </mat-form-field>
                </div>
                <table mat-table [dataSource]="dataSource" matSort>
                    <ng-container matColumnDef="name">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            mat-sort-header="lastName"
                            style="width: 25%"
                        >
                            Name
                        </th>
                        <td mat-cell *matCellDef="let student">
                            <strong
                                >{{ student.lastName }},
                                {{ student.firstName }}</strong
                            >
                        </td>
                    </ng-container>
                    <ng-container matColumnDef="age">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            mat-sort-header="age"
                            style="width: 10%"
                        >
                            Age
                        </th>
                        <td mat-cell *matCellDef="let student">
                            {{ student.age }}
                        </td>
                    </ng-container>
                    <ng-container matColumnDef="school">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            mat-sort-header="school"
                            style="width: 20%"
                        >
                            School
                        </th>
                        <td mat-cell *matCellDef="let student">
                            {{ student.school }}
                        </td>
                    </ng-container>
                    <ng-container matColumnDef="contact">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            style="width: 20%"
                        >
                            Contact
                        </th>
                        <td mat-cell *matCellDef="let student">
                            <div class="text-sm">
                                @if (student.email) {
                                    <div>{{ student.email }}</div>
                                }
                                @if (student.phone) {
                                    <div>{{ student.phone }}</div>
                                }
                            </div>
                        </td>
                    </ng-container>
                    <ng-container matColumnDef="flags">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            style="width: 10%"
                        ></th>
                        <td mat-cell *matCellDef="let student">
                            @if (student.hasLifeThreateningAllergies) {
                                <span class="status-tag status-danger">
                                    <mat-icon
                                        class="status-tag-icon"
                                        aria-hidden="true"
                                        >warning</mat-icon
                                    >
                                    Life-Threatening Allergies
                                </span>
                            }
                        </td>
                    </ng-container>
                    <ng-container matColumnDef="actions">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            style="width: 15%"
                        ></th>
                        <td mat-cell *matCellDef="let student">
                            <button
                                mat-raised-button
                                class="sol-button"
                                [id]="student.id + 'viewBtn'"
                                [disabled]="
                                    studentIdBeingViewed() === student.id
                                "
                                (click)="viewInfoClick.emit(student)"
                            >
                                @if (studentIdBeingViewed() === student.id) {
                                    <mat-progress-spinner
                                        mode="indeterminate"
                                        diameter="16"
                                    ></mat-progress-spinner>
                                } @else {
                                    <mat-icon>visibility</mat-icon>
                                }
                                View Info Sheet
                            </button>
                        </td>
                    </ng-container>
                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr
                        mat-row
                        *matRowDef="let row; columns: displayedColumns"
                    ></tr>
                    <tr class="mat-row" *matNoDataRow>
                        <td
                            class="mat-cell text-center"
                            [attr.colspan]="displayedColumns.length"
                        >
                            No students found.
                        </td>
                    </tr>
                </table>
                <mat-paginator
                    [pageSize]="25"
                    [pageSizeOptions]="[5, 10, 25, 50]"
                    showFirstLastButtons
                ></mat-paginator>
            </div>
        }`,
    styles: [
        `
            .search-field {
                min-width: 240px;
            }
            .status-tag {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
                line-height: 1.25;
            }
            .status-tag-icon {
                font-size: 1rem;
                width: 1rem;
                height: 1rem;
            }
            .status-danger {
                background: #fee2e2;
                color: #991b1b;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        StudentInfoLoadingComponent,
    ],
})
export class StudentInfoTableViewComponent {
    readonly students = input.required<Array<StudentTableRow> | undefined>();
    readonly studentIdBeingViewed = input.required<string | undefined>();

    viewInfoClick = output<StudentTableRow>();

    readonly displayedColumns = [
        'name',
        'age',
        'school',
        'contact',
        'flags',
        'actions',
    ];
    readonly dataSource = new MatTableDataSource<StudentTableRow>([]);
    readonly sort = viewChild(MatSort);
    readonly paginator = viewChild(MatPaginator);

    constructor() {
        effect(() => {
            this.dataSource.data = this.students() ?? [];
        });
        effect(() => {
            const s = this.sort();
            const p = this.paginator();
            if (s) this.dataSource.sort = s;
            if (p) this.dataSource.paginator = p;
        });
        this.dataSource.filterPredicate = (row, filter) => {
            const haystack = [
                row.firstName,
                row.lastName,
                row.school,
                row.email,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return haystack.includes(filter);
        };
        this.dataSource.sortingDataAccessor = (row, prop) => {
            switch (prop) {
                case 'lastName':
                    return row.lastName?.toLowerCase() ?? '';
                case 'school':
                    return row.school?.toLowerCase() ?? '';
                case 'age':
                    return row.age;
                default:
                    return (row as unknown as Record<string, unknown>)[prop] as
                        | string
                        | number;
            }
        };
    }
}

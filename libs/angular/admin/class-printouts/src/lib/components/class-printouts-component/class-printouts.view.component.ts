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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClassPrintoutsLoadingComponent } from './class-printouts-loading.component';
import { ClassPrintoutRow } from '../../models/class-printout-row.type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'sol-class-printouts-view',
    template: `<div
            style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px"
        >
            <h1>Class Forms and Contacts</h1>
            @let selectedSemesterValue = selectedSemester();
            @let semestersValue = semesters();
            <mat-form-field appearance="outline" subscriptSizing="dynamic">
                <mat-label>Semester</mat-label>
                <mat-select
                    [disabled]="!selectedSemesterValue"
                    [ngModel]="selectedSemesterValue"
                    (ngModelChange)="selectedSemesterChange.emit($event)"
                >
                    @for (semester of semestersValue; track semester.id) {
                        <mat-option [value]="semester.id">{{
                            semester.name
                        }}</mat-option>
                    }
                </mat-select>
            </mat-form-field>
            @if (!selectedSemesterValue) {
                <mat-progress-spinner
                    mode="indeterminate"
                    diameter="24"
                ></mat-progress-spinner>
            }
        </div>
        @let rowsValue = rows();
        @if (!rowsValue) {
            <sol-class-printouts-skeleton-view></sol-class-printouts-skeleton-view>
        } @else {
            <div style="margin-top: 20px">
                <table mat-table [dataSource]="dataSource" matSort>
                    <ng-container matColumnDef="title">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            mat-sort-header
                            style="width: 25%"
                        >
                            Name
                        </th>
                        <td mat-cell *matCellDef="let row">{{ row.title }}</td>
                    </ng-container>
                    <ng-container matColumnDef="enrolledCount">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            mat-sort-header
                            style="width: 15%"
                        >
                            # Enrolled Students
                        </th>
                        <td mat-cell *matCellDef="let row">
                            {{ row.enrolledCount }}
                        </td>
                    </ng-container>
                    <ng-container matColumnDef="start">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            mat-sort-header
                            style="width: 15%"
                        >
                            Start
                        </th>
                        <td mat-cell *matCellDef="let row">{{ row.start }}</td>
                    </ng-container>
                    <ng-container matColumnDef="end">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            mat-sort-header
                            style="width: 15%"
                        >
                            End
                        </th>
                        <td mat-cell *matCellDef="let row">{{ row.end }}</td>
                    </ng-container>
                    <ng-container matColumnDef="forms">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            style="width: 15%"
                        ></th>
                        <td mat-cell *matCellDef="let row">
                            <button
                                mat-flat-button
                                color="primary"
                                class="sol-button"
                                [id]="row.id + 'downloadBtn'"
                                (click)="downloadClick.emit(row.id)"
                            >
                                <mat-icon>open_in_new</mat-icon>
                                View Forms
                            </button>
                        </td>
                    </ng-container>
                    <ng-container matColumnDef="emails">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            style="width: 15%"
                        ></th>
                        <td mat-cell *matCellDef="let row">
                            <button
                                mat-flat-button
                                color="primary"
                                class="sol-button"
                                [id]="row.id + 'emailsBtn'"
                                [disabled]="
                                    classIdOfEmailsBeingCopied() === row.id
                                "
                                (click)="copyEmailsClick.emit(row)"
                            >
                                @if (classIdOfEmailsBeingCopied() === row.id) {
                                    <mat-progress-spinner
                                        mode="indeterminate"
                                        diameter="16"
                                    ></mat-progress-spinner>
                                } @else {
                                    <mat-icon>open_in_new</mat-icon>
                                }
                                View Emails
                            </button>
                        </td>
                    </ng-container>
                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr
                        mat-row
                        *matRowDef="let row; columns: displayedColumns"
                    ></tr>
                </table>
            </div>
        }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatSelectModule,
        ClassPrintoutsLoadingComponent,
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

    readonly copyEmailsClick = output<ClassPrintoutRow>();
    readonly downloadClick = output<string>();
    readonly selectedSemesterChange = output<string>();

    readonly displayedColumns: ReadonlyArray<string> = [
        'title',
        'enrolledCount',
        'start',
        'end',
        'forms',
        'emails',
    ];

    readonly dataSource = new MatTableDataSource<ClassPrintoutRow>([]);

    private readonly sort = viewChild(MatSort);

    constructor() {
        effect(() => {
            const currentRows = this.rows();
            this.dataSource.data = currentRows ?? [];
        });
        effect(() => {
            const sort = this.sort();
            if (sort) {
                this.dataSource.sort = sort;
            }
        });
    }
}

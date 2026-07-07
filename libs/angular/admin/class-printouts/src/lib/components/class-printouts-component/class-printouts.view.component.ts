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
import type { RosterStudent } from '@sol/ts/firebase/api-types';

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
                <table
                    mat-table
                    multiTemplateDataRows
                    [dataSource]="dataSource"
                    matSort
                >
                    <ng-container matColumnDef="expand">
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            style="width: 48px"
                        ></th>
                        <td mat-cell *matCellDef="let row">
                            <mat-icon class="expand-icon">{{
                                expandedClassId() === row.id
                                    ? 'expand_less'
                                    : 'expand_more'
                            }}</mat-icon>
                        </td>
                    </ng-container>
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
                                (click)="
                                    downloadClick.emit(row.id);
                                    $event.stopPropagation()
                                "
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
                                (click)="
                                    copyEmailsClick.emit(row);
                                    $event.stopPropagation()
                                "
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
                    <ng-container matColumnDef="detail">
                        <td
                            mat-cell
                            *matCellDef="let row"
                            [attr.colspan]="displayedColumns.length"
                            class="detail-cell"
                        >
                            @if (expandedClassId() === row.id) {
                                <div class="detail-content">
                                    @if (rosterLoading()) {
                                        <div class="roster-loading">
                                            <mat-progress-spinner
                                                mode="indeterminate"
                                                diameter="28"
                                            ></mat-progress-spinner>
                                        </div>
                                    } @else if (expandedRoster(); as students) {
                                        @if (students.length === 0) {
                                            <div class="roster-empty">
                                                No enrolled students.
                                            </div>
                                        } @else {
                                            @for (s of students; track s.id) {
                                                <div class="student">
                                                    <div
                                                        class="student-primary"
                                                    >
                                                        <span
                                                            class="student-name"
                                                            >{{ s.lastName }},
                                                            {{
                                                                s.firstName
                                                            }}</span
                                                        >
                                                        @if (s.age !== null) {
                                                            <span class="muted"
                                                                >age
                                                                {{
                                                                    s.age
                                                                }}</span
                                                            >
                                                        }
                                                        @if (
                                                            guardianSummary(s);
                                                            as guardians
                                                        ) {
                                                            <span
                                                                class="muted"
                                                                >{{
                                                                    guardians
                                                                }}</span
                                                            >
                                                        }
                                                        @for (
                                                            opt of s.additionalOptions;
                                                            track opt
                                                        ) {
                                                            <span
                                                                class="chip"
                                                                >{{ opt }}</span
                                                            >
                                                        }
                                                    </div>
                                                    <div
                                                        class="student-secondary"
                                                    >
                                                        @if (
                                                            s.hasLifeThreateningAllergies ||
                                                            s.allergies
                                                        ) {
                                                            <span class="warn"
                                                                >⚠ allergies:
                                                                {{
                                                                    s.allergies ||
                                                                        'yes'
                                                                }}</span
                                                            >
                                                        }
                                                        <span
                                                            >meds:
                                                            {{
                                                                s.medications
                                                                    .length
                                                                    ? s.medications.join(
                                                                          ', '
                                                                      )
                                                                    : 'none'
                                                            }}</span
                                                        >
                                                        <span
                                                            >code:
                                                            {{
                                                                s.codeWord ||
                                                                    '—'
                                                            }}</span
                                                        >
                                                        @if (
                                                            pickupSummary(s);
                                                            as pickup
                                                        ) {
                                                            <span
                                                                >pickup:
                                                                {{
                                                                    pickup
                                                                }}</span
                                                            >
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        }
                                    }
                                </div>
                            }
                        </td>
                    </ng-container>
                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr
                        mat-row
                        *matRowDef="let row; columns: displayedColumns"
                        class="class-row"
                        (click)="rowToggle.emit(row.id)"
                    ></tr>
                    <tr
                        mat-row
                        *matRowDef="let row; columns: ['detail']"
                        class="detail-row"
                    ></tr>
                </table>
            </div>
        }`,
    styles: [
        `
            .class-row {
                cursor: pointer;
            }
            .expand-icon {
                color: var(--sol-on-surface-variant, #666);
            }
            .detail-row {
                height: 0;
            }
            .detail-cell {
                padding: 0 !important;
                border-bottom-width: 0;
            }
            .detail-content {
                padding: 8px 16px 16px 56px;
                background: var(--sol-surface-variant, #f5f5f5);
            }
            .roster-loading,
            .roster-empty {
                padding: 12px;
            }
            .student {
                padding: 8px 0;
                border-bottom: 1px solid var(--sol-input-border, #e0e0e0);
            }
            .student:last-child {
                border-bottom: none;
            }
            .student-primary {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 12px;
            }
            .student-name {
                font-weight: 600;
            }
            .student-secondary {
                display: flex;
                flex-wrap: wrap;
                gap: 16px;
                margin-top: 2px;
                font-size: 0.85em;
            }
            .muted {
                color: var(--sol-on-surface-variant, #666);
            }
            .warn {
                color: var(--sol-error, #b3261e);
                font-weight: 600;
            }
            .chip {
                padding: 2px 10px;
                border-radius: 12px;
                background: var(--sol-primary, #006633);
                color: #fff;
                font-size: 0.8em;
            }
        `,
    ],
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
    readonly expandedClassId = input<string | undefined>(undefined);
    readonly expandedRoster = input<Array<RosterStudent> | undefined>(
        undefined
    );
    readonly rosterLoading = input<boolean>(false);

    readonly copyEmailsClick = output<ClassPrintoutRow>();
    readonly downloadClick = output<string>();
    readonly selectedSemesterChange = output<string>();
    readonly rowToggle = output<string>();

    readonly displayedColumns: ReadonlyArray<string> = [
        'expand',
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

    guardianSummary(student: RosterStudent): string {
        return student.guardians
            .map((g) => [g.name, g.phone, g.email].filter(Boolean).join(' · '))
            .join('  |  ');
    }

    pickupSummary(student: RosterStudent): string {
        return student.authorizedPickUp
            .map((c) =>
                c.relationship ? `${c.name} (${c.relationship})` : c.name
            )
            .join(', ');
    }
}

import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { Dialog } from '@angular/cdk/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ClassDetailDialogComponent } from './class-detail-dialog.component';
import { AddSemesterDialogComponent } from './add-semester-dialog.component';

interface AdminClass {
    id: string;
    name: string;
    description: string;
    classType: string;
    gradeRangeStart: number;
    gradeRangeEnd: number;
    cost: number;
    paymentRangeLowest?: number;
    paymentRangeHighest?: number;
    location: string;
    instructors: Array<{ id: string; firstName: string; lastName: string }>;
    weekday: string;
    dailyTimes: string;
    startDate: string;
    endDate: string;
    registrationEndDate: string;
    maxStudentSize: number;
    enrolledCount: number;
    live: boolean;
    pausedForEnrollment: boolean;
    forInformationOnly: boolean;
    thumbnailUrl?: string;
}

interface Semester {
    id: string;
    name: string;
}

@Component({
    selector: 'sol-admin-class-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatChipsModule,
        MatTableModule,
        MatTooltipModule,
    ],
    template: `
        <div class="page-container">
            <div class="page-header">
                <h1>Manage Classes</h1>
                <button
                    mat-raised-button
                    color="primary"
                    (click)="navigateToCreate()"
                >
                    <mat-icon>add</mat-icon>
                    Create New Class
                </button>
            </div>

            <mat-card class="filter-card">
                <mat-card-content>
                    <div class="filter-row">
                        <mat-form-field appearance="outline">
                            <mat-label>Select Semester</mat-label>
                            <mat-select
                                [(ngModel)]="selectedSemesterId"
                                (ngModelChange)="onSemesterChange($event)"
                            >
                                @for (semester of semesters(); track semester.id) {
                                    <mat-option [value]="semester.id">{{
                                        semester.name
                                    }}</mat-option>
                                }
                            </mat-select>
                        </mat-form-field>
                        <button
                            mat-stroked-button
                            (click)="openAddSemesterDialog()"
                        >
                            <mat-icon>add</mat-icon>
                            Add Semester
                        </button>
                    </div>
                </mat-card-content>
            </mat-card>

            @if (loading()) {
                <div class="loading-container">
                    <mat-spinner diameter="48"></mat-spinner>
                    <p>Loading classes...</p>
                </div>
            } @else if (classes().length === 0 && selectedSemesterId()) {
                <mat-card class="empty-state">
                    <mat-card-content>
                        <mat-icon>school</mat-icon>
                        <h3>No classes found</h3>
                        <p>
                            There are no classes in this semester yet. Create
                            one to get started.
                        </p>
                        <button
                            mat-raised-button
                            color="primary"
                            (click)="navigateToCreate()"
                        >
                            Create First Class
                        </button>
                    </mat-card-content>
                </mat-card>
            } @else if (classes().length > 0) {
                <mat-card class="table-card">
                    <table mat-table [dataSource]="classes()">
                        <ng-container matColumnDef="status">
                            <th mat-header-cell *matHeaderCellDef>Status</th>
                            <td mat-cell *matCellDef="let cls">
                                <div class="status-chips">
                                    @if (cls.live) {
                                        <span class="chip live">Live</span>
                                    } @else {
                                        <span class="chip draft">Draft</span>
                                    }
                                    @if (cls.forInformationOnly) {
                                        <span
                                            class="chip info-only"
                                            matTooltip="Information only - no enrollment"
                                            >Info Only</span
                                        >
                                    }
                                    @if (cls.pausedForEnrollment) {
                                        <span class="chip paused">Paused</span>
                                    }
                                </div>
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="name">
                            <th mat-header-cell *matHeaderCellDef>Name</th>
                            <td mat-cell *matCellDef="let cls">
                                <strong>{{ cls.name }}</strong>
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="type">
                            <th mat-header-cell *matHeaderCellDef>Type</th>
                            <td mat-cell *matCellDef="let cls">
                                {{ cls.classType }}
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="schedule">
                            <th mat-header-cell *matHeaderCellDef>Schedule</th>
                            <td mat-cell *matCellDef="let cls">
                                {{ cls.weekday }}
                                <br />
                                <small>{{ cls.dailyTimes }}</small>
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="instructors">
                            <th mat-header-cell *matHeaderCellDef>
                                Instructors
                            </th>
                            <td mat-cell *matCellDef="let cls">
                                {{ formatInstructors(cls) }}
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="enrollment">
                            <th mat-header-cell *matHeaderCellDef>Enrolled</th>
                            <td mat-cell *matCellDef="let cls">
                                {{ cls.enrolledCount }}
                                @if (cls.maxStudentSize > 0) {
                                    / {{ cls.maxStudentSize }}
                                }
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="cost">
                            <th mat-header-cell *matHeaderCellDef>Cost</th>
                            <td mat-cell *matCellDef="let cls">
                                {{ formatCost(cls) }}
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="actions">
                            <th mat-header-cell *matHeaderCellDef>Actions</th>
                            <td mat-cell *matCellDef="let cls">
                                <button
                                    mat-icon-button
                                    matTooltip="View Details"
                                    (click)="viewClass(cls)"
                                >
                                    <mat-icon>visibility</mat-icon>
                                </button>
                                <button
                                    mat-icon-button
                                    matTooltip="Edit Class"
                                    (click)="editClass(cls)"
                                >
                                    <mat-icon>edit</mat-icon>
                                </button>
                            </td>
                        </ng-container>

                        <tr
                            mat-header-row
                            *matHeaderRowDef="displayedColumns"
                        ></tr>
                        <tr
                            mat-row
                            *matRowDef="let row; columns: displayedColumns"
                        ></tr>
                    </table>
                </mat-card>

                <div class="summary">
                    <p>{{ getSummary() }}</p>
                </div>
            }
        </div>
    `,
    styles: [
        `
            .page-container {
                max-width: 1200px;
                margin: 2rem auto;
                padding: 0 1rem;
            }

            .page-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }

            .page-header h1 {
                margin: 0;
            }

            .filter-card {
                margin-bottom: 1.5rem;
            }

            .filter-row {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .filter-card mat-form-field {
                width: 300px;
            }

            .loading-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 3rem;
                color: #666;
            }

            .loading-container p {
                margin-top: 1rem;
            }

            .empty-state {
                text-align: center;
                padding: 3rem;
            }

            .empty-state mat-icon {
                font-size: 64px;
                width: 64px;
                height: 64px;
                color: #ccc;
            }

            .empty-state h3 {
                margin: 1rem 0 0.5rem;
            }

            .empty-state p {
                color: #666;
                margin-bottom: 1.5rem;
            }

            .table-card {
                overflow: hidden;
            }

            table {
                width: 100%;
            }

            .status-chips {
                display: flex;
                gap: 4px;
                flex-wrap: wrap;
            }

            .chip {
                display: inline-block;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 500;
                text-transform: uppercase;
            }

            .chip.live {
                background-color: #e8f5e9;
                color: #2e7d32;
            }

            .chip.draft {
                background-color: #fff3e0;
                color: #e65100;
            }

            .chip.info-only {
                background-color: #e3f2fd;
                color: #1565c0;
            }

            .chip.paused {
                background-color: #fce4ec;
                color: #c62828;
            }

            .summary {
                padding: 1rem;
                text-align: center;
                color: #666;
            }

            .summary p {
                margin: 0;
            }

            @media (max-width: 768px) {
                .page-header {
                    flex-direction: column;
                    gap: 1rem;
                    align-items: flex-start;
                }

                .filter-card mat-form-field {
                    width: 100%;
                }
            }
        `,
    ],
})
export class AdminClassListComponent {
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly semesterService = inject(ClassesSemesterListService);
    private readonly router = inject(Router);
    private readonly dialog = inject(Dialog);

    displayedColumns = [
        'status',
        'name',
        'type',
        'schedule',
        'instructors',
        'enrollment',
        'cost',
        'actions',
    ];

    selectedSemesterId = signal<string>('');
    classes = signal<AdminClass[]>([]);
    loading = signal<boolean>(false);

    private semestersRaw = toSignal(
        this.semesterService
            .getAllSemestersWithCurrentFirst()
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
    );

    semesters = computed<Semester[]>(() => this.semestersRaw() ?? []);

    totalEnrolled = computed(() =>
        this.classes().reduce((sum, cls) => sum + cls.enrolledCount, 0)
    );

    constructor() {
        const semesterCheck = setInterval(() => {
            const sems = this.semesters();
            if (sems.length > 0) {
                clearInterval(semesterCheck);
                this.selectedSemesterId.set(sems[0].id);
                this.loadClasses(sems[0].id);
            }
        }, 100);

        setTimeout(() => clearInterval(semesterCheck), 10000);
    }

    onSemesterChange(semesterId: string) {
        this.loadClasses(semesterId);
    }

    loadClasses(semesterId: string) {
        if (!semesterId) return;

        this.loading.set(true);
        this.classes.set([]);

        this.functions
            .call<{ classes: AdminClass[] }>('getClassesForAdmin', {
                semesterId,
            })
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe({
                next: (result) => {
                    this.classes.set(result.classes);
                    this.loading.set(false);
                },
                error: () => {
                    this.loading.set(false);
                },
            });
    }

    navigateToCreate() {
        const semesterId = this.selectedSemesterId();
        this.router.navigate(['/admin/classes/management/create'], {
            queryParams: semesterId ? { semesterId } : {},
        });
    }

    viewClass(cls: AdminClass) {
        this.dialog.open(ClassDetailDialogComponent, {
            data: cls,
            width: '600px',
        });
    }

    editClass(cls: AdminClass) {
        this.router.navigate(['/admin/classes/management/edit', cls.id]);
    }

    formatCost(cls: AdminClass): string {
        if (cls.paymentRangeLowest && cls.paymentRangeHighest) {
            return `$${cls.paymentRangeLowest} - $${cls.paymentRangeHighest}`;
        }
        return `$${cls.cost}`;
    }

    formatInstructors(cls: AdminClass): string {
        return cls.instructors.map((i) => i.firstName).join(', ');
    }

    getSummary(): string {
        const count = this.classes().length;
        const liveCount = this.classes().filter((c) => c.live).length;
        const classWord = count !== 1 ? 'classes' : 'class';
        return `${count} ${classWord} • ${liveCount} live • ${this.totalEnrolled()} total enrolled`;
    }

    openAddSemesterDialog() {
        const dialogRef = this.dialog.open(AddSemesterDialogComponent, {
            width: '400px',
        });

        dialogRef.closed.subscribe((result) => {
            if (result) {
                window.location.reload();
            }
        });
    }
}

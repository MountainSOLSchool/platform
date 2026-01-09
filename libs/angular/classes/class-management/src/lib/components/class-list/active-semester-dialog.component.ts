import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import {
    ClassesSemesterListService,
    SemesterConfigData,
    Semester,
} from '@sol/angular/classes/semester-list';

@Component({
    selector: 'sol-active-semester-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatIconModule,
        MatTooltipModule,
        MatTabsModule,
    ],
    template: `
        <div class="dialog-container">
            <h2>Manage Semesters</h2>

            @if (loading()) {
                <div class="loading-state">
                    <mat-spinner diameter="32"></mat-spinner>
                    <p>Loading semesters...</p>
                </div>
            } @else if (configData()) {
                <mat-tab-group>
                    <mat-tab label="Active Semesters">
                        <div class="tab-content">
                            <div class="form-section">
                                <h3>Primary Active Semester</h3>
                                <p class="helper-text">
                                    This is the default semester for enrollment.
                                </p>
                                <mat-form-field
                                    appearance="outline"
                                    class="full-width"
                                >
                                    <mat-label>Active Semester</mat-label>
                                    <mat-select [(ngModel)]="activeSemesterId">
                                        @for (
                                            semester of nonArchivedSemesters();
                                            track semester.id
                                        ) {
                                            <mat-option [value]="semester.id">{{
                                                semester.name
                                            }}</mat-option>
                                        }
                                    </mat-select>
                                </mat-form-field>
                            </div>

                            <div class="form-section">
                                <h3>Additional Enrollable Semesters</h3>
                                <p class="helper-text">
                                    Parents can also enroll in these semesters.
                                </p>
                                <div class="checkbox-list">
                                    @for (
                                        semester of availableSemesters();
                                        track semester.id
                                    ) {
                                        <mat-checkbox
                                            [checked]="
                                                otherSemesterIds().includes(
                                                    semester.id
                                                )
                                            "
                                            (change)="
                                                toggleOtherSemester(semester.id)
                                            "
                                        >
                                            {{ semester.name }}
                                        </mat-checkbox>
                                    }
                                    @if (availableSemesters().length === 0) {
                                        <p class="no-semesters">
                                            No other semesters available.
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </mat-tab>

                    <mat-tab>
                        <ng-template mat-tab-label>
                            Archived
                            @if (archivedSemesters().length > 0) {
                                <span class="badge">{{
                                    archivedSemesters().length
                                }}</span>
                            }
                        </ng-template>
                        <div class="tab-content">
                            <div class="form-section">
                                <h3>Archive Semesters</h3>
                                <p class="helper-text">
                                    Archived semesters are hidden from the
                                    semester dropdown.
                                </p>
                                <div class="semester-list">
                                    @for (
                                        semester of nonArchivedSemesters();
                                        track semester.id
                                    ) {
                                        <div class="semester-item">
                                            <span class="semester-name">{{
                                                semester.name
                                            }}</span>
                                            <button
                                                mat-icon-button
                                                matTooltip="Archive semester"
                                                (click)="
                                                    archiveSemester(semester)
                                                "
                                                [disabled]="
                                                    archivingId() === semester.id
                                                "
                                            >
                                                @if (
                                                    archivingId() === semester.id
                                                ) {
                                                    <mat-spinner
                                                        diameter="20"
                                                    ></mat-spinner>
                                                } @else {
                                                    <mat-icon>archive</mat-icon>
                                                }
                                            </button>
                                        </div>
                                    }
                                    @if (nonArchivedSemesters().length === 0) {
                                        <p class="no-semesters">
                                            All semesters are archived.
                                        </p>
                                    }
                                </div>
                            </div>

                            @if (archivedSemesters().length > 0) {
                                <div class="form-section">
                                    <h3>Archived Semesters</h3>
                                    <p class="helper-text">
                                        Click unarchive to restore a semester.
                                    </p>
                                    <div class="semester-list">
                                        @for (
                                            semester of archivedSemesters();
                                            track semester.id
                                        ) {
                                            <div class="semester-item archived">
                                                <span
                                                    class="semester-name archived-name"
                                                    >{{ semester.name }}</span
                                                >
                                                <button
                                                    mat-icon-button
                                                    matTooltip="Unarchive semester"
                                                    (click)="
                                                        unarchiveSemester(
                                                            semester
                                                        )
                                                    "
                                                    [disabled]="
                                                        archivingId() ===
                                                        semester.id
                                                    "
                                                >
                                                    @if (
                                                        archivingId() ===
                                                        semester.id
                                                    ) {
                                                        <mat-spinner
                                                            diameter="20"
                                                        ></mat-spinner>
                                                    } @else {
                                                        <mat-icon
                                                            >unarchive</mat-icon
                                                        >
                                                    }
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </mat-tab>
                </mat-tab-group>

                @if (error()) {
                    <p class="error">{{ error() }}</p>
                }
            }

            <div class="dialog-actions">
                <button mat-button (click)="close()" [disabled]="saving()">
                    Cancel
                </button>
                <button
                    mat-raised-button
                    color="primary"
                    (click)="save()"
                    [disabled]="saving() || loading() || !activeSemesterId"
                >
                    @if (saving()) {
                        <mat-spinner diameter="20"></mat-spinner>
                    } @else {
                        Save
                    }
                </button>
            </div>
        </div>
    `,
    styles: [
        `
            .dialog-container {
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                min-width: 450px;
                max-width: 550px;
            }

            h2 {
                margin: 0 0 1rem;
            }

            h3 {
                margin: 0 0 0.25rem;
                font-size: 1rem;
                font-weight: 500;
            }

            .helper-text {
                margin: 0 0 0.75rem;
                color: #666;
                font-size: 0.875rem;
            }

            .tab-content {
                padding: 1rem 0;
            }

            .form-section {
                padding: 0.5rem 0;
            }

            .form-section + .form-section {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid #eee;
            }

            .full-width {
                width: 100%;
            }

            .checkbox-list {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                max-height: 200px;
                overflow-y: auto;
            }

            .no-semesters {
                color: #999;
                font-style: italic;
                margin: 0;
            }

            .loading-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 2rem;
                color: #666;
            }

            .loading-state p {
                margin-top: 1rem;
            }

            .error {
                color: #c62828;
                margin: 1rem 0 0;
            }

            .dialog-actions {
                display: flex;
                justify-content: flex-end;
                gap: 8px;
                margin-top: 1.5rem;
                padding-top: 1rem;
                border-top: 1px solid #eee;
            }

            .dialog-actions mat-spinner {
                display: inline-block;
            }

            .badge {
                background-color: #e0e0e0;
                color: #666;
                border-radius: 10px;
                padding: 2px 8px;
                font-size: 12px;
                margin-left: 8px;
            }

            .semester-list {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                max-height: 200px;
                overflow-y: auto;
            }

            .semester-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
            }

            .semester-item:hover {
                background-color: #f5f5f5;
            }

            .semester-item.archived {
                background-color: #fafafa;
            }

            .semester-name {
                font-size: 0.875rem;
            }

            .archived-name {
                color: #999;
            }
        `,
    ],
})
export class ActiveSemesterDialogComponent {
    private readonly dialogRef = inject(DialogRef);
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly semesterService = inject(ClassesSemesterListService);

    loading = signal(true);
    saving = signal(false);
    error = signal<string | null>(null);
    configData = signal<SemesterConfigData | null>(null);
    archivingId = signal<string | null>(null);

    activeSemesterId = '';
    otherSemesterIds = signal<string[]>([]);

    availableSemesters = computed(() => {
        const data = this.configData();
        if (!data) return [];
        return data.semesters
            .filter((s) => s.id !== this.activeSemesterId)
            .filter((s) => !s.archived);
    });

    nonArchivedSemesters = computed(() => {
        const data = this.configData();
        if (!data) return [];
        return data.semesters.filter((s) => !s.archived);
    });

    archivedSemesters = computed(() => {
        const data = this.configData();
        if (!data) return [];
        return data.semesters.filter((s) => s.archived);
    });

    constructor() {
        this.loadData();

        effect(() => {
            const data = this.configData();
            if (data) {
                this.activeSemesterId = data.activeSemesterId;
                this.otherSemesterIds.set([...data.otherEnrollableSemesterIds]);
            }
        });
    }

    private loadData() {
        this.semesterService
            .getSemesterConfigDataDirect()
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe({
                next: (data: SemesterConfigData) => {
                    this.configData.set(data);
                    this.loading.set(false);
                },
                error: () => {
                    this.error.set('Failed to load semesters');
                    this.loading.set(false);
                },
            });
    }

    toggleOtherSemester(semesterId: string) {
        const current = this.otherSemesterIds();
        if (current.includes(semesterId)) {
            this.otherSemesterIds.set(
                current.filter((id) => id !== semesterId)
            );
        } else {
            this.otherSemesterIds.set([...current, semesterId]);
        }
    }

    archiveSemester(semester: Semester) {
        this.setArchiveStatus(semester, true);
    }

    unarchiveSemester(semester: Semester) {
        this.setArchiveStatus(semester, false);
    }

    private setArchiveStatus(semester: Semester, archived: boolean) {
        this.archivingId.set(semester.id);
        this.error.set(null);

        this.functions
            .call<{ success: boolean }>('archiveSemester', {
                semesterId: semester.id,
                archived,
            })
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe({
                next: () => {
                    this.archivingId.set(null);
                    const data = this.configData();
                    if (data) {
                        const updatedSemesters = data.semesters.map((s) =>
                            s.id === semester.id ? { ...s, archived } : s
                        );
                        this.configData.set({
                            ...data,
                            semesters: updatedSemesters,
                        });
                    }
                },
                error: (err) => {
                    this.archivingId.set(null);
                    this.error.set(
                        err?.message ||
                            `Failed to ${archived ? 'archive' : 'unarchive'} semester`
                    );
                },
            });
    }

    close() {
        this.dialogRef.close();
    }

    save() {
        if (!this.activeSemesterId) return;

        this.saving.set(true);
        this.error.set(null);

        const filteredOtherIds = this.otherSemesterIds().filter(
            (id) => id !== this.activeSemesterId
        );

        this.functions
            .call<{ success: boolean }>('updateActiveSemesterConfig', {
                activeSemesterId: this.activeSemesterId,
                otherEnrollableSemesterIds: filteredOtherIds,
            })
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe({
                next: () => {
                    this.saving.set(false);
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    this.saving.set(false);
                    this.error.set(
                        err?.message ||
                            'Failed to update semester configuration'
                    );
                },
            });
    }
}

import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import {
    ClassesSemesterListService,
    SemesterConfigData,
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
        MatDividerModule,
    ],
    template: `
        <div class="dialog-container">
            <h2>Manage Active Semesters</h2>

            @if (loading()) {
                <div class="loading-state">
                    <mat-spinner diameter="32"></mat-spinner>
                    <p>Loading semesters...</p>
                </div>
            } @else if (configData()) {
                <div class="form-section">
                    <h3>Primary Active Semester</h3>
                    <p class="helper-text">
                        This is the default semester for enrollment.
                    </p>
                    <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Active Semester</mat-label>
                        <mat-select [(ngModel)]="activeSemesterId">
                            @for (
                                semester of configData()!.semesters;
                                track semester.id
                            ) {
                                <mat-option [value]="semester.id">{{
                                    semester.name
                                }}</mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                </div>

                <mat-divider></mat-divider>

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
                                    otherSemesterIds().includes(semester.id)
                                "
                                (change)="toggleOtherSemester(semester.id)"
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
                min-width: 400px;
                max-width: 500px;
            }

            h2 {
                margin: 0 0 1.5rem;
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

            .form-section {
                padding: 1rem 0;
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
            }

            .dialog-actions mat-spinner {
                display: inline-block;
            }

            mat-divider {
                margin: 0.5rem 0;
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

    activeSemesterId = '';
    otherSemesterIds = signal<string[]>([]);

    availableSemesters = computed(() => {
        const data = this.configData();
        if (!data) return [];
        return data.semesters.filter((s) => s.id !== this.activeSemesterId);
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

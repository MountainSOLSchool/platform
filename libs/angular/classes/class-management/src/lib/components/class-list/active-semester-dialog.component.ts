import {
    Component,
    inject,
    signal,
    computed,
    effect,
    OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { pipe, filter, tap, switchMap, catchError, EMPTY } from 'rxjs';

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
import { rxResource } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

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
    readonly #dialogRef = inject(DialogRef);
    readonly #functions = inject(FirebaseFunctionsService);
    readonly #semesterService = inject(ClassesSemesterListService);

    readonly error = signal<string | null>(null);
    readonly archivingId = signal<string | null>(null);
    readonly saving = signal(false);

    activeSemesterId = '';
    readonly otherSemesterIds = signal<string[]>([]);

    // rxResource for loading config data
    readonly #configResource = rxResource({
        stream: () =>
            this.#semesterService
                .getSemesterConfigDataDirect()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly loading = computed(
        () => this.#configResource.status() === 'loading'
    );

    readonly configData = computed<SemesterConfigData | null>(
        () => this.#configResource.value() ?? null
    );

    readonly availableSemesters = computed(() => {
        const data = this.configData();
        if (!data) return [];
        return data.semesters
            .filter((s) => s.id !== this.activeSemesterId)
            .filter((s) => !s.archived);
    });

    readonly nonArchivedSemesters = computed(() => {
        const data = this.configData();
        if (!data) return [];
        return data.semesters.filter((s) => !s.archived);
    });

    readonly archivedSemesters = computed(() => {
        const data = this.configData();
        if (!data) return [];
        return data.semesters.filter((s) => s.archived);
    });

    // rxMethod for archive/unarchive
    readonly #performArchive = rxMethod<
        | {
              semester: Semester;
              archived: boolean;
          }
        | undefined
    >(
        pipe(
            filter((data): data is NonNullable<typeof data> => !!data),
            tap((data) => {
                this.archivingId.set(data.semester.id);
                this.error.set(null);
            }),
            switchMap((data) =>
                this.#functions
                    .call<{ success: boolean }>('archiveSemester', {
                        semesterId: data.semester.id,
                        archived: data.archived,
                    })
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        tap(() => {
                            this.archivingId.set(null);
                            // Reload the resource to get fresh data
                            this.#configResource.reload();
                        }),
                        catchError((err) => {
                            this.archivingId.set(null);
                            this.error.set(
                                err?.message ||
                                    `Failed to ${data.archived ? 'archive' : 'unarchive'} semester`
                            );
                            return EMPTY;
                        })
                    )
            )
        )
    );

    // rxMethod for save
    readonly #performSave = rxMethod<
        | {
              activeSemesterId: string;
              otherEnrollableSemesterIds: string[];
          }
        | undefined
    >(
        pipe(
            filter((data): data is NonNullable<typeof data> => !!data),
            tap(() => {
                this.saving.set(true);
                this.error.set(null);
            }),
            switchMap((data) =>
                this.#functions
                    .call<{
                        success: boolean;
                    }>('updateActiveSemesterConfig', data)
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        tap(() => {
                            this.saving.set(false);
                            this.#dialogRef.close(true);
                        }),
                        catchError((err) => {
                            this.saving.set(false);
                            this.error.set(
                                err?.message ||
                                    'Failed to update semester configuration'
                            );
                            return EMPTY;
                        })
                    )
            )
        )
    );

    constructor() {
        effect(() => {
            const data = this.configData();
            if (data) {
                this.activeSemesterId = data.activeSemesterId;
                this.otherSemesterIds.set([...data.otherEnrollableSemesterIds]);
            }
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
        this.#performArchive({ semester, archived: true });
    }

    unarchiveSemester(semester: Semester) {
        this.#performArchive({ semester, archived: false });
    }

    close() {
        this.#dialogRef.close();
    }

    save() {
        if (!this.activeSemesterId) return;

        const filteredOtherIds = this.otherSemesterIds().filter(
            (id) => id !== this.activeSemesterId
        );

        this.#performSave({
            activeSemesterId: this.activeSemesterId,
            otherEnrollableSemesterIds: filteredOtherIds,
        });
    }
}

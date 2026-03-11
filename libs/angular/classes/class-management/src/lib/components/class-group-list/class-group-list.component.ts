import { Component, inject, computed, signal, effect } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { Dialog } from '@angular/cdk/dialog';
import { map, of } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import type { AdminClassGroup } from '@sol/ts/firebase/api-types';

import {
    ClassGroupFormDialogComponent,
    ClassGroupFormDialogData,
    ClassGroupFormDialogResult,
} from './class-group-form-dialog.component';

interface Semester {
    id: string;
    name: string;
}

interface AdminClass {
    id: string;
    name: string;
    cost: number;
}

@Component({
    selector: 'sol-class-group-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CurrencyPipe,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTooltipModule,
    ],
    template: `
        <div class="page-container">
            <div class="page-header">
                <div class="header-left">
                    <button mat-icon-button (click)="navigateBack()">
                        <mat-icon>arrow_back</mat-icon>
                    </button>
                    <h1>Class Groups</h1>
                </div>
                <button
                    mat-raised-button
                    color="primary"
                    (click)="openCreateDialog()"
                    [disabled]="!selectedSemesterId()"
                >
                    <mat-icon>add</mat-icon>
                    Create Group
                </button>
            </div>

            <mat-card class="filter-card">
                <mat-card-content>
                    <mat-form-field appearance="outline">
                        <mat-label>Select Semester</mat-label>
                        <mat-select
                            [(ngModel)]="selectedSemesterId"
                            (ngModelChange)="onSemesterChange($event)"
                        >
                            @for (
                                semester of semesters();
                                track semester.id
                            ) {
                                <mat-option [value]="semester.id">{{
                                    semester.name
                                }}</mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                </mat-card-content>
            </mat-card>

            @if (loading()) {
                <div class="loading-container">
                    <mat-spinner diameter="48"></mat-spinner>
                    <p>Loading class groups...</p>
                </div>
            } @else if (groups().length === 0 && selectedSemesterId()) {
                <mat-card class="empty-state">
                    <mat-card-content>
                        <mat-icon>group_work</mat-icon>
                        <h3>No class groups</h3>
                        <p>
                            Class groups bundle classes together at a
                            discounted price. Create one to get started.
                        </p>
                        <button
                            mat-raised-button
                            color="primary"
                            (click)="openCreateDialog()"
                        >
                            Create First Group
                        </button>
                    </mat-card-content>
                </mat-card>
            } @else if (groups().length > 0) {
                <div class="groups-grid">
                    @for (group of groups(); track group.id) {
                        <mat-card class="group-card">
                            <mat-card-content>
                                <div class="group-header">
                                    <h3>{{ group.name }}</h3>
                                    <div class="group-actions">
                                        <button
                                            mat-icon-button
                                            matTooltip="Edit Group"
                                            (click)="editGroup(group)"
                                        >
                                            <mat-icon>edit</mat-icon>
                                        </button>
                                        <button
                                            mat-icon-button
                                            matTooltip="Delete Group"
                                            (click)="
                                                confirmDeleteGroup(group)
                                            "
                                        >
                                            <mat-icon>delete</mat-icon>
                                        </button>
                                    </div>
                                </div>

                                <div class="group-cost">
                                    Group Price:
                                    <strong>{{
                                        group.cost | currency
                                    }}</strong>
                                    @if (getSavings(group); as savings) {
                                        <span class="savings-badge">
                                            <mat-icon>local_offer</mat-icon>
                                            {{ savings | currency }} savings
                                        </span>
                                    }
                                </div>

                                <div class="group-classes">
                                    <label>Classes in this group:</label>
                                    <ul>
                                        @for (
                                            cls of group.classes;
                                            track cls.id
                                        ) {
                                            <li>
                                                {{ cls.name }}
                                                <span class="individual-cost"
                                                    >({{
                                                        cls.cost | currency
                                                    }})</span
                                                >
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </mat-card-content>
                        </mat-card>
                    }
                </div>

                <div class="summary">
                    <p>{{ groups().length }} group{{ groups().length !== 1 ? 's' : '' }}</p>
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

            .header-left {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .header-left h1 {
                margin: 0;
            }

            .filter-card {
                margin-bottom: 1.5rem;
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

            .groups-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 1rem;
            }

            .group-card {
                height: fit-content;
            }

            .group-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }

            .group-header h3 {
                margin: 0 0 0.5rem;
            }

            .group-actions {
                display: flex;
                gap: 0;
            }

            .group-cost {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
                margin-bottom: 1rem;
                font-size: 15px;
            }

            .savings-badge {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                background: #e8f5e9;
                color: #2e7d32;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
            }

            .savings-badge mat-icon {
                font-size: 14px;
                width: 14px;
                height: 14px;
            }

            .group-classes label {
                font-size: 13px;
                color: rgba(0, 0, 0, 0.6);
                font-weight: 500;
            }

            .group-classes ul {
                margin: 4px 0 0;
                padding-left: 1.25rem;
            }

            .group-classes li {
                padding: 2px 0;
            }

            .individual-cost {
                color: rgba(0, 0, 0, 0.54);
                font-size: 13px;
            }

            .summary {
                padding: 1rem;
                text-align: center;
                color: #666;
            }

            .summary p {
                margin: 0;
            }
        `,
    ],
})
export class ClassGroupListComponent {
    readonly #router = inject(Router);
    readonly #route = inject(ActivatedRoute);
    readonly #dialog = inject(Dialog);
    readonly #functions = inject(FirebaseFunctionsService);
    readonly #semesterService = inject(ClassesSemesterListService);
    readonly #api = inject(MountainSolApiService);

    readonly #semesterIdFromQuery = toSignal(
        this.#route.queryParamMap.pipe(
            map((params) => params.get('semesterId') ?? '')
        )
    );

    readonly semestersResource = rxResource({
        stream: () =>
            this.#semesterService
                .getAllSemestersWithCurrentFirst()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly semesters = computed<Semester[]>(
        () => this.semestersResource.value() ?? []
    );

    readonly selectedSemesterId = signal('');

    readonly groupsResource = rxResource({
        params: () => this.selectedSemesterId(),
        stream: ({ params: semesterId }) => {
            if (!semesterId) return of({ groups: [] as AdminClassGroup[] });
            return this.#api.getClassGroupsForAdmin({ semesterId });
        },
    });

    readonly groups = computed<AdminClassGroup[]>(
        () => this.groupsResource.value()?.groups ?? []
    );

    readonly #classesResource = rxResource({
        params: () => this.selectedSemesterId(),
        stream: ({ params: semesterId }) => {
            if (!semesterId) return of({ classes: [] as AdminClass[] });
            return this.#functions
                .call<{ classes: AdminClass[] }>('getClassesForAdmin', {
                    semesterId,
                })
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded());
        },
    });

    readonly #allClasses = computed<AdminClass[]>(
        () => this.#classesResource.value()?.classes ?? []
    );

    readonly loading = computed(
        () =>
            this.groupsResource.status() === 'loading' ||
            this.#classesResource.status() === 'loading'
    );

    constructor() {
        // Initialize selectedSemesterId from query params once semesters load
        effect(() => {
            const sems = this.semesters();
            const queryParam = this.#semesterIdFromQuery();
            if (sems.length === 0) return;
            const current = this.selectedSemesterId();
            if (current) return;
            const id =
                queryParam && sems.some((s) => s.id === queryParam)
                    ? queryParam
                    : sems[0].id;
            this.selectedSemesterId.set(id);
        });

        effect(() => {
            const semesterId = this.selectedSemesterId();
            if (semesterId) {
                this.#router.navigate([], {
                    relativeTo: this.#route,
                    queryParams: { semesterId },
                    queryParamsHandling: 'merge',
                    replaceUrl: true,
                });
            }
        });
    }

    onSemesterChange(semesterId: string) {
        this.selectedSemesterId.set(semesterId);
    }

    navigateBack() {
        this.#router.navigate(['/admin/classes/management'], {
            queryParams: { semesterId: this.selectedSemesterId() },
        });
    }

    getSavings(group: AdminClassGroup): number | null {
        const individualTotal = group.classes.reduce(
            (sum, c) => sum + c.cost,
            0
        );
        const savings = individualTotal - group.cost;
        return savings > 0 ? savings : null;
    }

    openCreateDialog() {
        const semesterId = this.selectedSemesterId();
        if (!semesterId) return;

        const groupedClassIds = new Set(
            this.groups().flatMap((g) => g.classes.map((c) => c.id))
        );
        const availableClasses = this.#allClasses()
            .map((c) => ({ id: c.id, name: c.name, cost: c.cost }))
            .filter((c) => !groupedClassIds.has(c.id));

        const dialogRef = this.#dialog.open<
            ClassGroupFormDialogResult,
            ClassGroupFormDialogData
        >(ClassGroupFormDialogComponent, {
            width: '500px',
            data: {
                semesterId,
                classes: availableClasses,
            },
        });

        dialogRef.closed.subscribe((result) => {
            if (result === 'saved') {
                this.groupsResource.reload();
            }
        });
    }

    editGroup(group: AdminClassGroup) {
        const semesterId = this.selectedSemesterId();
        if (!semesterId) return;

        const groupClassIds = new Set(group.classes.map((c) => c.id));
        const otherGroupedClassIds = new Set(
            this.groups()
                .filter((g) => g.id !== group.id)
                .flatMap((g) => g.classes.map((c) => c.id))
        );

        // Include: classes in this group + classes not in any other group
        const availableClasses = this.#allClasses()
            .map((c) => ({ id: c.id, name: c.name, cost: c.cost }))
            .filter(
                (c) =>
                    groupClassIds.has(c.id) ||
                    !otherGroupedClassIds.has(c.id)
            );

        const dialogRef = this.#dialog.open<
            ClassGroupFormDialogResult,
            ClassGroupFormDialogData
        >(ClassGroupFormDialogComponent, {
            width: '500px',
            data: {
                semesterId,
                classes: availableClasses,
                existingGroup: {
                    id: group.id,
                    name: group.name,
                    cost: group.cost,
                    classIds: group.classes.map((c) => c.id),
                },
            },
        });

        dialogRef.closed.subscribe((result) => {
            if (result === 'saved') {
                this.groupsResource.reload();
            }
        });
    }

    readonly #deleting = signal(false);

    confirmDeleteGroup(group: AdminClassGroup) {
        if (
            !confirm(
                `Delete group "${group.name}"? The classes will remain but will no longer be grouped.`
            )
        ) {
            return;
        }

        this.#deleting.set(true);
        this.#api
            .deleteClassGroup({
                semesterId: this.selectedSemesterId(),
                groupId: group.id,
            })
            .subscribe({
                next: () => {
                    this.#deleting.set(false);
                    this.groupsResource.reload();
                },
                error: () => {
                    this.#deleting.set(false);
                },
            });
    }
}

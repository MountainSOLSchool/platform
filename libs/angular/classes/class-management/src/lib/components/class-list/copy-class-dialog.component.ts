import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { pipe, filter, tap, switchMap, catchError, EMPTY } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { rxResource } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface Semester {
    id: string;
    name: string;
}

interface ClassForEdit {
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
    instructorIds: string[];
    weekday: string;
    dailyTimes: string;
    startDate: string;
    endDate: string;
    registrationEndDate: string;
    minStudentSize: number;
    maxStudentSize: number;
    live: boolean;
    pausedForEnrollment: boolean;
    forInformationOnly: boolean;
    unitIds?: string[];
    ageGroup?: string;
}

export interface CopyClassDialogData {
    classId: string;
    className: string;
    currentSemesterId: string;
}

export interface CopyClassDialogResult {
    newClassId: string;
    destinationSemesterId: string;
}

@Component({
    selector: 'sol-copy-class-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
    ],
    template: `
        <div class="dialog-container">
            <h2>Copy Class</h2>
            <p class="subtitle">Create a copy of "{{ data.className }}"</p>

            <mat-form-field appearance="outline" class="full-width">
                <mat-label>New Class Name</mat-label>
                <input
                    matInput
                    [(ngModel)]="newClassName"
                    placeholder="Enter name for the copied class"
                    [disabled]="saving()"
                />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
                <mat-label>Destination Semester</mat-label>
                <mat-select
                    [(ngModel)]="selectedSemesterId"
                    [disabled]="saving()"
                >
                    @for (semester of semesters(); track semester.id) {
                        <mat-option [value]="semester.id">{{
                            semester.name
                        }}</mat-option>
                    }
                </mat-select>
            </mat-form-field>

            @if (error()) {
                <p class="error">{{ error() }}</p>
            }

            <div class="dialog-actions">
                <button mat-button (click)="close()" [disabled]="saving()">
                    Cancel
                </button>
                <button
                    mat-raised-button
                    color="primary"
                    (click)="copy()"
                    [disabled]="!canCopy() || saving()"
                >
                    @if (saving()) {
                        <mat-spinner diameter="20"></mat-spinner>
                    } @else {
                        Copy Class
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
            }

            h2 {
                margin: 0 0 0.5rem;
            }

            .subtitle {
                margin: 0 0 1.5rem;
                color: #666;
            }

            .full-width {
                width: 100%;
            }

            .error {
                color: #c62828;
                margin: 0 0 1rem;
            }

            .dialog-actions {
                display: flex;
                justify-content: flex-end;
                gap: 8px;
                margin-top: 1rem;
            }

            .dialog-actions mat-spinner {
                display: inline-block;
            }
        `,
    ],
})
export class CopyClassDialogComponent implements OnInit {
    readonly #dialogRef = inject(DialogRef<CopyClassDialogResult>);
    readonly #semesterService = inject(ClassesSemesterListService);
    readonly #functions = inject(FirebaseFunctionsService);
    readonly data = inject<CopyClassDialogData>(DIALOG_DATA);

    newClassName = '';
    selectedSemesterId = '';
    readonly saving = signal(false);
    readonly error = signal<string | null>(null);

    readonly #semestersResource = rxResource({
        stream: () =>
            this.#semesterService
                .getAllSemestersWithCurrentFirst()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly semesters = computed<Semester[]>(
        () => this.#semestersResource.value() ?? []
    );

    readonly canCopy = computed(
        () => this.newClassName.trim().length > 0 && this.selectedSemesterId
    );

    // rxMethod for copy operation
    readonly #performCopy = rxMethod<
        | {
              sourceClassId: string;
              sourceSemesterId: string;
              newClassName: string;
              destinationSemesterId: string;
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
                    .call<{ class: ClassForEdit }>('getClassForEdit', {
                        semesterId: data.sourceSemesterId,
                        classId: data.sourceClassId,
                    })
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        switchMap((result) => {
                            const cls = result.class;
                            const createRequest = {
                                semesterId: data.destinationSemesterId,
                                name: data.newClassName,
                                description: cls.description,
                                classType: cls.classType,
                                gradeRangeStart: cls.gradeRangeStart,
                                gradeRangeEnd: cls.gradeRangeEnd,
                                cost: cls.cost,
                                paymentRangeLowest: cls.paymentRangeLowest,
                                paymentRangeHighest: cls.paymentRangeHighest,
                                location: cls.location,
                                instructorIds: cls.instructorIds,
                                weekday: cls.weekday,
                                dailyTimes: cls.dailyTimes,
                                startDate: cls.startDate,
                                endDate: cls.endDate,
                                registrationEndDate: cls.registrationEndDate,
                                minStudentSize: cls.minStudentSize,
                                maxStudentSize: cls.maxStudentSize,
                                live: false,
                                pausedForEnrollment: false,
                                forInformationOnly: cls.forInformationOnly,
                                unitIds: cls.unitIds ?? [],
                                ageGroup: cls.ageGroup || undefined,
                            };

                            return this.#functions
                                .call<{
                                    success: boolean;
                                    classId: string;
                                }>('createClass', createRequest)
                                .pipe(
                                    RequestedOperatorsUtility.ignoreAllStatesButLoaded()
                                );
                        }),
                        tap((result) => {
                            this.saving.set(false);
                            if (result.success) {
                                this.#dialogRef.close({
                                    newClassId: result.classId,
                                    destinationSemesterId:
                                        data.destinationSemesterId,
                                });
                            } else {
                                this.error.set('Failed to create class copy');
                            }
                        }),
                        catchError((err) => {
                            this.saving.set(false);
                            this.error.set(
                                err?.message || 'Failed to copy class'
                            );
                            return EMPTY;
                        })
                    )
            )
        )
    );

    ngOnInit() {
        this.newClassName = `${this.data.className} (Copy)`;
        this.selectedSemesterId = this.data.currentSemesterId;
    }

    close() {
        this.#dialogRef.close();
    }

    copy() {
        if (!this.canCopy()) return;

        this.#performCopy({
            sourceClassId: this.data.classId,
            sourceSemesterId: this.data.currentSemesterId,
            newClassName: this.newClassName.trim(),
            destinationSemesterId: this.selectedSemesterId,
        });
    }
}

import {
    Component,
    inject,
    signal,
    computed,
    OnInit,
    effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { map, pipe, filter, tap, switchMap, catchError, EMPTY, of } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { UnitSelectorComponent } from '../unit-selector/unit-selector.component';

interface Instructor {
    id: string;
    firstName: string;
    lastName: string;
}

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
    thumbnailUrl?: string;
    unitIds?: string[];
    ageGroup?: string;
}

type FormState = { message?: string } & (
    | { status: 'idle' }
    | { status: 'submitting' }
    | { status: 'success'; classId: string }
    | { status: 'error'; message: string }
);

@Component({
    selector: 'sol-class-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatDividerModule,
        MatAutocompleteModule,
        UnitSelectorComponent,
    ],
    template: `
        <div class="form-container">
            <mat-card class="form-card">
                <mat-card-header>
                    <mat-card-title>{{
                        editMode() ? 'Edit Class' : 'Create New Class'
                    }}</mat-card-title>
                    <mat-card-subtitle>{{
                        editMode()
                            ? 'Update the class details below'
                            : 'Fill in the details below to create a new class'
                    }}</mat-card-subtitle>
                </mat-card-header>

                <mat-card-content>
                    @if (loadingClass()) {
                        <div class="loading-container">
                            <mat-spinner diameter="48"></mat-spinner>
                            <p>Loading class...</p>
                        </div>
                    } @else {
                        @if (formState().status === 'error') {
                            <div class="error-banner">
                                <mat-icon>error</mat-icon>
                                <span>{{
                                    formState().status === 'error'
                                        ? formState().message
                                        : ''
                                }}</span>
                            </div>
                        }

                        @if (formState().status === 'success') {
                            <div class="success-banner">
                                <mat-icon>check_circle</mat-icon>
                                <span>{{
                                    editMode()
                                        ? 'Class updated successfully!'
                                        : 'Class created successfully!'
                                }}</span>
                                @if (editMode()) {
                                    <button
                                        mat-button
                                        color="primary"
                                        (click)="navigateToList()"
                                    >
                                        Back to List
                                    </button>
                                } @else {
                                    <button
                                        mat-button
                                        color="primary"
                                        (click)="resetForm()"
                                    >
                                        Create Another
                                    </button>
                                }
                            </div>
                        } @else {
                            <form
                                class="form-content"
                                (ngSubmit)="submitForm()"
                            >
                                <section class="form-section">
                                    <h3>Basic Information</h3>

                                    <mat-form-field appearance="outline">
                                        <mat-label>Semester</mat-label>
                                        <mat-select
                                            [(ngModel)]="semesterId"
                                            name="semesterId"
                                            required
                                        >
                                            @for (
                                                semester of semesters();
                                                track semester.id
                                            ) {
                                                <mat-option
                                                    [value]="semester.id"
                                                    >{{
                                                        semester.name
                                                    }}</mat-option
                                                >
                                            }
                                        </mat-select>
                                    </mat-form-field>

                                    <mat-form-field appearance="outline">
                                        <mat-label>Class Name</mat-label>
                                        <input
                                            matInput
                                            [(ngModel)]="name"
                                            name="name"
                                            required
                                            placeholder="e.g., Forest Explorers"
                                        />
                                    </mat-form-field>

                                    <mat-form-field appearance="outline">
                                        <mat-label>Description</mat-label>
                                        <textarea
                                            matInput
                                            [(ngModel)]="description"
                                            name="description"
                                            rows="3"
                                            placeholder="Describe what students will learn..."
                                        ></textarea>
                                    </mat-form-field>

                                    <mat-form-field appearance="outline">
                                        <mat-label>Class Type</mat-label>
                                        <input
                                            matInput
                                            [(ngModel)]="classType"
                                            name="classType"
                                            required
                                            [matAutocomplete]="classTypeAuto"
                                            placeholder="e.g., Homeschool"
                                        />
                                        <mat-autocomplete
                                            #classTypeAuto="matAutocomplete"
                                        >
                                            @for (
                                                type of filteredClassTypes();
                                                track type
                                            ) {
                                                <mat-option [value]="type">{{
                                                    type
                                                }}</mat-option>
                                            }
                                        </mat-autocomplete>
                                    </mat-form-field>

                                    <mat-form-field appearance="outline">
                                        <mat-label
                                            >Age Group (Optional)</mat-label
                                        >
                                        <mat-select
                                            [(ngModel)]="ageGroup"
                                            name="ageGroup"
                                        >
                                            <mat-option value=""
                                                >Standard (Paths &
                                                Units)</mat-option
                                            >
                                            <mat-option value="mallards"
                                                >Mallards</mat-option
                                            >
                                            <mat-option value="mapaches"
                                                >Mapaches</mat-option
                                            >
                                        </mat-select>
                                        <mat-hint
                                            >Select Mallards or Mapaches for
                                            younger age group units</mat-hint
                                        >
                                    </mat-form-field>
                                </section>

                                <mat-divider></mat-divider>

                                <section class="form-section">
                                    <h3>Schedule</h3>

                                    <div class="date-row">
                                        <mat-form-field appearance="outline">
                                            <mat-label>Start Date</mat-label>
                                            <input
                                                matInput
                                                [matDatepicker]="startPicker"
                                                [(ngModel)]="startDate"
                                                name="startDate"
                                                required
                                            />
                                            <mat-datepicker-toggle
                                                matIconSuffix
                                                [for]="startPicker"
                                            ></mat-datepicker-toggle>
                                            <mat-datepicker
                                                #startPicker
                                            ></mat-datepicker>
                                        </mat-form-field>

                                        <mat-form-field appearance="outline">
                                            <mat-label>End Date</mat-label>
                                            <input
                                                matInput
                                                [matDatepicker]="endPicker"
                                                [(ngModel)]="endDate"
                                                name="endDate"
                                                required
                                            />
                                            <mat-datepicker-toggle
                                                matIconSuffix
                                                [for]="endPicker"
                                            ></mat-datepicker-toggle>
                                            <mat-datepicker
                                                #endPicker
                                            ></mat-datepicker>
                                        </mat-form-field>
                                    </div>

                                    <mat-form-field appearance="outline">
                                        <mat-label
                                            >Registration End Date</mat-label
                                        >
                                        <input
                                            matInput
                                            [matDatepicker]="regPicker"
                                            [(ngModel)]="registrationEndDate"
                                            name="registrationEndDate"
                                            required
                                        />
                                        <mat-datepicker-toggle
                                            matIconSuffix
                                            [for]="regPicker"
                                        ></mat-datepicker-toggle>
                                        <mat-datepicker
                                            #regPicker
                                        ></mat-datepicker>
                                    </mat-form-field>

                                    <div class="weekday-section">
                                        <mat-form-field appearance="outline">
                                            <mat-label
                                                >Day(s) of Week</mat-label
                                            >
                                            <mat-select
                                                [(ngModel)]="selectedWeekdays"
                                                name="selectedWeekdays"
                                                multiple
                                                required
                                            >
                                                @for (
                                                    day of weekdayOptions;
                                                    track day.value
                                                ) {
                                                    <mat-option
                                                        [value]="day.value"
                                                        >{{
                                                            day.label
                                                        }}</mat-option
                                                    >
                                                }
                                            </mat-select>
                                        </mat-form-field>
                                        @if (weekday() && editMode()) {
                                            <div
                                                class="existing-weekday-display"
                                            >
                                                <small
                                                    >Current value:
                                                    {{ weekday() }}</small
                                                >
                                            </div>
                                        }
                                        <div class="weekday-preview">
                                            <small
                                                >Will be shown as:
                                                {{ computedWeekday() }}</small
                                            >
                                        </div>
                                    </div>

                                    <div class="time-section">
                                        <div class="time-row">
                                            <mat-form-field
                                                appearance="outline"
                                            >
                                                <mat-label
                                                    >Start Time</mat-label
                                                >
                                                <mat-select
                                                    [(ngModel)]="startTime"
                                                    name="startTime"
                                                    required
                                                >
                                                    @for (
                                                        time of timeOptions;
                                                        track time.value
                                                    ) {
                                                        <mat-option
                                                            [value]="time.value"
                                                            >{{
                                                                time.label
                                                            }}</mat-option
                                                        >
                                                    }
                                                </mat-select>
                                            </mat-form-field>

                                            <mat-form-field
                                                appearance="outline"
                                            >
                                                <mat-label>End Time</mat-label>
                                                <mat-select
                                                    [(ngModel)]="endTime"
                                                    name="endTime"
                                                    required
                                                >
                                                    @for (
                                                        time of timeOptions;
                                                        track time.value
                                                    ) {
                                                        <mat-option
                                                            [value]="time.value"
                                                            >{{
                                                                time.label
                                                            }}</mat-option
                                                        >
                                                    }
                                                </mat-select>
                                            </mat-form-field>
                                        </div>
                                        @if (dailyTimes() && editMode()) {
                                            <div class="existing-time-display">
                                                <small
                                                    >Current value:
                                                    {{ dailyTimes() }}</small
                                                >
                                            </div>
                                        }
                                        <div class="time-preview">
                                            <small
                                                >Will be shown as:
                                                {{
                                                    computedDailyTimes()
                                                }}</small
                                            >
                                        </div>
                                    </div>

                                    <mat-form-field appearance="outline">
                                        <mat-label>Location</mat-label>
                                        <input
                                            matInput
                                            [(ngModel)]="location"
                                            name="location"
                                            required
                                            [matAutocomplete]="locationAuto"
                                            placeholder="e.g., Mountain SOL Campus"
                                        />
                                        <mat-autocomplete
                                            #locationAuto="matAutocomplete"
                                        >
                                            @for (
                                                loc of filteredLocations();
                                                track loc
                                            ) {
                                                <mat-option [value]="loc">{{
                                                    loc
                                                }}</mat-option>
                                            }
                                        </mat-autocomplete>
                                    </mat-form-field>
                                </section>

                                <mat-divider></mat-divider>

                                <section class="form-section">
                                    <h3>Enrollment Settings</h3>

                                    <div class="grade-row">
                                        <mat-form-field appearance="outline">
                                            <mat-label>Minimum Grade</mat-label>
                                            <mat-select
                                                [(ngModel)]="gradeRangeStart"
                                                name="gradeRangeStart"
                                                required
                                            >
                                                @for (
                                                    grade of grades;
                                                    track grade.value
                                                ) {
                                                    <mat-option
                                                        [value]="grade.value"
                                                        >{{
                                                            grade.label
                                                        }}</mat-option
                                                    >
                                                }
                                            </mat-select>
                                        </mat-form-field>

                                        <mat-form-field appearance="outline">
                                            <mat-label>Maximum Grade</mat-label>
                                            <mat-select
                                                [(ngModel)]="gradeRangeEnd"
                                                name="gradeRangeEnd"
                                                required
                                            >
                                                @for (
                                                    grade of grades;
                                                    track grade.value
                                                ) {
                                                    <mat-option
                                                        [value]="grade.value"
                                                        >{{
                                                            grade.label
                                                        }}</mat-option
                                                    >
                                                }
                                            </mat-select>
                                        </mat-form-field>
                                    </div>

                                    <div class="student-size-row">
                                        <mat-form-field appearance="outline">
                                            <mat-label
                                                >Minimum Students</mat-label
                                            >
                                            <input
                                                matInput
                                                type="number"
                                                [(ngModel)]="minStudentSize"
                                                name="minStudentSize"
                                                min="1"
                                            />
                                        </mat-form-field>

                                        <mat-form-field appearance="outline">
                                            <mat-label
                                                >Maximum Students</mat-label
                                            >
                                            <input
                                                matInput
                                                type="number"
                                                [(ngModel)]="maxStudentSize"
                                                name="maxStudentSize"
                                                min="1"
                                            />
                                        </mat-form-field>
                                    </div>
                                </section>

                                <mat-divider></mat-divider>

                                <section class="form-section">
                                    <h3>Pricing</h3>

                                    <mat-form-field appearance="outline">
                                        <mat-label>Cost ($)</mat-label>
                                        <input
                                            matInput
                                            type="number"
                                            [(ngModel)]="cost"
                                            name="cost"
                                            min="0"
                                            required
                                        />
                                        <span matPrefix>$&nbsp;</span>
                                    </mat-form-field>

                                    <div class="sliding-scale-toggle">
                                        <mat-slide-toggle
                                            [(ngModel)]="useSlidingScale"
                                            name="useSlidingScale"
                                        >
                                            Enable sliding scale pricing
                                        </mat-slide-toggle>
                                    </div>

                                    @if (useSlidingScale()) {
                                        <div class="payment-range-row">
                                            <mat-form-field
                                                appearance="outline"
                                            >
                                                <mat-label
                                                    >Minimum ($)</mat-label
                                                >
                                                <input
                                                    matInput
                                                    type="number"
                                                    [(ngModel)]="
                                                        paymentRangeLowest
                                                    "
                                                    name="paymentRangeLowest"
                                                    min="0"
                                                />
                                                <span matPrefix>$&nbsp;</span>
                                            </mat-form-field>

                                            <mat-form-field
                                                appearance="outline"
                                            >
                                                <mat-label
                                                    >Maximum ($)</mat-label
                                                >
                                                <input
                                                    matInput
                                                    type="number"
                                                    [(ngModel)]="
                                                        paymentRangeHighest
                                                    "
                                                    name="paymentRangeHighest"
                                                    min="0"
                                                />
                                                <span matPrefix>$&nbsp;</span>
                                            </mat-form-field>
                                        </div>
                                    }
                                </section>

                                <mat-divider></mat-divider>

                                <section class="form-section">
                                    <h3>Instructors</h3>

                                    <mat-form-field appearance="outline">
                                        <mat-label
                                            >Select Instructors</mat-label
                                        >
                                        <mat-select
                                            [(ngModel)]="selectedInstructorIds"
                                            name="instructors"
                                            multiple
                                            required
                                        >
                                            @for (
                                                instructor of instructors();
                                                track instructor.id
                                            ) {
                                                <mat-option
                                                    [value]="instructor.id"
                                                >
                                                    {{ instructor.firstName }}
                                                    {{ instructor.lastName }}
                                                </mat-option>
                                            }
                                        </mat-select>
                                    </mat-form-field>
                                </section>

                                <mat-divider></mat-divider>

                                <section class="form-section">
                                    <h3>Units</h3>
                                    <p class="section-description">
                                        Select units that students will earn
                                        upon completing this class.
                                    </p>
                                    <sol-unit-selector
                                        [initialSelectedIds]="selectedUnitIds()"
                                        [ageGroup]="ageGroup()"
                                        (selectionChange)="
                                            onUnitSelectionChange($event)
                                        "
                                    ></sol-unit-selector>
                                </section>

                                <mat-divider></mat-divider>

                                <section class="form-section">
                                    <h3>Visibility</h3>

                                    <div class="toggle-group">
                                        <mat-slide-toggle
                                            [(ngModel)]="live"
                                            name="live"
                                        >
                                            Publish class (visible to public)
                                        </mat-slide-toggle>

                                        <mat-slide-toggle
                                            [(ngModel)]="pausedForEnrollment"
                                            name="pausedForEnrollment"
                                        >
                                            Pause enrollment (visible but not
                                            enrollable)
                                        </mat-slide-toggle>

                                        <mat-slide-toggle
                                            [(ngModel)]="forInformationOnly"
                                            name="forInformationOnly"
                                        >
                                            Information only (no enrollment)
                                        </mat-slide-toggle>
                                    </div>
                                </section>

                                <div class="form-actions">
                                    <button
                                        mat-button
                                        type="button"
                                        (click)="cancel()"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        mat-raised-button
                                        color="primary"
                                        type="submit"
                                        [disabled]="
                                            !canSubmit() ||
                                            formState().status === 'submitting'
                                        "
                                    >
                                        @if (
                                            formState().status === 'submitting'
                                        ) {
                                            <mat-spinner
                                                diameter="20"
                                            ></mat-spinner>
                                        } @else if (editMode()) {
                                            Save Changes
                                        } @else {
                                            Create Class
                                        }
                                    </button>
                                </div>
                            </form>
                        }
                    }
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [
        `
            .form-container {
                max-width: 800px;
                margin: 2rem auto;
                padding: 0 1rem;
            }

            .form-card {
                padding: 1rem;
            }

            .form-content {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-top: 1rem;
            }

            .form-section {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 1rem 0;
            }

            .form-section h3 {
                margin: 0 0 0.5rem 0;
                color: #333;
                font-size: 1.1rem;
            }

            .section-description {
                margin: 0;
                color: #666;
                font-size: 0.875rem;
            }

            mat-form-field {
                width: 100%;
            }

            .date-row,
            .schedule-row,
            .grade-row,
            .payment-range-row,
            .time-row,
            .student-size-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .weekday-section,
            .time-section {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .existing-weekday-display,
            .existing-time-display {
                color: #666;
                font-style: italic;
            }

            .weekday-preview,
            .time-preview {
                color: var(--sol-primary, #006633);
            }

            .sliding-scale-toggle {
                margin: 0.5rem 0;
            }

            .toggle-group {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .form-actions {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                margin-top: 1rem;
                padding-top: 1rem;
            }

            .error-banner {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem;
                background-color: #ffebee;
                border-radius: 4px;
                color: #c62828;
                margin-bottom: 1rem;
            }

            .success-banner {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem;
                background-color: #e8f5e9;
                border-radius: 4px;
                color: #2e7d32;
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

            mat-spinner {
                display: inline-block;
            }

            @media (max-width: 600px) {
                .date-row,
                .schedule-row,
                .grade-row,
                .payment-range-row,
                .time-row,
                .student-size-row {
                    grid-template-columns: 1fr;
                }
            }
        `,
    ],
})
export class ClassFormComponent implements OnInit {
    readonly #functions = inject(FirebaseFunctionsService);
    readonly #semesterService = inject(ClassesSemesterListService);
    readonly #router = inject(Router);
    readonly #route = inject(ActivatedRoute);

    readonly #semesterIdFromQuery = toSignal(
        this.#route.queryParamMap.pipe(
            map((params) => params.get('semesterId') ?? '')
        )
    );

    readonly #classIdFromRoute = toSignal(
        this.#route.paramMap.pipe(map((params) => params.get('id') ?? ''))
    );

    readonly editMode = computed(() => !!this.#classIdFromRoute());

    // rxResource for instructors - loads once on init
    readonly #instructorsResource = rxResource({
        stream: () =>
            this.#functions
                .call<Instructor[]>('getInstructors')
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly instructors = computed<Instructor[]>(
        () => this.#instructorsResource.value() ?? []
    );

    // rxResource for class types - loads once on init
    readonly #classTypesResource = rxResource({
        stream: () =>
            this.#functions
                .call<{
                    classTypes: Array<{ id: string; name: string }>;
                }>('getClassTypes')
                .pipe(
                    RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                    map((result) => result.classTypes.map((ct) => ct.name))
                ),
    });

    readonly classTypeOptions = computed<string[]>(
        () => this.#classTypesResource.value() ?? []
    );

    // rxResource for locations - loads once on init
    readonly #locationsResource = rxResource({
        stream: () =>
            this.#functions
                .call<{
                    locations: Array<{ id: string; name: string }>;
                }>('getLocations')
                .pipe(
                    RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                    map((result) => result.locations.map((loc) => loc.name))
                ),
    });

    readonly locationOptions = computed<string[]>(
        () => this.#locationsResource.value() ?? []
    );

    // rxResource for loading class for edit - params-based
    readonly #classForEditResource = rxResource({
        params: () => ({
            classId: this.#classIdFromRoute() ?? '',
            semesterId: this.#semesterIdFromQuery() ?? '',
        }),
        stream: ({ params }) => {
            if (!params.classId || !params.semesterId) {
                return of(null);
            }
            return this.#functions
                .call<{ class: ClassForEdit }>('getClassForEdit', {
                    semesterId: params.semesterId,
                    classId: params.classId,
                })
                .pipe(
                    RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                    catchError((err) => {
                        this.formState.set({
                            status: 'error',
                            message:
                                err?.message ??
                                'Failed to load class for editing',
                        });
                        return of(null);
                    })
                );
        },
    });

    readonly loadingClass = computed(
        () => this.#classForEditResource.status() === 'loading'
    );

    readonly filteredClassTypes = computed(() => {
        const options = this.classTypeOptions();
        const currentValue = this.classType().toLowerCase();
        if (!currentValue) {
            return options;
        }
        return options.filter((opt) =>
            opt.toLowerCase().includes(currentValue)
        );
    });

    readonly weekdayOptions = [
        {
            value: 'Su',
            label: 'Sunday',
            fullName: 'Sunday',
            aliases: ['sun', 'su'],
        },
        {
            value: 'M',
            label: 'Monday',
            fullName: 'Monday',
            aliases: ['mon', 'm'],
        },
        {
            value: 'Tu',
            label: 'Tuesday',
            fullName: 'Tuesday',
            aliases: ['tue', 'tu', 'tues'],
        },
        {
            value: 'W',
            label: 'Wednesday',
            fullName: 'Wednesday',
            aliases: ['wed', 'w'],
        },
        {
            value: 'Th',
            label: 'Thursday',
            fullName: 'Thursday',
            aliases: ['thu', 'th', 'thur', 'thurs'],
        },
        {
            value: 'F',
            label: 'Friday',
            fullName: 'Friday',
            aliases: ['fri', 'f'],
        },
        {
            value: 'Sa',
            label: 'Saturday',
            fullName: 'Saturday',
            aliases: ['sat', 'sa'],
        },
    ];

    selectedWeekdays = signal<string[]>([]);

    computedWeekday = computed(() => {
        const selected = this.selectedWeekdays();
        if (selected.length === 0) {
            return '';
        }
        if (selected.length === 7) {
            return 'Every Day';
        }
        if (
            selected.length === 5 &&
            selected.includes('M') &&
            selected.includes('Tu') &&
            selected.includes('W') &&
            selected.includes('Th') &&
            selected.includes('F')
        ) {
            return 'M-F';
        }
        if (
            selected.length === 2 &&
            selected.includes('Sa') &&
            selected.includes('Su')
        ) {
            return 'Weekends';
        }
        // Check for consecutive days to use range notation
        const dayOrder = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
        const indices = selected
            .map((d) => dayOrder.indexOf(d))
            .sort((a, b) => a - b);
        const isConsecutive = indices.every(
            (val, i, arr) => i === 0 || val === arr[i - 1] + 1
        );

        if (isConsecutive && selected.length >= 3) {
            const first = dayOrder[indices[0]];
            const last = dayOrder[indices[indices.length - 1]];
            return `${first}-${last}`;
        }

        // Otherwise list individual days in order
        return dayOrder.filter((d) => selected.includes(d)).join(', ');
    });

    readonly timeOptions = [
        { value: '5am', label: '5:00 AM' },
        { value: '6am', label: '6:00 AM' },
        { value: '7am', label: '7:00 AM' },
        { value: '8am', label: '8:00 AM' },
        { value: '9am', label: '9:00 AM' },
        { value: '10am', label: '10:00 AM' },
        { value: '11am', label: '11:00 AM' },
        { value: '12pm', label: '12:00 PM' },
        { value: '1pm', label: '1:00 PM' },
        { value: '2pm', label: '2:00 PM' },
        { value: '3pm', label: '3:00 PM' },
        { value: '4pm', label: '4:00 PM' },
        { value: '5pm', label: '5:00 PM' },
        { value: '6pm', label: '6:00 PM' },
        { value: '7pm', label: '7:00 PM' },
        { value: '8pm', label: '8:00 PM' },
        { value: '9pm', label: '9:00 PM' },
        { value: '10pm', label: '10:00 PM' },
        { value: '11pm', label: '11:00 PM' },
        { value: 'All Day', label: 'All Day' },
    ];

    startTime = signal<string>('');
    endTime = signal<string>('');

    computedDailyTimes = computed(() => {
        const start = this.startTime();
        const end = this.endTime();
        if (start === 'All Day' || end === 'All Day') {
            return 'All Day';
        }
        if (!start || !end) {
            return '';
        }
        return `${start}-${end}`;
    });

    readonly filteredLocations = computed(() => {
        const options = this.locationOptions();
        const currentValue = this.location().toLowerCase();
        if (!currentValue) {
            return options;
        }
        return options.filter((opt) =>
            opt.toLowerCase().includes(currentValue)
        );
    });

    readonly grades = [
        { value: -1, label: 'Pre-K' },
        { value: 0, label: 'Kindergarten' },
        { value: 1, label: '1st Grade' },
        { value: 2, label: '2nd Grade' },
        { value: 3, label: '3rd Grade' },
        { value: 4, label: '4th Grade' },
        { value: 5, label: '5th Grade' },
        { value: 6, label: '6th Grade' },
        { value: 7, label: '7th Grade' },
        { value: 8, label: '8th Grade' },
        { value: 9, label: '9th Grade' },
        { value: 10, label: '10th Grade' },
        { value: 11, label: '11th Grade' },
        { value: 12, label: '12th Grade' },
    ];

    semesterId = signal<string>('');
    name = signal<string>('');
    description = signal<string>('');
    classType = signal<string>('');
    startDate = signal<Date | null>(null);
    endDate = signal<Date | null>(null);
    registrationEndDate = signal<Date | null>(null);
    weekday = signal<string>('');
    dailyTimes = signal<string>('');
    location = signal<string>('');
    gradeRangeStart = signal<number>(0);
    gradeRangeEnd = signal<number>(12);
    minStudentSize = signal<number>(5);
    maxStudentSize = signal<number>(12);
    cost = signal<number>(0);
    useSlidingScale = signal<boolean>(false);
    paymentRangeLowest = signal<number | null>(null);
    paymentRangeHighest = signal<number | null>(null);
    selectedInstructorIds = signal<string[]>([]);
    live = signal<boolean>(false);
    pausedForEnrollment = signal<boolean>(false);
    forInformationOnly = signal<boolean>(false);
    selectedUnitIds = signal<string[]>([]);
    ageGroup = signal<string>('');

    formState = signal<FormState>({ status: 'idle' });

    readonly #semestersResource = rxResource({
        stream: () =>
            this.#semesterService
                .getAllSemestersWithCurrentFirst()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly semesters = computed<Semester[]>(
        () => this.#semestersResource.value() ?? []
    );

    // rxMethod for form submission
    readonly #performSubmit = rxMethod<
        | {
              isUpdate: boolean;
              classId?: string;
              request: {
                  semesterId: string;
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
                  unitIds: string[];
                  ageGroup?: string;
              };
          }
        | undefined
    >(
        pipe(
            filter((data): data is NonNullable<typeof data> => !!data),
            tap(() => this.formState.set({ status: 'submitting' })),
            switchMap((data) => {
                if (data.isUpdate && data.classId) {
                    const updateRequest = {
                        ...data.request,
                        classId: data.classId,
                    };
                    return this.#functions
                        .call<{
                            success: boolean;
                        }>('updateClass', updateRequest)
                        .pipe(
                            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                            tap((result) => {
                                if (result.success) {
                                    this.formState.set({
                                        status: 'success',
                                        classId: data.classId!,
                                    });
                                } else {
                                    this.formState.set({
                                        status: 'error',
                                        message: 'Failed to update class',
                                    });
                                }
                            }),
                            catchError((err) => {
                                this.formState.set({
                                    status: 'error',
                                    message:
                                        err?.message ??
                                        'An unexpected error occurred',
                                });
                                return EMPTY;
                            })
                        );
                } else {
                    return this.#functions
                        .call<{
                            success: boolean;
                            classId: string;
                        }>('createClass', data.request)
                        .pipe(
                            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                            tap((result) => {
                                if (result.success) {
                                    this.formState.set({
                                        status: 'success',
                                        classId: result.classId,
                                    });
                                } else {
                                    this.formState.set({
                                        status: 'error',
                                        message: 'Failed to create class',
                                    });
                                }
                            }),
                            catchError((err) => {
                                this.formState.set({
                                    status: 'error',
                                    message:
                                        err?.message ??
                                        'An unexpected error occurred',
                                });
                                return EMPTY;
                            })
                        );
                }
            })
        )
    );

    readonly canSubmit = computed(() => {
        return (
            this.semesterId().length > 0 &&
            this.name().trim().length > 0 &&
            this.classType().length > 0 &&
            this.startDate() !== null &&
            this.endDate() !== null &&
            this.registrationEndDate() !== null &&
            this.computedWeekday().length > 0 &&
            this.computedDailyTimes().length > 0 &&
            this.location().length > 0 &&
            this.selectedInstructorIds().length > 0 &&
            this.formState().status !== 'submitting'
        );
    });

    constructor() {
        // Set semester from query param
        effect(() => {
            const queryParamSemesterId = this.#semesterIdFromQuery();
            if (queryParamSemesterId && !this.semesterId()) {
                this.semesterId.set(queryParamSemesterId);
            }
        });

        // Populate form when class data loads (edit mode)
        effect(() => {
            const result = this.#classForEditResource.value();
            if (result?.class) {
                this.#populateFormFromClass(result.class);
            }
        });
    }

    ngOnInit() {
        // All data loading is now handled by rxResource declarations
        // rxMethod for submission is connected via signal
    }

    #populateFormFromClass(cls: ClassForEdit) {
        const semesterId = this.#semesterIdFromQuery();
        if (semesterId) {
            this.semesterId.set(semesterId);
        }
        this.name.set(cls.name);
        this.description.set(cls.description);
        this.classType.set(cls.classType);
        this.startDate.set(cls.startDate ? new Date(cls.startDate) : null);
        this.endDate.set(cls.endDate ? new Date(cls.endDate) : null);
        this.registrationEndDate.set(
            cls.registrationEndDate ? new Date(cls.registrationEndDate) : null
        );
        this.weekday.set(cls.weekday);
        this.#parseAndSetWeekdays(cls.weekday);
        this.dailyTimes.set(cls.dailyTimes);
        this.#parseAndSetTimes(cls.dailyTimes);
        this.location.set(cls.location);
        this.gradeRangeStart.set(cls.gradeRangeStart);
        this.gradeRangeEnd.set(cls.gradeRangeEnd);
        this.minStudentSize.set(cls.minStudentSize);
        this.maxStudentSize.set(cls.maxStudentSize);
        this.cost.set(cls.cost);
        if (
            cls.paymentRangeLowest !== undefined &&
            cls.paymentRangeHighest !== undefined
        ) {
            this.useSlidingScale.set(true);
            this.paymentRangeLowest.set(cls.paymentRangeLowest);
            this.paymentRangeHighest.set(cls.paymentRangeHighest);
        }
        this.selectedInstructorIds.set(cls.instructorIds);
        this.live.set(cls.live);
        this.pausedForEnrollment.set(cls.pausedForEnrollment);
        this.forInformationOnly.set(cls.forInformationOnly);
        this.selectedUnitIds.set(cls.unitIds ?? []);
        this.ageGroup.set(cls.ageGroup ?? '');
    }

    #parseAndSetTimes(dailyTimes: string) {
        if (!dailyTimes) return;

        const normalized = dailyTimes.toLowerCase().trim();

        if (normalized === 'all day') {
            this.startTime.set('All Day');
            this.endTime.set('All Day');
            return;
        }

        // Match patterns like "9am-12pm", "9am-4pm", "1pm-4pm", "5pm-11am"
        const timeRegex = /(\d{1,2})\s*(am|pm)\s*[-–]\s*(\d{1,2})\s*(am|pm)/i;
        const match = normalized.match(timeRegex);

        if (match) {
            const startHour = match[1];
            const startPeriod = match[2].toLowerCase();
            const endHour = match[3];
            const endPeriod = match[4].toLowerCase();

            const startValue = `${startHour}${startPeriod}`;
            const endValue = `${endHour}${endPeriod}`;

            // Check if these values exist in our options
            const validStart = this.timeOptions.some(
                (opt) => opt.value.toLowerCase() === startValue
            );
            const validEnd = this.timeOptions.some(
                (opt) => opt.value.toLowerCase() === endValue
            );

            if (validStart) {
                const matchedStart = this.timeOptions.find(
                    (opt) => opt.value.toLowerCase() === startValue
                );
                this.startTime.set(matchedStart?.value ?? '');
            }
            if (validEnd) {
                const matchedEnd = this.timeOptions.find(
                    (opt) => opt.value.toLowerCase() === endValue
                );
                this.endTime.set(matchedEnd?.value ?? '');
            }
        }
    }

    #parseAndSetWeekdays(weekday: string) {
        if (!weekday) return;

        const normalized = weekday.toLowerCase().trim();
        const dayOrder = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
        const selected: string[] = [];

        // Handle special cases
        if (normalized === 'every day' || normalized === 'daily') {
            this.selectedWeekdays.set([...dayOrder]);
            return;
        }

        if (normalized === 'weekends') {
            this.selectedWeekdays.set(['Sa', 'Su']);
            return;
        }

        if (normalized === 'weekdays' || normalized === 'm-f') {
            this.selectedWeekdays.set(['M', 'Tu', 'W', 'Th', 'F']);
            return;
        }

        // Handle range notation like "M-Th", "Su-F", "Tu-Sa"
        const rangeMatch = normalized.match(
            /^([a-z]{1,4})\s*[-–]\s*([a-z]{1,4})$/i
        );
        if (rangeMatch) {
            const startDay = this.#findDayValue(rangeMatch[1]);
            const endDay = this.#findDayValue(rangeMatch[2]);

            if (startDay && endDay) {
                const startIdx = dayOrder.indexOf(startDay);
                const endIdx = dayOrder.indexOf(endDay);

                if (startIdx !== -1 && endIdx !== -1) {
                    if (startIdx <= endIdx) {
                        for (let i = startIdx; i <= endIdx; i++) {
                            selected.push(dayOrder[i]);
                        }
                    } else {
                        // Wrap around (e.g., "F-Tu" means F, Sa, Su, M, Tu)
                        for (let i = startIdx; i < dayOrder.length; i++) {
                            selected.push(dayOrder[i]);
                        }
                        for (let i = 0; i <= endIdx; i++) {
                            selected.push(dayOrder[i]);
                        }
                    }
                    this.selectedWeekdays.set(selected);
                    return;
                }
            }
        }

        // Handle comma-separated or individual days
        const parts = normalized.split(/[,\s]+/).filter((p) => p.length > 0);
        for (const part of parts) {
            const dayValue = this.#findDayValue(part);
            if (dayValue && !selected.includes(dayValue)) {
                selected.push(dayValue);
            }
        }

        if (selected.length > 0) {
            this.selectedWeekdays.set(selected);
        }
    }

    #findDayValue(input: string): string | null {
        const normalized = input.toLowerCase().trim();
        for (const day of this.weekdayOptions) {
            if (
                day.value.toLowerCase() === normalized ||
                day.fullName.toLowerCase() === normalized ||
                day.aliases.includes(normalized)
            ) {
                return day.value;
            }
        }
        return null;
    }

    #buildBaseRequest() {
        const paymentRangeLowest = this.paymentRangeLowest();
        const paymentRangeHighest = this.paymentRangeHighest();
        return {
            semesterId: this.semesterId(),
            name: this.name(),
            description: this.description(),
            classType: this.classType(),
            gradeRangeStart: this.gradeRangeStart(),
            gradeRangeEnd: this.gradeRangeEnd(),
            cost: this.cost(),
            paymentRangeLowest:
                this.useSlidingScale() && paymentRangeLowest != null
                    ? paymentRangeLowest
                    : undefined,
            paymentRangeHighest:
                this.useSlidingScale() && paymentRangeHighest != null
                    ? paymentRangeHighest
                    : undefined,
            location: this.location(),
            instructorIds: this.selectedInstructorIds(),
            weekday: this.computedWeekday(),
            dailyTimes: this.computedDailyTimes(),
            startDate: this.startDate()?.toISOString() ?? '',
            endDate: this.endDate()?.toISOString() ?? '',
            registrationEndDate:
                this.registrationEndDate()?.toISOString() ?? '',
            minStudentSize: this.minStudentSize(),
            maxStudentSize: this.maxStudentSize(),
            live: this.live(),
            pausedForEnrollment: this.pausedForEnrollment(),
            forInformationOnly: this.forInformationOnly(),
            unitIds: this.selectedUnitIds(),
            ageGroup: this.ageGroup() || undefined,
        };
    }

    submitForm() {
        if (!this.canSubmit()) return;

        const classId = this.#classIdFromRoute();
        this.#performSubmit({
            isUpdate: !!classId,
            classId: classId || undefined,
            request: this.#buildBaseRequest(),
        });
    }

    resetForm() {
        this.name.set('');
        this.description.set('');
        this.classType.set('');
        this.startDate.set(null);
        this.endDate.set(null);
        this.registrationEndDate.set(null);
        this.weekday.set('');
        this.selectedWeekdays.set([]);
        this.dailyTimes.set('');
        this.startTime.set('');
        this.endTime.set('');
        this.location.set('');
        this.gradeRangeStart.set(0);
        this.gradeRangeEnd.set(12);
        this.minStudentSize.set(5);
        this.maxStudentSize.set(12);
        this.cost.set(0);
        this.useSlidingScale.set(false);
        this.paymentRangeLowest.set(null);
        this.paymentRangeHighest.set(null);
        this.selectedInstructorIds.set([]);
        this.live.set(false);
        this.pausedForEnrollment.set(false);
        this.forInformationOnly.set(false);
        this.selectedUnitIds.set([]);
        this.ageGroup.set('');
        this.formState.set({ status: 'idle' });
    }

    onUnitSelectionChange(unitIds: string[]) {
        this.selectedUnitIds.set(unitIds);
    }

    cancel() {
        this.navigateToList();
    }

    navigateToList() {
        const semesterId = this.semesterId();
        this.#router.navigate(['/admin/classes/management'], {
            queryParams: semesterId ? { semesterId } : {},
        });
    }
}

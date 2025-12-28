import { Component, inject, signal, computed, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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

interface Instructor {
    id: string;
    firstName: string;
    lastName: string;
}

interface Semester {
    id: string;
    name: string;
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
    ],
    template: `
        <div class="form-container">
            <mat-card class="form-card">
                <mat-card-header>
                    <mat-card-title>Create New Class</mat-card-title>
                    <mat-card-subtitle
                        >Fill in the details below to create a new
                        class</mat-card-subtitle
                    >
                </mat-card-header>

                <mat-card-content>
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
                            <span>Class created successfully!</span>
                            <button
                                mat-button
                                color="primary"
                                (click)="resetForm()"
                            >
                                Create Another
                            </button>
                        </div>
                    } @else {
                        <form class="form-content" (ngSubmit)="submitForm()">
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
                                            <mat-option [value]="semester.id">{{
                                                semester.name
                                            }}</mat-option>
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
                                    <mat-select
                                        [(ngModel)]="classType"
                                        name="classType"
                                        required
                                    >
                                        @for (type of classTypes; track type) {
                                            <mat-option [value]="type">{{
                                                type
                                            }}</mat-option>
                                        }
                                    </mat-select>
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
                                    <mat-label>Registration End Date</mat-label>
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
                                    <mat-datepicker #regPicker></mat-datepicker>
                                </mat-form-field>

                                <div class="schedule-row">
                                    <mat-form-field appearance="outline">
                                        <mat-label>Day of Week</mat-label>
                                        <mat-select
                                            [(ngModel)]="weekday"
                                            name="weekday"
                                            required
                                        >
                                            @for (day of weekdays; track day) {
                                                <mat-option [value]="day">{{
                                                    day
                                                }}</mat-option>
                                            }
                                        </mat-select>
                                    </mat-form-field>

                                    <mat-form-field appearance="outline">
                                        <mat-label>Time</mat-label>
                                        <input
                                            matInput
                                            [(ngModel)]="dailyTimes"
                                            name="dailyTimes"
                                            placeholder="e.g., 9:00 AM - 12:00 PM"
                                            required
                                        />
                                    </mat-form-field>
                                </div>

                                <mat-form-field appearance="outline">
                                    <mat-label>Location</mat-label>
                                    <mat-select
                                        [(ngModel)]="location"
                                        name="location"
                                        required
                                    >
                                        @for (loc of locations; track loc) {
                                            <mat-option [value]="loc">{{
                                                loc
                                            }}</mat-option>
                                        }
                                    </mat-select>
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

                                <mat-form-field appearance="outline">
                                    <mat-label>Maximum Students</mat-label>
                                    <input
                                        matInput
                                        type="number"
                                        [(ngModel)]="maxStudentSize"
                                        name="maxStudentSize"
                                        min="1"
                                        placeholder="Leave blank for unlimited"
                                    />
                                </mat-form-field>
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
                                        <mat-form-field appearance="outline">
                                            <mat-label>Minimum ($)</mat-label>
                                            <input
                                                matInput
                                                type="number"
                                                [(ngModel)]="paymentRangeLowest"
                                                name="paymentRangeLowest"
                                                min="0"
                                            />
                                            <span matPrefix>$&nbsp;</span>
                                        </mat-form-field>

                                        <mat-form-field appearance="outline">
                                            <mat-label>Maximum ($)</mat-label>
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
                                    <mat-label>Select Instructors</mat-label>
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
                                            <mat-option [value]="instructor.id">
                                                {{ instructor.firstName }}
                                                {{ instructor.lastName }}
                                            </mat-option>
                                        }
                                    </mat-select>
                                </mat-form-field>
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
                                    @if (formState().status === 'submitting') {
                                        <mat-spinner
                                            diameter="20"
                                        ></mat-spinner>
                                    } @else {
                                        Create Class
                                    }
                                </button>
                            </div>
                        </form>
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

            mat-form-field {
                width: 100%;
            }

            .date-row,
            .schedule-row,
            .grade-row,
            .payment-range-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
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

            mat-spinner {
                display: inline-block;
            }

            @media (max-width: 600px) {
                .date-row,
                .schedule-row,
                .grade-row,
                .payment-range-row {
                    grid-template-columns: 1fr;
                }
            }
        `,
    ],
})
export class ClassFormComponent implements OnInit {
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly semesterService = inject(ClassesSemesterListService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);

    private readonly semesterIdFromQuery = toSignal(
        this.route.queryParamMap.pipe(
            map((params) => params.get('semesterId') ?? '')
        )
    );

    readonly classTypes = [
        'Homeschool',
        'Afterschool',
        'Weekend',
        'Camp',
        'Workshop',
        'Special Event',
    ];

    readonly weekdays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    readonly locations = [
        'Farm',
        'Forest',
        'Mountain',
        'Stream',
        'Garden',
        'Classroom',
    ];

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
    maxStudentSize = signal<number | null>(null);
    cost = signal<number>(0);
    useSlidingScale = signal<boolean>(false);
    paymentRangeLowest = signal<number | null>(null);
    paymentRangeHighest = signal<number | null>(null);
    selectedInstructorIds = signal<string[]>([]);
    live = signal<boolean>(false);
    forInformationOnly = signal<boolean>(false);

    formState = signal<FormState>({ status: 'idle' });

    private semestersRaw = toSignal(
        this.semesterService
            .getAllSemestersWithCurrentFirst()
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
    );

    semesters = computed<Semester[]>(() => this.semestersRaw() ?? []);

    instructors = signal<Instructor[]>([]);

    canSubmit = computed(() => {
        return (
            this.semesterId().length > 0 &&
            this.name().trim().length > 0 &&
            this.classType().length > 0 &&
            this.startDate() !== null &&
            this.endDate() !== null &&
            this.registrationEndDate() !== null &&
            this.weekday().length > 0 &&
            this.dailyTimes().trim().length > 0 &&
            this.location().length > 0 &&
            this.selectedInstructorIds().length > 0 &&
            this.formState().status !== 'submitting'
        );
    });

    constructor() {
        effect(() => {
            const queryParamSemesterId = this.semesterIdFromQuery();
            if (queryParamSemesterId && !this.semesterId()) {
                this.semesterId.set(queryParamSemesterId);
            }
        });
    }

    ngOnInit() {
        this.loadInstructors();
    }

    private loadInstructors() {
        this.functions
            .call<Instructor[]>('getInstructors')
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe((instructors) => {
                this.instructors.set(instructors);
            });
    }

    submitForm() {
        if (!this.canSubmit()) return;

        this.formState.set({ status: 'submitting' });

        const request = {
            semesterId: this.semesterId(),
            name: this.name(),
            description: this.description(),
            classType: this.classType(),
            gradeRangeStart: this.gradeRangeStart(),
            gradeRangeEnd: this.gradeRangeEnd(),
            cost: this.cost(),
            paymentRangeLowest: this.useSlidingScale()
                ? this.paymentRangeLowest()
                : undefined,
            paymentRangeHighest: this.useSlidingScale()
                ? this.paymentRangeHighest()
                : undefined,
            location: this.location(),
            instructorIds: this.selectedInstructorIds(),
            weekday: this.weekday(),
            dailyTimes: this.dailyTimes(),
            startDate: this.startDate()?.toISOString() ?? '',
            endDate: this.endDate()?.toISOString() ?? '',
            registrationEndDate:
                this.registrationEndDate()?.toISOString() ?? '',
            maxStudentSize: this.maxStudentSize() ?? undefined,
            live: this.live(),
            forInformationOnly: this.forInformationOnly(),
        };

        this.functions
            .call<{ success: boolean; classId: string }>('createClass', request)
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe({
                next: (result) => {
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
                },
                error: (err) => {
                    this.formState.set({
                        status: 'error',
                        message: err?.message ?? 'An unexpected error occurred',
                    });
                },
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
        this.dailyTimes.set('');
        this.location.set('');
        this.gradeRangeStart.set(0);
        this.gradeRangeEnd.set(12);
        this.maxStudentSize.set(null);
        this.cost.set(0);
        this.useSlidingScale.set(false);
        this.paymentRangeLowest.set(null);
        this.paymentRangeHighest.set(null);
        this.selectedInstructorIds.set([]);
        this.live.set(false);
        this.forInformationOnly.set(false);
        this.formState.set({ status: 'idle' });
    }

    cancel() {
        this.router.navigate(['/admin']);
    }
}

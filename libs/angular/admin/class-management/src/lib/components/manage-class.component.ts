import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SemesterClass } from '@sol/classes/domain';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

export interface ClassFormData {
    id?: string;
    name: string;
    description: string;
    live: boolean;
    cost: number;
    location: string;
    weekday: string;
    thumbnailUrl: string;
    payment_range_lowest?: number;
    payment_range_highest?: number;
    instructorIds: string[];
    studentIds?: string[];
    unitIds?: string[];
    startMs: number;
    endMs: number;
    registrationEndMs: number;
    class_type: string;
    grade_range_start: number;
    grade_range_end: number;
    paused_for_enrollment: boolean;
    daily_times: string;
    max_student_size: number;
    for_information_only: boolean;
    additional_options: Array<{
        id: string;
        description: string;
        cost: number;
        studentIds?: string[];
    }>;
    semesterId?: string;
}

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        AccordionModule,
        DropdownModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        TableModule,
        MultiSelectModule,
        InputSwitchModule,
        InputTextModule,
        InputNumberModule,
    ],
    template: `<!-- manage-class.component.html -->
        <p-accordion>
            <!-- Basic Information -->
            <p-accordionTab header="Basic Information">
                <div class="grid gap-4 p-4">
                    <div class="col-12 md:col-6">
                        <span class="p-float-label">
                            <input
                                id="name"
                                type="text"
                                pInputText
                                [(ngModel)]="formData().name"
                                class="w-full"
                            />
                            <label for="name">Class Name</label>
                        </span>
                    </div>

                    <div class="col-12 md:col-6">
                        <span class="p-float-label">
                            <input
                                id="class_type"
                                type="text"
                                pInputText
                                [(ngModel)]="formData().class_type"
                                class="w-full"
                            />
                            <label for="class_type">Class Type</label>
                        </span>
                    </div>

                    <div class="col-12">
                        <span class="p-float-label">
                            <textarea
                                id="description"
                                pInputTextarea
                                [(ngModel)]="formData().description"
                                [autoResize]="true"
                                rows="3"
                                class="w-full"
                            ></textarea>
                            <label for="description">Description</label>
                        </span>
                    </div>

                    <div class="col-12 md:col-6">
                        <span class="p-float-label">
                            <input
                                id="thumbnailUrl"
                                type="text"
                                pInputText
                                [(ngModel)]="formData().thumbnailUrl"
                                class="w-full"
                            />
                            <label for="thumbnailUrl">Thumbnail URL</label>
                        </span>
                    </div>
                </div>
            </p-accordionTab>

            <!-- Schedule and Location -->
            <p-accordionTab header="Schedule and Location">
                <div class="grid gap-4 p-4">
                    <div class="col-12 md:col-6">
                        <span class="p-float-label">
                            <input
                                id="location"
                                type="text"
                                pInputText
                                [(ngModel)]="formData().location"
                                class="w-full"
                            />
                            <label for="location">Location</label>
                        </span>
                    </div>

                    <div class="col-12 md:col-6">
                        <span class="p-float-label">
                            <p-dropdown
                                id="weekday"
                                [(ngModel)]="formData().weekday"
                                [options]="weekdays"
                                class="w-full"
                            ></p-dropdown>
                            <label for="weekday">Weekday</label>
                        </span>
                    </div>

                    <div class="col-12 md:col-6">
                        <span class="p-float-label">
                            <input
                                id="daily_times"
                                type="text"
                                pInputText
                                [(ngModel)]="formData().daily_times"
                                class="w-full"
                            />
                            <label for="daily_times">Daily Times</label>
                        </span>
                    </div>

                    <div class="col-12 md:col-4">
                        <span class="p-float-label">
                            <p-calendar
                                id="start"
                                [ngModel]="displayDates().start"
                                (ngModelChange)="updateStartDate($event)"
                                [showTime]="true"
                                dateFormat="mm/dd/yy"
                                class="w-full"
                            ></p-calendar>
                            <label for="start">Start Date & Time</label>
                        </span>
                    </div>

                    <div class="col-12 md:col-4">
                        <span class="p-float-label">
                            <p-calendar
                                id="end"
                                [ngModel]="displayDates().end"
                                (ngModelChange)="updateEndDate($event)"
                                [showTime]="true"
                                dateFormat="mm/dd/yy"
                                class="w-full"
                            ></p-calendar>
                            <label for="end">End Date & Time</label>
                        </span>
                    </div>

                    <div class="col-12 md:col-4">
                        <span class="p-float-label">
                            <p-calendar
                                id="registration_end"
                                [ngModel]="displayDates().registrationEnd"
                                (ngModelChange)="
                                    updateRegistrationEndDate($event)
                                "
                                [showTime]="true"
                                dateFormat="mm/dd/yy"
                                class="w-full"
                            ></p-calendar>
                            <label for="registration_end"
                                >Registration End Date & Time</label
                            >
                        </span>
                    </div>
                </div>
            </p-accordionTab>

            <!-- Financial -->
            <p-accordionTab header="Financial Information">
                <div class="grid gap-4 p-4">
                    <div class="col-12 md:col-4">
                        <span class="p-float-label">
                            <p-inputNumber
                                id="cost"
                                [(ngModel)]="formData().cost"
                                mode="currency"
                                currency="USD"
                                class="w-full"
                            ></p-inputNumber>
                            <label for="cost">Base Cost</label>
                        </span>
                    </div>

                    <div class="col-12 md:col-4">
                        <span class="p-float-label">
                            <p-inputNumber
                                id="payment_range_lowest"
                                [(ngModel)]="formData().payment_range_lowest"
                                mode="currency"
                                currency="USD"
                                class="w-full"
                            ></p-inputNumber>
                            <label for="payment_range_lowest"
                                >Minimum Payment</label
                            >
                        </span>
                    </div>

                    <div class="col-12 md:col-4">
                        <span class="p-float-label">
                            <p-inputNumber
                                id="payment_range_highest"
                                [(ngModel)]="formData().payment_range_highest"
                                mode="currency"
                                currency="USD"
                                class="w-full"
                            ></p-inputNumber>
                            <label for="payment_range_highest"
                                >Maximum Payment</label
                            >
                        </span>
                    </div>
                </div>

                <!-- Additional Options -->
                <div class="mt-4">
                    <p-panel header="Additional Options">
                        <p-table [value]="formData().additional_options">
                            <ng-template pTemplate="header">
                                <tr>
                                    <th>Description</th>
                                    <th>Cost</th>
                                    <th></th>
                                </tr>
                            </ng-template>
                            <ng-template
                                pTemplate="body"
                                let-option
                                let-i="rowIndex"
                            >
                                <tr>
                                    <td>
                                        <input
                                            pInputText
                                            [(ngModel)]="option.description"
                                            class="w-full"
                                        />
                                    </td>
                                    <td>
                                        <p-inputNumber
                                            [(ngModel)]="option.cost"
                                            mode="currency"
                                            currency="USD"
                                        ></p-inputNumber>
                                    </td>
                                    <td>
                                        <button
                                            pButton
                                            icon="pi pi-trash"
                                            class="p-button-danger p-button-text"
                                            (click)="removeAdditionalOption(i)"
                                        ></button>
                                    </td>
                                </tr>
                            </ng-template>
                        </p-table>
                        <div class="mt-2">
                            <button
                                pButton
                                label="Add Option"
                                icon="pi pi-plus"
                                (click)="addAdditionalOption()"
                            ></button>
                        </div>
                    </p-panel>
                </div>
            </p-accordionTab>

            <!-- Settings -->
            <p-accordionTab header="Class Settings">
                <div class="grid gap-4 p-4">
                    <div class="col-12 md:col-6">
                        <div class="flex flex-column gap-3">
                            <div class="flex align-items-center gap-2">
                                <p-inputSwitch
                                    [(ngModel)]="formData().live"
                                ></p-inputSwitch>
                                <label>Class is Live</label>
                            </div>
                            <div class="flex align-items-center gap-2">
                                <p-inputSwitch
                                    [(ngModel)]="
                                        formData().paused_for_enrollment
                                    "
                                ></p-inputSwitch>
                                <label>Paused for Enrollment</label>
                            </div>
                            <div class="flex align-items-center gap-2">
                                <p-inputSwitch
                                    [(ngModel)]="
                                        formData().for_information_only
                                    "
                                ></p-inputSwitch>
                                <label>Information Only</label>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 md:col-6">
                        <div class="flex gap-4">
                            <span class="p-float-label flex-1">
                                <p-inputNumber
                                    id="grade_start"
                                    [(ngModel)]="formData().grade_range_start"
                                    class="w-full"
                                ></p-inputNumber>
                                <label for="grade_start"
                                    >Grade Range Start</label
                                >
                            </span>
                            <span class="p-float-label flex-1">
                                <p-inputNumber
                                    id="grade_end"
                                    [(ngModel)]="formData().grade_range_end"
                                    class="w-full"
                                ></p-inputNumber>
                                <label for="grade_end">Grade Range End</label>
                            </span>
                        </div>
                    </div>

                    <div class="col-12 md:col-6">
                        <span class="p-float-label">
                            <p-inputNumber
                                id="max_student_size"
                                [(ngModel)]="formData().max_student_size"
                                class="w-full"
                            ></p-inputNumber>
                            <label for="max_student_size"
                                >Maximum Students</label
                            >
                        </span>
                    </div>
                </div>
            </p-accordionTab>

            <!-- References -->
            <p-accordionTab header="References">
                <div class="grid gap-4 p-4">
                    <div class="col-12">
                        <p-multiSelect
                            [options]="instructors"
                            [(ngModel)]="formData().instructorIds"
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Select Instructors"
                            class="w-full"
                        ></p-multiSelect>
                    </div>

                    <div class="col-12">
                        <p-multiSelect
                            [options]="units"
                            [(ngModel)]="formData().unitIds"
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Select Units"
                            class="w-full"
                        ></p-multiSelect>
                    </div>
                </div>
            </p-accordionTab>
        </p-accordion>

        <!-- Footer Actions -->
        <div class="flex justify-content-end gap-2 mt-4">
            <button pButton label="Cancel" class="p-button-text"></button>
            <button
                pButton
                label="Save Class"
                [disabled]="!isValid()"
                (click)="saveClass()"
            ></button>
        </div>`,
})
export class ManageClassComponent {
    // Inputs
    class = input<SemesterClass>();
    semesterId = input.required<string>();

    instructors = [];
    units = [];

    // Signals
    formData = signal<ClassFormData>({
        name: '',
        description: '',
        live: false,
        cost: 0,
        location: '',
        weekday: '',
        thumbnailUrl: '',
        instructorIds: [],
        startMs: Date.now(),
        endMs: Date.now(),
        registrationEndMs: Date.now(),
        class_type: '',
        grade_range_start: 0,
        grade_range_end: 0,
        paused_for_enrollment: false,
        daily_times: '',
        max_student_size: 0,
        for_information_only: false,
        additional_options: [],
    });

    // Computed Values
    readonly displayDates = computed(() => {
        const data = this.formData();
        return {
            start: new Date(data.startMs),
            end: new Date(data.endMs),
            registrationEnd: new Date(data.registrationEndMs),
        };
    });

    readonly isValid = computed(() => {
        const data = this.formData();
        return (
            data.name &&
            data.description &&
            data.cost > 0 &&
            data.location &&
            data.weekday &&
            data.class_type &&
            data.grade_range_start >= 0 &&
            data.grade_range_end >= data.grade_range_start &&
            data.max_student_size > 0
        );
    });

    // Constants
    readonly weekdays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    updateStartDate(date: Date) {
        this.formData.update((data) => ({
            ...data,
            startMs: date.getTime(),
        }));
    }

    updateEndDate(date: Date) {
        this.formData.update((data) => ({
            ...data,
            endMs: date.getTime(),
        }));
    }

    updateRegistrationEndDate(date: Date) {
        this.formData.update((data) => ({
            ...data,
            registrationEndMs: date.getTime(),
        }));
    }

    addAdditionalOption() {
        this.formData.update((data) => ({
            ...data,
            additional_options: [
                ...data.additional_options,
                {
                    id: crypto.randomUUID(),
                    description: '',
                    cost: 0,
                    studentIds: [],
                },
            ],
        }));
    }

    removeAdditionalOption(index: number) {
        this.formData.update((data) => ({
            ...data,
            additional_options: data.additional_options.filter(
                (_, i) => i !== index
            ),
        }));
    }

    // This would be implemented based on your API/service structure
    async saveClass() {
        if (this.isValid()) {
            // TODO: Implement save logic
            console.log('Saving class:', this.formData());
        }
    }
}

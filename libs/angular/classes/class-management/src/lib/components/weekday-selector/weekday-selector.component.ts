import { Component, input, model, computed, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MessagesComponent } from '@sol/form/validity';

const WEEKDAY_OPTIONS = [
    { value: 'Su', label: 'Sunday' },
    { value: 'M', label: 'Monday' },
    { value: 'Tu', label: 'Tuesday' },
    { value: 'W', label: 'Wednesday' },
    { value: 'Th', label: 'Thursday' },
    { value: 'F', label: 'Friday' },
    { value: 'Sa', label: 'Saturday' },
];

const DAY_ORDER = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

@Component({
    selector: 'sol-weekday-selector',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MessagesComponent,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => WeekdaySelectorComponent),
            multi: true,
        },
    ],
    template: `
        <div class="weekday-section">
            <div class="field-preview">
                <small>Will be shown as: {{ formattedDisplay() }}</small>
            </div>
            <mat-form-field appearance="outline">
                <mat-label>{{ label() }}</mat-label>
                <mat-select
                    [ngModel]="selectedDays()"
                    (ngModelChange)="onSelectionChange($event)"
                    [disabled]="disabled()"
                    multiple
                    [required]="required()"
                >
                    @for (day of weekdayOptions; track day.value) {
                        <mat-option [value]="day.value">{{
                            day.label
                        }}</mat-option>
                    }
                </mat-select>
                <sol-messages [messages]="errors()" />
            </mat-form-field>
            @if (existingValue() && showExisting()) {
                <div class="existing-display">
                    <small>Current value: {{ existingValue() }}</small>
                </div>
            }
        </div>
    `,
    styles: [
        `
            .weekday-section {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }

            .field-preview {
                color: var(--sol-primary, #006633);
                margin-bottom: 0;
            }

            .existing-display {
                color: #666;
                font-style: italic;
            }

            mat-form-field {
                width: 100%;
            }
        `,
    ],
})
export class WeekdaySelectorComponent implements ControlValueAccessor {
    readonly label = input<string>('Day(s) of Week');
    readonly required = input<boolean>(false);
    readonly errors = input<string[]>([]);
    readonly existingValue = input<string>('');
    readonly showExisting = input<boolean>(false);

    readonly selectedDays = model<string[]>([]);
    readonly disabled = model<boolean>(false);

    readonly weekdayOptions = WEEKDAY_OPTIONS;

    #onChange: (value: string[]) => void = () => {};
    #onTouched: () => void = () => {};

    readonly formattedDisplay = computed(() => {
        const selected = this.selectedDays();
        if (selected.length === 0) {
            return '(select days)';
        }
        return this.#formatWeekdays(selected);
    });

    readonly formattedValue = computed(() => {
        const selected = this.selectedDays();
        if (selected.length === 0) {
            return '';
        }
        return this.#formatWeekdays(selected);
    });

    onSelectionChange(days: string[]) {
        this.selectedDays.set(days);
        this.#onChange(days);
        this.#onTouched();
    }

    writeValue(value: string[]): void {
        this.selectedDays.set(value ?? []);
    }

    registerOnChange(fn: (value: string[]) => void): void {
        this.#onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.#onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    #formatWeekdays(selected: string[]): string {
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

        const indices = selected
            .map((d) => DAY_ORDER.indexOf(d))
            .sort((a, b) => a - b);
        const isConsecutive = indices.every(
            (val, i, arr) => i === 0 || val === arr[i - 1] + 1
        );

        if (isConsecutive && selected.length >= 3) {
            const first = DAY_ORDER[indices[0]];
            const last = DAY_ORDER[indices[indices.length - 1]];
            return `${first}-${last}`;
        }

        return DAY_ORDER.filter((d) => selected.includes(d)).join(', ');
    }

    parseWeekdayString(weekday: string): string[] {
        if (!weekday) return [];

        const normalized = weekday.toLowerCase().trim();

        if (normalized === 'every day' || normalized === 'daily') {
            return [...DAY_ORDER];
        }

        if (normalized === 'm-f' || normalized === 'weekdays') {
            return ['M', 'Tu', 'W', 'Th', 'F'];
        }

        if (normalized === 'weekends') {
            return ['Sa', 'Su'];
        }

        const rangeMatch = normalized.match(
            /^(su|m|tu|w|th|f|sa)\s*[-–]\s*(su|m|tu|w|th|f|sa)$/i
        );
        if (rangeMatch) {
            const startDay = this.#normalizeDayAbbrev(rangeMatch[1]);
            const endDay = this.#normalizeDayAbbrev(rangeMatch[2]);
            const startIndex = DAY_ORDER.indexOf(startDay);
            const endIndex = DAY_ORDER.indexOf(endDay);
            if (
                startIndex !== -1 &&
                endIndex !== -1 &&
                startIndex <= endIndex
            ) {
                return DAY_ORDER.slice(startIndex, endIndex + 1);
            }
        }

        const parts = normalized.split(/[,\s]+/);
        const result: string[] = [];
        for (const part of parts) {
            const day = this.#normalizeDayAbbrev(part.trim());
            if (day && !result.includes(day)) {
                result.push(day);
            }
        }
        return result;
    }

    #normalizeDayAbbrev(abbrev: string): string {
        const lower = abbrev.toLowerCase();
        const mapping: Record<string, string> = {
            su: 'Su',
            sun: 'Su',
            sunday: 'Su',
            m: 'M',
            mon: 'M',
            monday: 'M',
            tu: 'Tu',
            tue: 'Tu',
            tues: 'Tu',
            tuesday: 'Tu',
            w: 'W',
            wed: 'W',
            wednesday: 'W',
            th: 'Th',
            thu: 'Th',
            thur: 'Th',
            thurs: 'Th',
            thursday: 'Th',
            f: 'F',
            fri: 'F',
            friday: 'F',
            sa: 'Sa',
            sat: 'Sa',
            saturday: 'Sa',
        };
        return mapping[lower] ?? '';
    }
}

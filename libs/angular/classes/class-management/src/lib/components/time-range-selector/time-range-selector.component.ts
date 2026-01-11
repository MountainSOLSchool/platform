import { Component, input, model, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MessagesComponent } from '@sol/form/validity';

export interface TimeRange {
    startTime: string;
    endTime: string;
}

@Component({
    selector: 'sol-time-range-selector',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MessagesComponent,
    ],
    template: `
        <div class="time-section">
            <div class="field-preview">
                <small>Will be shown as: {{ formattedDisplay() }}</small>
            </div>
            <div class="time-row">
                <mat-form-field appearance="outline">
                    <mat-label>{{ startLabel() }}</mat-label>
                    <input
                        matInput
                        type="time"
                        [ngModel]="startTime()"
                        (ngModelChange)="onStartTimeChange($event)"
                        [required]="required()"
                    />
                    <sol-messages [messages]="errors()" />
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-label>{{ endLabel() }}</mat-label>
                    <input
                        matInput
                        type="time"
                        [ngModel]="endTime()"
                        (ngModelChange)="onEndTimeChange($event)"
                        [required]="required()"
                    />
                </mat-form-field>
            </div>
            @if (existingValue() && showExisting()) {
                <div class="existing-display">
                    <small>Current value: {{ existingValue() }}</small>
                </div>
            }
        </div>
    `,
    styles: [
        `
            .time-section {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }

            .field-preview {
                color: var(--sol-primary, #006633);
                margin-bottom: 0;
            }

            .time-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .existing-display {
                color: #666;
                font-style: italic;
            }

            mat-form-field {
                width: 100%;
            }

            @media (max-width: 600px) {
                .time-row {
                    grid-template-columns: 1fr;
                }
            }
        `,
    ],
})
export class TimeRangeSelectorComponent {
    readonly startLabel = input<string>('Start Time');
    readonly endLabel = input<string>('End Time');
    readonly required = input<boolean>(false);
    readonly errors = input<string[]>([]);
    readonly existingValue = input<string>('');
    readonly showExisting = input<boolean>(false);

    readonly startTime = model<string>('');
    readonly endTime = model<string>('');

    readonly timeRangeChange = output<TimeRange>();

    readonly formattedDisplay = computed(() => {
        const start = this.startTime();
        const end = this.endTime();
        if (!start || !end) {
            return '(select times)';
        }
        return this.#formatTimeRange(start, end);
    });

    readonly formattedValue = computed(() => {
        const start = this.startTime();
        const end = this.endTime();
        if (!start || !end) {
            return '';
        }
        return this.#formatTimeRange(start, end);
    });

    onStartTimeChange(value: string) {
        this.startTime.set(value);
        this.#emitChange();
    }

    onEndTimeChange(value: string) {
        this.endTime.set(value);
        this.#emitChange();
    }

    #emitChange() {
        this.timeRangeChange.emit({
            startTime: this.startTime(),
            endTime: this.endTime(),
        });
    }

    #formatTimeRange(start: string, end: string): string {
        const startFormatted = this.#formatTime(start);
        const endFormatted = this.#formatTime(end);
        return `${startFormatted}-${endFormatted}`;
    }

    #formatTime(time24: string): string {
        const [hours, minutes] = time24.split(':').map(Number);
        const period = hours >= 12 ? 'pm' : 'am';
        const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

        if (minutes === 0) {
            return `${hours12}${period}`;
        }
        return `${hours12}:${minutes.toString().padStart(2, '0')}${period}`;
    }

    parseTimeString(dailyTimes: string): TimeRange | null {
        if (!dailyTimes) return null;

        const normalized = dailyTimes.toLowerCase().trim();
        const timeRegex =
            /(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*[-–]\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i;
        const match = normalized.match(timeRegex);

        if (match) {
            const startHour = parseInt(match[1]);
            const startMinutes = match[2] ? parseInt(match[2]) : 0;
            const startPeriod = match[3].toLowerCase();
            const endHour = parseInt(match[4]);
            const endMinutes = match[5] ? parseInt(match[5]) : 0;
            const endPeriod = match[6].toLowerCase();

            const start24 = this.#to24Hour(startHour, startPeriod);
            const end24 = this.#to24Hour(endHour, endPeriod);

            return {
                startTime: `${start24.toString().padStart(2, '0')}:${startMinutes.toString().padStart(2, '0')}`,
                endTime: `${end24.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`,
            };
        }

        return null;
    }

    #to24Hour(hour: number, period: string): number {
        if (period === 'am') {
            return hour === 12 ? 0 : hour;
        } else {
            return hour === 12 ? 12 : hour + 12;
        }
    }
}

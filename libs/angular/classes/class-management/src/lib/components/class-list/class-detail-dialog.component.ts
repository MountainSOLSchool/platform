import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

interface AdminClass {
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
    instructors: Array<{ id: string; firstName: string; lastName: string }>;
    weekday: string;
    dailyTimes: string;
    startDate: string;
    endDate: string;
    registrationEndDate: string;
    maxStudentSize: number;
    enrolledCount: number;
    live: boolean;
    pausedForEnrollment: boolean;
    forInformationOnly: boolean;
    thumbnailUrl?: string;
    additionalOptions?: Array<{
        id: string;
        description: string;
        cost: number;
    }>;
}

@Component({
    selector: 'sol-class-detail-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatChipsModule,
        DatePipe,
    ],
    template: `
        <div class="dialog-container">
            <div class="dialog-header">
                <h2>{{ data.name }}</h2>
                <button mat-icon-button (click)="close()">
                    <mat-icon>close</mat-icon>
                </button>
            </div>

            <div class="status-row">
                @if (data.live) {
                    <span class="chip live">Live</span>
                } @else {
                    <span class="chip draft">Draft</span>
                }
                @if (data.forInformationOnly) {
                    <span class="chip info-only">Information Only</span>
                }
                @if (data.pausedForEnrollment) {
                    <span class="chip paused">Enrollment Paused</span>
                }
            </div>

            <mat-divider></mat-divider>

            <div class="dialog-content">
                <section>
                    <h3>Basic Information</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Class ID</label>
                            <span class="mono">{{ data.id }}</span>
                        </div>
                        <div class="info-item">
                            <label>Type</label>
                            <span>{{ data.classType }}</span>
                        </div>
                        <div class="info-item">
                            <label>Grade Range</label>
                            <span
                                >{{ formatGrade(data.gradeRangeStart) }} -
                                {{ formatGrade(data.gradeRangeEnd) }}</span
                            >
                        </div>
                        <div class="info-item full-width">
                            <label>Description</label>
                            <span>{{
                                data.description || 'No description'
                            }}</span>
                        </div>
                    </div>
                </section>

                <mat-divider></mat-divider>

                <section>
                    <h3>Schedule</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Day</label>
                            <span>{{ data.weekday }}</span>
                        </div>
                        <div class="info-item">
                            <label>Time</label>
                            <span>{{ data.dailyTimes }}</span>
                        </div>
                        <div class="info-item">
                            <label>Location</label>
                            <span>{{ data.location }}</span>
                        </div>
                        <div class="info-item">
                            <label>Start Date</label>
                            <span>{{
                                data.startDate | date: 'mediumDate'
                            }}</span>
                        </div>
                        <div class="info-item">
                            <label>End Date</label>
                            <span>{{ data.endDate | date: 'mediumDate' }}</span>
                        </div>
                        <div class="info-item">
                            <label>Registration Ends</label>
                            <span>{{
                                data.registrationEndDate | date: 'mediumDate'
                            }}</span>
                        </div>
                    </div>
                </section>

                <mat-divider></mat-divider>

                <section>
                    <h3>Enrollment & Pricing</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Enrolled</label>
                            <span class="enrollment-count">
                                {{ data.enrolledCount }}
                                @if (data.maxStudentSize > 0) {
                                    / {{ data.maxStudentSize }}
                                }
                            </span>
                        </div>
                        <div class="info-item">
                            <label>Max Students</label>
                            <span>{{
                                data.maxStudentSize > 0
                                    ? data.maxStudentSize
                                    : 'Unlimited'
                            }}</span>
                        </div>
                        <div class="info-item">
                            <label>Cost</label>
                            <span>{{ formatCost() }}</span>
                        </div>
                    </div>
                </section>

                @if (
                    data.additionalOptions &&
                    data.additionalOptions.length > 0
                ) {
                    <mat-divider></mat-divider>

                    <section>
                        <h3>Additional Options</h3>
                        <div class="options-list">
                            @for (
                                option of data.additionalOptions;
                                track option.id
                            ) {
                                <div class="option-item">
                                    <span>{{ option.description }}</span>
                                    <span class="option-cost"
                                        >+{{ '$' + option.cost }}</span
                                    >
                                </div>
                            }
                        </div>
                    </section>
                }

                <mat-divider></mat-divider>

                <section>
                    <h3>Instructors</h3>
                    <div class="instructors-list">
                        @for (
                            instructor of data.instructors;
                            track instructor.id
                        ) {
                            <div class="instructor">
                                <mat-icon>person</mat-icon>
                                <span
                                    >{{ instructor.firstName }}
                                    {{ instructor.lastName }}</span
                                >
                            </div>
                        } @empty {
                            <span class="no-data">No instructors assigned</span>
                        }
                    </div>
                </section>
            </div>

            <div class="dialog-actions">
                <button mat-button (click)="close()">Close</button>
            </div>
        </div>
    `,
    styles: [
        `
            .dialog-container {
                background: white;
                border-radius: 8px;
                max-height: 90vh;
                overflow: auto;
            }

            .dialog-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 1.5rem;
            }

            .dialog-header h2 {
                margin: 0;
            }

            .status-row {
                display: flex;
                gap: 8px;
                padding: 0 1.5rem 1rem;
            }

            .chip {
                display: inline-block;
                padding: 4px 12px;
                border-radius: 16px;
                font-size: 12px;
                font-weight: 500;
            }

            .chip.live {
                background-color: #e8f5e9;
                color: #2e7d32;
            }

            .chip.draft {
                background-color: #fff3e0;
                color: #e65100;
            }

            .chip.info-only {
                background-color: #e3f2fd;
                color: #1565c0;
            }

            .chip.paused {
                background-color: #fce4ec;
                color: #c62828;
            }

            .dialog-content {
                padding: 0 1.5rem;
            }

            section {
                padding: 1rem 0;
            }

            section h3 {
                margin: 0 0 1rem;
                font-size: 14px;
                font-weight: 600;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .info-item {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .info-item.full-width {
                grid-column: 1 / -1;
            }

            .info-item label {
                font-size: 12px;
                color: #666;
                font-weight: 500;
            }

            .info-item span {
                font-size: 14px;
            }

            .info-item .mono {
                font-family: monospace;
                font-size: 12px;
                color: #666;
            }

            .enrollment-count {
                font-weight: 600;
            }

            .instructors-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .instructor {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .instructor mat-icon {
                color: #666;
                font-size: 20px;
                width: 20px;
                height: 20px;
            }

            .options-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .option-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 12px;
                background: #f5f5f5;
                border-radius: 6px;
            }

            .option-cost {
                font-weight: 600;
                color: #2e7d32;
                white-space: nowrap;
                margin-left: 1rem;
            }

            .no-data {
                color: #999;
                font-style: italic;
            }

            .dialog-actions {
                display: flex;
                justify-content: flex-end;
                padding: 1rem 1.5rem;
                border-top: 1px solid #eee;
            }
        `,
    ],
})
export class ClassDetailDialogComponent {
    readonly dialogRef = inject(DialogRef);
    readonly data: AdminClass = inject(DIALOG_DATA);

    close() {
        this.dialogRef.close();
    }

    formatGrade(grade: number): string {
        if (grade === -1) return 'Pre-K';
        if (grade === 0) return 'K';
        return `${grade}`;
    }

    formatCost(): string {
        if (this.data.paymentRangeLowest && this.data.paymentRangeHighest) {
            return `$${this.data.paymentRangeLowest} - $${this.data.paymentRangeHighest} (sliding scale)`;
        }
        return `$${this.data.cost}`;
    }
}

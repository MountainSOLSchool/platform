import {
    ChangeDetectionStrategy,
    Component,
    computed,
    EventEmitter,
    input,
    Input,
    Output,
    signal,
} from '@angular/core';

import { NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { MarkdownModule } from 'ngx-markdown';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BeforeSelectOptionsComponent } from '../before-select-options/before-select-options.component';

export interface ClassCardInfo {
    id: string;
    title: string;
    description: string;
    pausedForEnrollment: boolean;
    thumbnailUrl?: string;
    classDateTimes: string;
    weekday: string;
    dailyTimes: string;
    classType: string;
    gradeRangeStart: number;
    gradeRangeEnd: number;
    location: string;
    paymentRange?: {
        lowest: number;
        highest: number;
    };
    cost: number;
    instructors: Array<{
        firstName: string;
        lastName: string;
    }>;
    semesterId: string;
    forInformationOnly: boolean;
    userCost?: number;
    initialCost: number;
    additionalCost: number;
    additionalOptions?: Array<{
        description: string;
        cost: number;
        id: string;
    }>;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CardModule,
        ChipModule,
        MarkdownModule,
        OverlayPanelModule,
        AutoFocusModule,
        ButtonModule,
        InputNumberModule,
        FormsModule,
        SliderModule,
        ToggleButtonModule,
        BeforeSelectOptionsComponent,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        NgClass,
    ],
    selector: 'sol-class-card',
    templateUrl: './class-card.component.html',
    styles: [
        `
            .program-card {
                /*max-width: 420px;*/
                margin: 0 auto 2rem;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

                &:hover {
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                }

                &.selected {
                    border: 3px solid #1976d2;
                    box-shadow: 0 8px 24px rgba(25, 118, 210, 0.25);
                }
            }

            .card-header {
                position: relative;
                height: 220px;
                background-size: cover;
                background-position: center;
                margin: 0;
                transition: filter 0.3s ease;

                &.grayscale {
                    filter: grayscale(100%);
                }

                .header-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 0.2) 0%,
                        rgba(0, 0, 0, 0.7) 100%
                    );
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                }

                .card-title {
                    color: white;
                    font-size: 26px;
                    font-weight: 500;
                    margin: 0 0 12px;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    gap: 12px;

                    .full-badge {
                        background: #f44336;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 14px;
                        font-weight: 500;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                }

                .header-info {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;

                    .date-info {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        color: rgba(255, 255, 255, 0.9);
                        font-size: 18px;

                        mat-icon {
                            font-size: 18px;
                            width: 18px;
                            height: 18px;
                        }
                    }
                }
            }

            .card-body {
                padding: 24px;
            }

            .details-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 24px;
            }

            @media (max-width: 620px) {
                .details-grid {
                    grid-template-columns: 1fr;
                    gap: 12px;
                }
            }

            .detail-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;

                mat-icon {
                    font-size: 24px;
                    width: 24px;
                    height: 24px;
                    margin-top: 2px;
                }

                .detail-content {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .detail-label {
                    font-size: 12px;
                    color: #666;
                    font-weight: 400;
                    text-transform: capitalize;
                }

                .detail-value {
                    font-size: 15px;
                    color: #212121;
                    font-weight: 500;
                }
            }

            @media (max-width: 620px) {
                .detail-item {
                    gap: 6px;

                    mat-icon {
                        font-size: 16px;
                        width: 34px;
                        height: 24px;
                        margin-top: 2px;
                    }
                }
            }

            mat-divider {
                margin: 24px 0;
            }

            .instructors-section,
            .description-section {
                margin-bottom: 20px;

                .section-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #424242;
                    margin: 0 0 6px;

                    mat-icon {
                        font-size: 20px;
                        width: 20px;
                        height: 20px;
                        color: #757575;
                    }
                }

                .instructor-names {
                    font-size: 15px;
                    color: #424242;
                    margin: 0;
                    padding-left: 28px;
                }

                .description-content {
                    font-size: 15px;
                    line-height: 1.6;
                    color: #424242;
                    padding-left: 28px;

                    ::ng-deep p {
                        margin: 0 0 12px;

                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
            }

            .card-actions {
                padding: 16px 24px 24px;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 16px;

                .enrollment-notice {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #fff3e0;
                    padding: 12px 16px;
                    border-radius: 8px;
                    color: #e65100;
                    font-size: 14px;
                    font-weight: 500;

                    mat-icon {
                        font-size: 20px;
                        width: 20px;
                        height: 20px;
                    }
                }

                .info-only-notice {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    color: #666;
                    font-size: 14px;

                    mat-icon {
                        font-size: 18px;
                        width: 18px;
                        height: 18px;
                    }

                    a {
                        color: #1976d2;
                        text-decoration: none;
                        font-weight: 500;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }

                .select-button {
                    width: 100%;
                    height: 48px;
                    font-size: 16px;
                    font-weight: 500;
                    letter-spacing: 0.25px;

                    mat-icon {
                        margin-right: 8px;
                    }

                    &.selected-state {
                        background-color: #3b82f6;
                        color: white;
                    }
                }
            }

            // Material theme adjustments
            ::ng-deep {
                .mat-mdc-card {
                    --mdc-elevated-card-container-color: white;
                }

                .mat-mdc-raised-button {
                    --mdc-protected-button-container-height: 48px;
                }
            }
        `,
    ],
})
export class ClassCardComponent {
    @Input() selected = false;
    @Input() showOnlyAddedCost = false;
    @Input() width: 'wider' | 'narrower' = 'narrower';
    readonly classInfo = input.required<ClassCardInfo>();

    @Output() selectedChange = new EventEmitter<{
        classSelection: { id: string; semesterId: string };
        selectedAdditionalOptionIds: Array<string>;
        selected: boolean;
        userCost?: number;
    }>();

    readonly customCost = signal<number | undefined>(undefined);
    readonly selectedAdditionalOptionIds = signal<Array<string>>([]);

    readonly beforeSelectOptionsByClass = computed(() => {
        const classInfo = this.classInfo();
        return [
            {
                classId: classInfo.id,
                className: classInfo.title,
                slidingScale: classInfo.paymentRange
                    ? {
                          paymentRange: classInfo.paymentRange,
                          initialCost: classInfo.initialCost,
                      }
                    : undefined,
                additionalOptions: classInfo.additionalOptions
                    ? {
                          options: classInfo.additionalOptions,
                          selected: this.selectedAdditionalOptionIds(),
                      }
                    : undefined,
            },
        ];
    });

    readonly fallbackImageUrl =
        'https://firebasestorage.googleapis.com/v0/b/mountain-sol-platform.appspot.com/o/default_class.png?alt=media&token=258cef64-a8b9-416b-855c-51bb57a86b37';

    selectionToggled() {
        const classInfo = this.classInfo();
        this.selectedChange.emit({
            classSelection: {
                id: classInfo.id,
                semesterId: classInfo.semesterId,
            },
            selectedAdditionalOptionIds: [],
            selected: this.selected,
        });
    }

    deselected() {
        const classInfo = this.classInfo();
        this.selectedChange.emit({
            classSelection: {
                id: classInfo.id,
                semesterId: classInfo.semesterId,
            },
            selectedAdditionalOptionIds: [],
            selected: false,
        });
    }

    requiresSlidingScaleCost(classInfo: ClassCardInfo) {
        return (classInfo.paymentRange?.lowest ?? -1) >= 0;
    }

    getAdditionalOptions(classInfo: ClassCardInfo) {
        return classInfo.additionalOptions;
    }

    requiresPromptBeforeSelecting(classInfo: ClassCardInfo) {
        return (
            this.requiresSlidingScaleCost(classInfo) ||
            (classInfo.additionalOptions ?? []).length > 0
        );
    }

    confirmed(
        overlayRef: OverlayPanel,
        optionsConfirmation: {
            [classId: string]: {
                userCost?: number;
                selectedOptionIds?: Array<string>;
            };
        }
    ) {
        overlayRef.hide();

        const classInfo = this.classInfo();
        this.selectedChange.emit({
            classSelection: {
                id: classInfo.id,
                semesterId: classInfo.semesterId,
            },
            userCost: optionsConfirmation[classInfo.id]?.userCost,
            selectedAdditionalOptionIds:
                optionsConfirmation[classInfo.id]?.selectedOptionIds ?? [],
            selected: true,
        });
    }

    classCostLabel(amount: number, showOnlyAddedCost: boolean): string {
        return amount
            ? ` • ${showOnlyAddedCost ? '+' : ''}$${amount.toFixed(2)}`
            : '';
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    EventEmitter,
    input,
    Output,
} from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {
    ClassCardComponent,
    ClassCardInfo,
} from '../class-card/class-card.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { BeforeSelectOptionsComponent } from '../before-select-options/before-select-options.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface ClassRow {
    classes: Array<{
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
        selected: boolean;
    }>;
    group?: {
        id: string;
        name: string;
        cost: number;
    };
    start: Date;
    index: number;
    selected: boolean;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        MatIconModule,
        MatButtonModule,
        ButtonModule,
        ToggleButtonModule,
        ClassCardComponent,
        FormsModule,
        CurrencyPipe,
        OverlayPanelModule,
        BeforeSelectOptionsComponent,
    ],
    selector: 'sol-class-row',
    templateUrl: './class-row.component.html',
    styles: [
        `
            .class-row-container {
                width: 100%;
                margin-bottom: 2rem;
            }

            .paired-class-header {
                position: relative;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                height: 180px;
                margin-bottom: 1.5rem;
            }

            .split-background {
                position: absolute;
                inset: 0;
                display: flex;

                .morning-section,
                .afternoon-section {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                }

                .morning-section {
                    clip-path: polygon(0 0, 55% 0, 45% 100%, 0 100%);

                    &::after {
                        content: '';
                        position: absolute;
                        inset: 0;
                        backdrop-filter: blur(4px);
                        background: linear-gradient(
                            135deg,
                            rgba(98, 148, 227, 0.6) 0%,
                            rgba(43, 60, 211, 0.6) 100%
                        );
                    }
                }

                .afternoon-section {
                    clip-path: polygon(55% 0, 100% 0, 100% 100%, 45% 100%);

                    &::after {
                        content: '';
                        position: absolute;
                        inset: 0;
                        backdrop-filter: blur(4px);
                        background: linear-gradient(
                            225deg,
                            rgba(74, 186, 95, 0.6) 0%,
                            rgba(40, 119, 48, 0.6) 100%
                        );
                    }
                }
            }

            .header-content {
                position: relative;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 1.5rem;
                z-index: 10;

                .header-title {
                    color: white;
                    font-size: 1.75rem;
                    font-weight: 600;
                    margin: 0 0 1rem;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                    max-width: 800px;

                    @media (min-width: 768px) {
                        font-size: 2rem;
                    }
                }

                .action-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;

                    @media (min-width: 640px) {
                        flex-direction: row;
                        gap: 1rem;
                    }
                }

                .discount-badge {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50px;
                    padding: 0.5rem 1.25rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: white;
                    font-weight: 600;
                    font-size: 1rem;

                    mat-icon {
                        font-size: 20px;
                        width: 20px;
                        height: 20px;
                        color: #fbbf24;
                    }
                }

                .select-all-button {
                    mat-icon {
                        margin-right: 8px;
                    }

                    &.selected {
                        background-color: var(--sol-primary, #006633);
                        color: white;

                        &:hover {
                            background-color: var(--sol-primary-hover, #004d26);
                        }
                    }
                }
            }

            .cards-container {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;

                .card-wrapper {
                    &.half-width {
                        flex: 1 0 calc(50% - 0.5rem);

                        @media (max-width: 768px) {
                            flex: 1 0 100%;
                        }
                    }

                    &.full-width {
                        flex: 1 0 100%;
                    }
                }
            }

            // Material button overrides for the select button
            ::ng-deep {
                .select-all-button {
                    font-size: 1rem;
                    font-weight: 600;
                    padding: 0.625rem 1.5rem;
                    height: auto;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

                    &:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                    }
                }
            }
        `,
    ],
})
export class ClassRowComponent {
    readonly row = input.required<ClassRow>();

    @Output() classSelection = new EventEmitter<{
        classSelection: { id: string; semesterId: string };
        selected: boolean;
        selectedAdditionalOptionIds?: Array<string>;
        userCost?: number;
    }>();

    getRandomNumber() {
        return Math.random();
    }

    readonly beforeSelectOptionsByClass = computed(() => {
        const classInfo = this.row().classes.map((c) => ({
            classId: c.id,
            className: c.title,
            slidingScale: c.paymentRange
                ? {
                      paymentRange: c.paymentRange,
                      initialCost: c.initialCost,
                  }
                : undefined,
            additionalOptions: c.additionalOptions
                ? {
                      options: c.additionalOptions,
                      selected: [],
                  }
                : undefined,
        }));
        return classInfo;
    });

    getClassRowSavings(): number {
        const row = this.row();
        const classesCost = row.classes.reduce(
            (agg, aClass) => agg + Number(aClass.cost),
            0
        );
        const groupCost = row.group?.cost ?? 0;
        return classesCost - groupCost;
    }

    hasPausedClass(): boolean {
        return this.row().classes.some((c) => c.pausedForEnrollment);
    }

    rowSelectedChange(selected: boolean) {
        this.row().classes.forEach((c) =>
            this.selectionChanged({
                classSelection: { id: c.id, semesterId: c.semesterId },
                selected,
            })
        );
    }

    selectionChanged(event: {
        classSelection: { id: string; semesterId: string };
        selected: boolean;
        userCost?: number;
        selectedAdditionalOptionIds?: Array<string>;
    }) {
        this.classSelection.emit(event);
    }

    requiresPromptBeforeSelecting(classesInfo: Array<ClassCardInfo>) {
        return classesInfo.some((c) => {
            return !!c.paymentRange || c.additionalOptions?.length;
        });
    }

    confirmedExtras(
        overlayRef: OverlayPanel,
        optionsConfirmation: {
            [classId: string]: {
                userCost?: number;
                selectedOptionIds?: Array<string>;
            };
        }
    ) {
        overlayRef.hide();
        this.row().classes.forEach((c) =>
            this.selectionChanged({
                classSelection: { id: c.id, semesterId: c.semesterId },
                selected: true,
                userCost: optionsConfirmation[c.id]?.userCost,
                selectedAdditionalOptionIds:
                    optionsConfirmation[c.id]?.selectedOptionIds ?? [],
            })
        );
    }
}

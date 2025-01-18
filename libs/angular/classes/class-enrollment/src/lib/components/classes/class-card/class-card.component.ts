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

import { NgStyle } from '@angular/common';
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
        NgStyle,
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
    ],
    selector: 'sol-class-card',
    templateUrl: './class-card.component.html',
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
}

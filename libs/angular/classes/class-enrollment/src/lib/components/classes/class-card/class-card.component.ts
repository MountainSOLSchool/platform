import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
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
import { SlidingScaleFormComponent } from '../sliding-scale-form/sliding-scale-form.component';
import { AdditionalOptionsFormComponent } from '../additional-options-form/additional-options-form.component';

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
        SlidingScaleFormComponent,
        AdditionalOptionsFormComponent,
    ],
    selector: 'sol-class-card',
    templateUrl: './class-card.component.html',
})
export class ClassCardComponent {
    @Input() selected = false;
    @Input() width: 'wider' | 'narrower' = 'narrower';
    @Input({ required: true }) classInfo!: {
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
            lowest?: number;
            highest?: number;
        };
        cost: number;
        instructors: Array<{
            firstName: string;
            lastName: string;
        }>;
        userCost: number;
        semesterId: string;
        forInformationOnly: boolean;
        additionalCost: number;
        additionalOptions?: Array<{
            description: string;
            cost: number;
            id: string;
        }>;
    };

    @Output() selectedChange = new EventEmitter<{
        classSelection: { id: string; semesterId: string };
        selectedAdditionalOptionIds: Array<string>;
        selected: boolean;
        userCost?: number;
    }>();

    readonly customCost = signal<number | undefined>(undefined);
    readonly selectedAdditionalOptionIds = signal<Array<string>>([]);

    readonly fallbackImageUrl =
        'https://firebasestorage.googleapis.com/v0/b/mountain-sol-platform.appspot.com/o/default_class.png?alt=media&token=258cef64-a8b9-416b-855c-51bb57a86b37';

    selectionToggled() {
        this.selectedChange.emit({
            classSelection: {
                id: this.classInfo.id,
                semesterId: this.classInfo.semesterId,
            },
            selectedAdditionalOptionIds: [],
            selected: this.selected,
        });
    }

    confirmedSelect(panel: OverlayPanel) {
        panel.hide();
        this.selectedChange.emit({
            classSelection: {
                id: this.classInfo.id,
                semesterId: this.classInfo.semesterId,
            },
            userCost: this.customCost(),
            selected: true,
            selectedAdditionalOptionIds: this.selectedAdditionalOptionIds(),
        });
    }

    deselected() {
        this.selectedChange.emit({
            classSelection: {
                id: this.classInfo.id,
                semesterId: this.classInfo.semesterId,
            },
            selectedAdditionalOptionIds: [],
            selected: false,
        });
    }

    requiresSlidingScaleCost(classInfo: typeof this.classInfo) {
        return (classInfo.paymentRange?.lowest ?? -1) >= 0;
    }

    getAdditionalOptions(classInfo: typeof this.classInfo) {
        return classInfo.additionalOptions;
    }

    requiresPromptBeforeSelecting(classInfo: typeof this.classInfo) {
        return (
            this.requiresSlidingScaleCost(classInfo) ||
            this.getAdditionalOptions(classInfo)
        );
    }
}

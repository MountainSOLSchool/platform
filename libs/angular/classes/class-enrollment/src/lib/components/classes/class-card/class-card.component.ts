import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { DatePipe, NgStyle } from '@angular/common';
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

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgStyle,
        DatePipe,
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
    };

    @Output() selectedChange = new EventEmitter<{
        classSelection: { id: string; semesterId: string };
        userCost?: number;
        selected: boolean;
    }>();

    readonly fallbackImageUrl =
        'https://firebasestorage.googleapis.com/v0/b/mountain-sol-platform.appspot.com/o/default_class.png?alt=media&token=258cef64-a8b9-416b-855c-51bb57a86b37';

    selectionToggled() {
        this.selectedChange.emit({
            classSelection: {
                id: this.classInfo.id,
                semesterId: this.classInfo.semesterId,
            },
            selected: this.selected,
        });
    }

    customCostSelected(cost: number, panel: OverlayPanel) {
        panel.hide();
        this.selectedChange.emit({
            classSelection: {
                id: this.classInfo.id,
                semesterId: this.classInfo.semesterId,
            },
            userCost: cost,
            selected: true,
        });
    }

    deselected() {
        this.selectedChange.emit({
            classSelection: {
                id: this.classInfo.id,
                semesterId: this.classInfo.semesterId,
            },
            selected: false,
        });
    }
}

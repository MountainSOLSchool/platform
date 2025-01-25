import {
    ChangeDetectionStrategy,
    Component,
    computed,
    EventEmitter,
    input,
    Output,
} from '@angular/core';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {
    ClassCardComponent,
    ClassCardInfo,
} from '../class-card/class-card.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { BeforeSelectOptionsComponent } from '../before-select-options/before-select-options.component';

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
        NgStyle,
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

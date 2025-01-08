import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    input,
    Output,
} from '@angular/core';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RxLet } from '@rx-angular/template/let';
import { ClassCardComponent } from '../class-card/class-card.component';
import { FormsModule } from '@angular/forms';

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
        ToggleButtonModule,
        RxLet,
        ClassCardComponent,
        FormsModule,
        CurrencyPipe,
    ],
    selector: 'sol-class-row',
    templateUrl: './class-row.component.html',
    standalone: true,
})
export class ClassRowComponent {
    readonly row = input.required<ClassRow>();

    @Output() classSelection = new EventEmitter<{
        classSelection: { id: string; semesterId: string };
        selected: boolean;
        selectedAdditionalOptionIds?: Array<string>;
        userCost?: number;
    }>();

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
            this.classSelection.emit({
                classSelection: {
                    id: c.id,
                    semesterId: c.semesterId,
                },
                selected,
            })
        );
    }

    selectionChanged(event: {
        classSelection: { id: string; semesterId: string };
        selected: boolean;
        userCost?: number;
    }) {
        this.classSelection.emit(event);
    }
}

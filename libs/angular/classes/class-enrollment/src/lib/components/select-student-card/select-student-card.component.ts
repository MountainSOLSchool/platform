import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    output,
} from '@angular/core';
import { CardModule } from 'primeng/card';

import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgClass, NgStyle } from '@angular/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CardModule,
        ButtonModule,
        ProgressSpinnerModule,
        NgClass,
        NgStyle,
    ],
    selector: 'sol-student-selection-card',
    templateUrl: './select-student-card.component.html',
})
export class SelectStudentCardComponent {
    selected = input<boolean>();
    student = input<{
        name: string;
        birthday: string;
    }>();
    icon = input<string>();
    loading = input<boolean>();
    disabled = input.required<boolean>();

    clicked = output<void>();

    iconNgClass = computed(() => ({
        pi: true,
        [this.icon() || '']: true,
    }));
}

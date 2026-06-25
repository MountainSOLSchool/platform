import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';

const PI_TO_MAT_ICON: Record<string, string> = {
    'pi-user-plus': 'person_add',
    'pi-user': 'person',
};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
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

    matIconName = computed(() => {
        const iconKey = this.icon();
        if (!iconKey) return '';
        return PI_TO_MAT_ICON[iconKey] ?? iconKey;
    });
}

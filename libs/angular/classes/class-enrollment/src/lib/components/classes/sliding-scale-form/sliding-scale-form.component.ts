import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AutoFocusModule,
        ButtonModule,
        InputNumberModule,
        FormsModule,
        SliderModule,
    ],
    selector: 'sol-sliding-scale-form',
    templateUrl: './sliding-scale-form.component.html',
})
export class SlidingScaleFormComponent {
    @Input({ required: true }) classInfo!: {
        paymentRange?: {
            lowest?: number;
            highest?: number;
        };
        cost: number;
        userCost: number;
        semesterId: string;
    };

    @Output() selectedCostChange = new EventEmitter<number>();

    customCostSelected(cost: number) {
        this.selectedCostChange.emit(cost);
    }
}

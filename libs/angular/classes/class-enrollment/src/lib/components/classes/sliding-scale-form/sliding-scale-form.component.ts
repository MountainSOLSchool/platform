import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
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
    readonly paymentRange = input.required<{
        lowest: number;
        highest: number;
    }>();
    readonly userCost = input.required<number>();

    readonly selectedCostChange = output<number>();

    customCostSelected(cost: number) {
        this.selectedCostChange.emit(cost);
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    input,
    linkedSignal,
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

    readonly initialCost = input.required<number>();

    readonly selectedCostChange = output<number>();

    readonly userCost = linkedSignal<number>(() => this.initialCost());

    customCostSelected(cost: number) {
        this.userCost.set(cost);
        this.selectedCostChange.emit(cost);
    }
}

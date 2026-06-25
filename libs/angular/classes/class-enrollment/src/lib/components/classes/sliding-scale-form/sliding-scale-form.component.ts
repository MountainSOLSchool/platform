import {
    ChangeDetectionStrategy,
    Component,
    input,
    linkedSignal,
    output,
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSliderModule,
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

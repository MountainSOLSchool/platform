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
    styles: [
        `
            :host {
                display: block;
                margin-bottom: 1rem;
                max-width: 100%;
            }

            .sliding-scale-label {
                margin-bottom: 0.5rem;
            }

            .amount-field {
                width: 100%;
            }

            /* Material's default 180px infix forces the field wider than a
               narrow menu panel, so let it shrink with the container. */
            :host ::ng-deep .amount-field .mat-mdc-form-field-infix {
                width: auto;
                min-width: 0;
            }

            .slider-row {
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }

            .amount-slider {
                flex: 1;
                min-width: 0;
            }
        `,
    ],
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

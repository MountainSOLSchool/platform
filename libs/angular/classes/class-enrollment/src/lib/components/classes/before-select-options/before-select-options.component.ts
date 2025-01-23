import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    output,
    signal,
} from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SlidingScaleFormComponent } from '../sliding-scale-form/sliding-scale-form.component';
import { AdditionalOptionsFormComponent } from '../additional-options-form/additional-options-form.component';

type AdditionalOption = {
    description: string;
    cost: number;
    id: string;
};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        OverlayPanelModule,
        ButtonModule,
        FormsModule,
        SlidingScaleFormComponent,
        AdditionalOptionsFormComponent,
    ],
    selector: 'sol-class-before-select-options-form',
    templateUrl: './before-select-options.component.html',
})
export class BeforeSelectOptionsComponent {
    optionsByClass = input.required<
        Array<{
            classId: string;
            className: string;
            slidingScale?: {
                paymentRange: {
                    lowest: number;
                    highest: number;
                };
                initialCost: number;
            };
            additionalOptions?: {
                options: Array<AdditionalOption>;
            };
        }>
    >();

    readonly userCostsByClass = signal<{ [classId: string]: number }>({});
    readonly selectedOptionIdsByClass = signal<{
        [classId: string]: Array<string>;
    }>({});

    readonly confirmed = output<{
        [classId: string]: {
            userCost?: number;
            selectedOptionIds?: Array<string>;
        };
    }>();

    readonly selectedOptionsByClass = computed(() => {
        const userCostsByClass = this.userCostsByClass();
        const selectedOptionIdsByClass = this.selectedOptionIdsByClass();
        const thing = [
            ...Object.entries(userCostsByClass),
            ...Object.entries(selectedOptionIdsByClass),
        ].reduce(
            (acc, [classId, options]) => {
                const property = Array.isArray(options)
                    ? 'selectedOptionIds'
                    : 'userCost';
                return {
                    ...acc,
                    [classId]: {
                        ...acc[classId],
                        [property]: options,
                    },
                };
            },
            {} as {
                [classId: string]: {
                    userCost?: number;
                    selectedOptionIds?: Array<string>;
                };
            }
        );
        return thing;
    });

    readonly selectedOptionIds = signal<Array<string>>([]);

    getLabel(option: AdditionalOption) {
        return `${option.description} ($${option.cost})`;
    }

    userCostChanged(classId: string, userCost: number) {
        this.userCostsByClass.update((costs) => ({
            ...costs,
            [classId]: userCost,
        }));
    }

    selectedAdditionalOptionsChanged(
        classId: string,
        selectedOptionIds: Array<string>
    ) {
        this.selectedOptionIdsByClass.update((ids) => ({
            ...ids,
            [classId]: selectedOptionIds,
        }));
    }
}

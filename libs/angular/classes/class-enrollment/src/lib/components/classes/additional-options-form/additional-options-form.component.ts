import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
    signal,
} from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

type AdditionalOption = {
    description: string;
    cost: number;
    id: string;
};

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CheckboxModule, ButtonModule, FormsModule],
    selector: 'sol-class-additional-options-form',
    templateUrl: './additional-options-form.component.html',
})
export class AdditionalOptionsFormComponent {
    readonly options = input.required<Array<AdditionalOption>>();

    readonly selectedOptionIdsChange = output<Array<string>>();

    readonly selectedOptionIds = signal<Array<string>>([]);

    getLabel(option: AdditionalOption) {
        return `${option.description} ($${option.cost})`;
    }

    optionSelected(optionId: string, selected: boolean) {
        this.selectedOptionIds.update((ids) =>
            selected ? [...ids, optionId] : ids.filter((id) => id !== optionId)
        );
        this.selectedOptionIdsChange.emit(this.selectedOptionIds());
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
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
    selector: 'sol-class-before-select-options-form',
    templateUrl: './before-select-options.component.html',
})
export class AdditionalOptionsFormComponent {
    @Input({ required: true }) options!: Array<AdditionalOption>;

    @Output() selectedOptionIdsChange = new EventEmitter<Array<string>>();

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

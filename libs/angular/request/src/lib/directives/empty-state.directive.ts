import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import { Requested, RequestState } from '../models/requested.type';

@Directive({
    selector: '[solEmpty]',
})
export class SolEmptyDirective<T> {
    private readonly templateRef = inject(TemplateRef);
    private readonly viewContainer = inject(ViewContainerRef);

    @Input() set solEmpty(requestState: Requested<T>) {
        if (requestState === RequestState.Empty) {
            this.viewContainer.createEmbeddedView(this.templateRef, {
                $implicit: requestState,
            });
        } else {
            this.viewContainer.clear();
        }
    }
}

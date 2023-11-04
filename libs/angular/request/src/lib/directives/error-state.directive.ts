import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import { Requested, RequestState } from '../models/requested.type';

@Directive({
    selector: '[solError]',
    standalone: true,
})
export class SolErrorDirective<T> {
    private readonly templateRef = inject(TemplateRef);
    private readonly viewContainer = inject(ViewContainerRef);

    @Input() set solError(requestState: Requested<T>) {
        if (requestState === RequestState.Error) {
            this.viewContainer.createEmbeddedView(this.templateRef, {
                $implicit: requestState,
            });
        } else {
            this.viewContainer.clear();
        }
    }
}

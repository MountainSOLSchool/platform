import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import { Requested, RequestState } from '../models/requested.type';

@Directive({
    selector: '[solLoading]',
    standalone: true,
})
export class SolLoadingDirective<T> {
    private readonly templateRef = inject(TemplateRef);
    private readonly viewContainer = inject(ViewContainerRef);

    @Input() set solLoading(requestState: Requested<T>) {
        if (requestState === RequestState.Loading) {
            this.viewContainer.createEmbeddedView(this.templateRef, {
                $implicit: requestState,
            });
        } else {
            this.viewContainer.clear();
        }
    }
}

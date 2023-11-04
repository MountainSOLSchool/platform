import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import { Requested } from '../models/requested.type';
import { RequestedUtility } from '../utilities/requested.utility';

@Directive({
    selector: '[solLoaded]',
    standalone: true,
})
export class SolLoadedDirective<T> {
    private readonly templateRef = inject(TemplateRef);
    private readonly viewContainer = inject(ViewContainerRef);

    @Input() set solLoaded(requestState: Requested<T>) {
        if (RequestedUtility.isLoaded(requestState)) {
            this.viewContainer.createEmbeddedView(this.templateRef, {
                $implicit: requestState,
            });
        } else {
            this.viewContainer.clear();
        }
    }

    static ngTemplateGuard_solLoaded<T>(
        dir: SolLoadedDirective<T>,
        state: Requested<T>
    ): state is T {
        return true;
    }
}

import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import { Requested } from '../models/requested.type';
import { RequestedUtility } from '../utilities/requested.utility';

export interface LetViewContext<T> {
    $implicit: T;
}

@Directive({
    selector: '[solLoaded]',
})
export class SolLoadedDirective<T> {
    private readonly templateRef = inject(TemplateRef);
    private readonly viewContainer = inject(ViewContainerRef);

    @Input() set solLoaded(requestState: Requested<T> | null | undefined) {
        this.viewContainer.clear();
        if (RequestedUtility.isLoaded(requestState)) {
            this.viewContainer.createEmbeddedView(this.templateRef, {
                $implicit: requestState,
            });
        }
    }

    static ngTemplateGuard_solLoaded<T>(
        dir: SolLoadedDirective<T>,
        state: Requested<T> | null | undefined
    ): state is T {
        return true;
    }

    static ngTemplateContextGuard<T>(
        dir: SolLoadedDirective<T>,
        ctx: unknown
    ): ctx is LetViewContext<T> {
        return true;
    }
}

import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[solValid]',
})
export class ValidDirective {
    private readonly renderer = inject(Renderer2);
    private readonly host = inject(ElementRef);
    private readonly invalidClasses = ['ng-invalid', 'ng-dirty'];

    @Input('solValid') set valid(value: boolean) {
        const operationName = value ? 'removeClass' : 'addClass';
        this.invalidClasses.forEach((className) => {
            this.renderer[operationName](this.host.nativeElement, className);
        });
    }
}

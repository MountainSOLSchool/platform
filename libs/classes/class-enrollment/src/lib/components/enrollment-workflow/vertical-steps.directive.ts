import { Directive, HostListener } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Directive({
    standalone: true,
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'mat-stepper',
})
export class MatVerticalStepperScrollerDirective {
    constructor(private stepper: MatStepper) {}

    private firstAnimation = true;

    @HostListener('animationDone')
    selectionChanged() {
        if (!this.firstAnimation) {
            if (this.stepper.orientation === 'vertical') {
                const stepId = this.stepper._getStepLabelId(
                    this.stepper.selectedIndex
                );
                const stepElement = document.getElementById(stepId);
                if (stepElement) {
                    stepElement.scrollIntoView({
                        block: 'start',
                        inline: 'nearest',
                        behavior: 'smooth',
                    });
                }
            }
        }
        this.firstAnimation = false;
    }
}

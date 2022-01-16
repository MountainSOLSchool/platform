import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-root',
    template: `<router-outlet></router-outlet>`,
    styles: [``],
})
export class AppComponent {}

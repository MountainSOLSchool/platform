import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-root',
    template: ` <div>
        <router-outlet></router-outlet>
        <p-toast position="top-center"></p-toast>
    </div>`,
    styles: [``],
})
export class AppComponent {}

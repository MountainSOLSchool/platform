import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
    standalone: true,
    imports: [ToastModule, MessageModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-root',
    template: ` <div>
        <router-outlet></router-outlet>
        <p-toast position="top-right"></p-toast>
    </div>`,
    styles: [``],
})
export class AppComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    standalone: true,
    imports: [ToastModule, RouterModule],
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-root',
    template: ` <div>
        <router-outlet></router-outlet>
        <p-toast position="top-center"></p-toast>
    </div>`,
    styles: [``],
})
export class AppComponent {}

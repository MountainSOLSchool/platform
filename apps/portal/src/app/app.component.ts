import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { defineFullCalendarElement } from '@fullcalendar/web-component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

defineFullCalendarElement();

@Component({
    standalone: true,
    imports: [MessageModule, MessagesModule, ToastModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'sol-root',
    template: ` <div>
        <router-outlet></router-outlet>
        <p-toast position="top-center"></p-toast>
    </div>`,
    styles: [``],
})
export class AppComponent {}

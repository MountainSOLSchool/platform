import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ToastModule, MessageModule, RouterModule],
    selector: 'sol-root',
    template: ` <div>
            <router-outlet></router-outlet>
            <p-toast position="top-right"></p-toast>
        </div>
        <footer style="padding: 10px; border-top: 1px solid gray">
            <p>
                &#169; Mountain SOL 2023 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://www.mountainsol.org/privacy-policy/"
                    >Privacy Policy</a
                >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If you need help, please
                contact us at
                <a href="mailto:info@mountainsol.org">info@mountainsol.org</a>
            </p>
        </footer>`,
    styles: [``],
})
export class AppComponent {}

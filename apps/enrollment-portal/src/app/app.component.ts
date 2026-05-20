import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule],
    selector: 'sol-root',
    template: ` <div>
            <router-outlet></router-outlet>
        </div>
        <footer style="padding: 10px; border-top: 1px solid gray">
            <p>
                &#169; Mountain SOL 2025 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://www.mountainsol.org/privacy-policy/"
                    >Privacy Policy</a
                >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If you need help, please
                contact us at
                <a href="mailto:info@mountainsol.org"
                    >info&#64;mountainsol.org</a
                >
            </p>
        </footer>`,
    styles: [
        `
            footer a {
                color: var(--sol-primary, #006633);
                text-decoration: none;
            }
            footer a:hover {
                text-decoration: underline;
            }
        `,
    ],
})
export class AppComponent {}

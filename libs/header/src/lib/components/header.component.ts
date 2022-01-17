import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<header>
            <div style="display: flex; padding: 10px">
                <h1 routerLink="/" style="cursor: pointer">Mountain SOL</h1>
                <span style="flex: 1 1 auto"></span>
                <button routerLink="/report">Report</button>
                <sol-user-button></sol-user-button>
            </div>
        </header>
        <router-outlet></router-outlet>`,
})
export class HeaderComponent {}
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<header>
            <div style="display: flex; padding: 10px">
                <h1 routerLink="/" style="cursor: pointer">Mountain SOL</h1>
                <span style="flex: 1 1 auto"></span>
                <p-button
                    style="margin-right: 4px"
                    routerLink="/calendar/classes"
                    label="Calendar Demo"
                    styleClass="p-button-success"
                ></p-button>
                <p-button
                    style="margin-right: 4px"
                    routerLink="/report"
                    label="Report Demo"
                    styleClass="p-button-help"
                ></p-button>
                <sol-user-button></sol-user-button>
            </div>
        </header>
        <router-outlet></router-outlet>`,
})
export class HeaderComponent {}

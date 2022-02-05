import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '@sol/auth/user';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            .toolbar {
                color: green;
            }
        `,
    ],
    template: `<header class="toolbarz">
            <p-toolbar styleClass="toolbar">
                <div class="p-toolbar-group-left">
                    <h2 routerLink="/" style="margin: 0; cursor: pointer">
                        Mountain SOL School
                    </h2>
                </div>
                <div class="p-toolbar-group-right">
                    <ng-container *ngIf="isLoggedIn$ | async">
                        <div style="margin-right: 1rem">
                            <p-button
                                routerLink="/calendar/classes"
                                label="Calendar Demo"
                                styleClass="p-button-success p-button-md"
                            ></p-button>
                        </div>
                        <div style="margin-right: 3rem">
                            <p-button
                                routerLink="/report"
                                label="Report Demo"
                                styleClass="p-button-help p-button-md"
                            ></p-button></div
                    ></ng-container>
                    <sol-user-button></sol-user-button>
                </div>
            </p-toolbar>
        </header>
        <div style="padding: 1rem"><router-outlet></router-outlet></div>`,
})
export class HeaderComponent {
    constructor(private readonly userService: UserService) {}

    isLoggedIn$ = this.userService.isLoggedIn();
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserButtonComponent } from '@sol/auth/login';
import { UserService } from '@sol/auth/user';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        SidebarModule,
        ToolbarModule,
        RouterModule,
        UserButtonComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            .toolbar {
                color: green;
            }
        `,
    ],
    template: ` <header class="toolbarz">
            <p-toolbar styleClass="toolbar">
                <div routerLink="/" class="p-toolbar-group-left">
                    <div>
                        <img
                            src="https://www.mountainsol.org/wp-content/uploads/2020/03/SOL-horizontal-large-1024x234-1.jpg"
                            alt="sol-logo"
                            height="50px"
                            style="margin-right:10px"
                        />
                    </div>
                    <h2 style="margin: 0; cursor: pointer">
                        Registration Portal
                    </h2>
                </div>
                <div class="p-toolbar-group-right">
                    <ng-container
                        *ngIf="(isLoggedIn$ | async) && (isAdmin$ | async)"
                    >
                        <div style="margin-right: 2rem">
                            <p-button
                                type="text"
                                (click)="display = true"
                                icon="pi pi-bars"
                                label="Menu"
                            ></p-button></div
                    ></ng-container>
                    <sol-user-button
                        *ngIf="
                            (isLoggedIn$ | async) ||
                            !window.location.pathname.startsWith(
                                '/classes/enrollment'
                            )
                        "
                    ></sol-user-button>
                </div>
            </p-toolbar>
        </header>
        <div style="padding: 1rem"><router-outlet></router-outlet></div>
        <p-sidebar [(visible)]="display" position="right">
            <ul style="font-size:16px">
                <li>
                    <a routerLink="/admin/report" (click)="display = false"
                        >Class Forms and Contacts</a
                    >
                </li>
                <li>
                    <a routerLink="/admin/t-shirts" (click)="display = false"
                        >Tshirt Sizes</a
                    >
                </li>
                <li>
                    <a routerLink="/calendar/classes" (click)="display = false"
                        >Class Calendar</a
                    >
                </li>
                <li>
                    <a
                        routerLink="/classes/enrollment"
                        (click)="display = false"
                        >Class Registration</a
                    >
                </li>
            </ul>
        </p-sidebar>`,
})
export class HeaderComponent {
    private readonly userService = inject(UserService);

    display = false;

    window = window;

    isLoggedIn$ = this.userService.isLoggedIn();
    isAdmin$ = this.userService.isAdmin();
}

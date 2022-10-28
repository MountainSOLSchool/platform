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
                <div class="p-toolbar-group-left">
                    <div>
                        <img
                            src="assets/header/sol-logo.png"
                            alt="sol-logo"
                            height="50px"
                            style="margin-right:10px"
                        />
                    </div>
                    <h2 routerLink="/" style="margin: 0; cursor: pointer">
                        Mountain SOL School Portal
                    </h2>
                </div>
                <div class="p-toolbar-group-right">
                    <ng-container *ngIf="isLoggedIn$ | async">
                        <div style="margin-right: 2rem">
                            <p-button
                                type="text"
                                (click)="display = true"
                                icon="pi pi-bars"
                                label="Menu"
                            ></p-button></div
                    ></ng-container>
                    <sol-user-button></sol-user-button>
                </div>
            </p-toolbar>
        </header>
        <div style="padding: 1rem"><router-outlet></router-outlet></div>
        <p-sidebar [(visible)]="display" position="right">
            <ul style="font-size:16px">
                <li>
                    <a routerLink="/report" (click)="display = false"
                        >Class Forms and Contacts</a
                    >
                </li>
                <li>
                    <a routerLink="/t-shirts" (click)="display = false"
                        >Tshirt Sizes</a
                    >
                </li>
                <li>
                    <a routerLink="/import" (click)="display = false"
                        >Import Summer 2022 Enrollment</a
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

    isLoggedIn$ = this.userService.isLoggedIn();
}

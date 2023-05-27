import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserButtonComponent } from '@sol/auth/login';
import { UserService } from '@sol/auth/user';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { LetModule } from '@rx-angular/template/let';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ButtonModule,
        SidebarModule,
        ToolbarModule,
        RouterModule,
        LetModule,
        UserButtonComponent,
    ],
    styles: [
        `
            .toolbar {
                color: green;
            }
        `,
    ],
    template: ` <header *rxLet="size$; let size" class="toolbarz">
            <p-toolbar styleClass="toolbar">
                <div routerLink="/" class="p-toolbar-group-left">
                    <div>
                        <img
                            src="https://www.mountainsol.org/wp-content/uploads/2020/03/SOL-horizontal-large-1024x234-1.jpg"
                            alt="sol-logo"
                            [ngStyle]="{
                                'margin-right': '10px',
                                height: size === 'default' ? '50px' : '35px'
                            }"
                        />
                    </div>
                    <h2 style="margin: 0; cursor: pointer;">
                        {{
                            size === 'default'
                                ? 'Registration Portal'
                                : 'Portal'
                        }}
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
                        [size]="assertSize(size)"
                    ></sol-user-button>
                </div>
            </p-toolbar>
        </header>
        <div style="padding: 1rem"><router-outlet></router-outlet></div>
        <p-sidebar [(visible)]="display" position="right">
            <ul style="font-size:16px">
                <li>
                    <a
                        routerLink="/classes/enrollment"
                        (click)="display = false"
                        >Class Registration</a
                    >
                </li>
                <h4 style="margin-bottom:4px">Admin</h4>
                <li>
                    <a routerLink="/admin" (click)="display = false"
                        >Dashboard</a
                    >
                </li>
                <li>
                    <a routerLink="/admin/report" (click)="display = false"
                        >Class Forms and Contacts</a
                    >
                </li>
                <li>
                    <a routerLink="/admin/t-shirts" (click)="display = false"
                        >T-shirt Sizes</a
                    >
                </li>
                <li>
                    <a routerLink="/admin/enrollments" (click)="display = false"
                        >Enrollments</a
                    >
                </li>
                <li>
                    <a routerLink="/calendar/classes" (click)="display = false"
                        >Class Calendar</a
                    >
                </li>
            </ul>
        </p-sidebar>`,
})
export class HeaderComponent {
    private readonly userService = inject(UserService);

    readonly size$ = inject(BreakpointObserver)
        .observe('(min-width: 600px)')
        .pipe(map(({ matches }) => (matches ? 'default' : 'small')));

    display = false;

    window = window;

    isLoggedIn$ = this.userService.isLoggedIn();
    isAdmin$ = this.userService.isAdmin();

    assertSize(size: string): 'default' | 'small' {
        return size as 'default' | 'small';
    }
}

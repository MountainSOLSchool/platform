import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserButtonComponent } from '@sol/auth/login';
import { UserService } from '@sol/auth/user';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { AsyncPipe, NgStyle } from '@angular/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgStyle,
        AsyncPipe,
        ButtonModule,
        SidebarModule,
        ToolbarModule,
        RouterModule,
        UserButtonComponent,
    ],
    styles: [
        `
            @media (max-width: 620px) {
                :host ::ng-deep p-toolbar > div {
                    padding: 10px;
                }
            }
        `,
    ],
    template: `@let size = size$ | async;
    @if (size) {
    <header>
            <p-toolbar>
                <div routerLink="/" class="p-toolbar-group-left">
                    <div>
                        <img
                            [src]="size === 'default' ? 'https://www.mountainsol.org/wp-content/uploads/2020/03/SOL-horizontal-large-1024x234-1.jpg' : 'https://firebasestorage.googleapis.com/v0/b/mountain-sol-platform.appspot.com/o/SOL-horizontal-large-1024x234-1.jpg?alt=media&token=ec0f774c-3862-41b6-a646-c834468a3cb1'"
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
                    @if ((isLoggedIn$ | async) && (isAdmin$ | async)) {
                        <div style="margin-right: 1rem">
                            <p-button
                                type="text"
                                (click)="display = true"
                                icon="pi pi-bars"
                                label="Menu"
                            ></p-button>
                        </div>
                    }
                    <sol-user-button
                        [size]="assertSize(size)"
                    ></sol-user-button>
                </div>
            </p-toolbar>
        </header>
    }
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
                    <a routerLink="/admin/students" (click)="display = false"
                        >Student Info Sheets</a
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
                <li>
                    <a href="https://students.mountainsol.org/units">
                        Student Units
                    </a>
                </li>
            </ul>
        </p-sidebar>`,
})
export class HeaderComponent {
    private readonly userService = inject(UserService);

    readonly size$ = inject(BreakpointObserver)
        .observe('(min-width: 620px)')
        .pipe(map(({ matches }) => (matches ? 'default' : 'small')));

    display = false;

    window = window;

    isLoggedIn$ = this.userService.isLoggedIn();
    isAdmin$ = this.userService.isAdmin();

    assertSize(size: string): 'default' | 'small' {
        return size as 'default' | 'small';
    }
}

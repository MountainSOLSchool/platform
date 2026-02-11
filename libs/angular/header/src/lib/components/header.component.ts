import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
            .program-tabs {
                display: flex;
                gap: 0;
                background: var(--sol-surface-variant, #f5f5f5);
                padding: 3px;
                border-radius: 6px;
                margin-left: 12px;
            }
            .program-tabs a {
                text-align: center;
                padding: 4px 12px;
                border-radius: 4px;
                text-decoration: none;
                font-weight: 500;
                font-size: 13px;
                color: var(--sol-on-surface-variant, #666);
                transition: background 0.2s, color 0.2s;
                cursor: pointer;
            }
            .program-tabs a.active {
                background: var(--sol-primary, #006633);
                color: #fff;
            }
        `,
    ],
    template: `@let size = size$ | async;
    @if (size) {
    <header>
            <p-toolbar>
                <div class="p-toolbar-group-left" style="align-items: center;">
                    <div routerLink="/" style="display: flex; align-items: center; cursor: pointer;">
                        <img
                            [src]="size === 'default' ? 'https://www.mountainsol.org/wp-content/uploads/2023/07/Banner-4.png' : 'https://firebasestorage.googleapis.com/v0/b/mountain-sol-platform.appspot.com/o/SOL-horizontal-large-1024x234-1.jpg?alt=media&token=ec0f774c-3862-41b6-a646-c834468a3cb1'"
                            alt="sol-logo"
                            [ngStyle]="{
                                'margin-right': '10px',
                                height: size === 'default' ? '50px' : '35px'
                            }"
                        />
                        <h2 style="margin: 0;">Registration</h2>
                    </div>
                    @if (showProgramTabs()) {
                    <nav class="program-tabs">
                        <a routerLink="/classes/enrollment"
                           [class.active]="isYouthActive()">Youth</a>
                        <a routerLink="/medic/sign-up"
                           [class.active]="isMedicActive()">Medic</a>
                    </nav>
                    }
                </div>
                <div class="p-toolbar-group-right">
                    @if ((isLoggedIn$ | async) && ((isAdmin$ | async) || (isMedicAdmin$ | async))) {
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
                    <a routerLink="/admin/classes/management" (click)="display = false"
                        >Manage Classes</a
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
                @if (isMedicAdmin$ | async) {
                    <h4 style="margin-bottom:4px">Medic Admin</h4>
                    <li>
                        <a routerLink="/medic/admin/classes" (click)="display = false"
                            >Manage Medic Classes</a
                        >
                    </li>
                    <li>
                        <a routerLink="/medic/admin/enrollments" (click)="display = false"
                            >Medic Enrollments</a
                        >
                    </li>
                }
            </ul>
        </p-sidebar>`,
})
export class HeaderComponent {
    private readonly userService = inject(UserService);
    private readonly router = inject(Router);

    readonly size$ = inject(BreakpointObserver)
        .observe('(min-width: 620px)')
        .pipe(map(({ matches }) => (matches ? 'default' : 'small')));

    display = false;

    window = window;

    isLoggedIn$ = this.userService.isLoggedIn();
    isAdmin$ = this.userService.isAdmin();
    isMedicAdmin$ = this.userService.isMedicAdmin();

    assertSize(size: string): 'default' | 'small' {
        return size as 'default' | 'small';
    }

    showProgramTabs(): boolean {
        const url = this.router.url;
        return url.startsWith('/classes') || url.startsWith('/medic/sign-up') || url === '/';
    }

    isYouthActive(): boolean {
        return !this.router.url.startsWith('/medic');
    }

    isMedicActive(): boolean {
        return this.router.url.startsWith('/medic/sign-up');
    }
}

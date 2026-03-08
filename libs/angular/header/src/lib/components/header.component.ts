import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UserService } from '@sol/auth/user';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, map } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProgramTabsComponent } from './program-tabs.component';
import { UserMenuComponent } from './user-menu.component';
import { MobileMenuComponent } from './mobile-menu.component';
import { AdminDrawerNavComponent } from './admin-drawer-nav.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        ProgramTabsComponent,
        UserMenuComponent,
        MobileMenuComponent,
        AdminDrawerNavComponent,
    ],
    styles: [
        `
            :host {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
            .toolbar {
                background: var(--sol-header-bg, rgb(20, 51, 0));
                color: var(--sol-header-text, #fff);
                padding: 0 12px;
            }
            .toolbar-left {
                display: flex;
                align-items: center;
                flex: 1;
                min-width: 0;
            }
            .logo-group {
                display: flex;
                align-items: center;
                cursor: pointer;
                text-decoration: none;
                color: inherit;
            }
            .logo-group img {
                margin-right: 10px;
            }
            .logo-group h2 {
                margin: 0;
                white-space: nowrap;
            }
            .toolbar-right {
                display: flex;
                align-items: center;
            }
            .split-btn {
                display: flex;
                align-items: center;
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 24px;
                overflow: hidden;
            }
            .split-divider {
                width: 1px;
                height: 24px;
                background: rgba(255, 255, 255, 0.3);
            }
            mat-sidenav-container {
                flex: 1;
            }
            mat-sidenav {
                width: 260px;
            }
            @media (max-width: 620px) {
                .toolbar {
                    padding: 0 8px;
                }
                .logo-group h2 {
                    font-size: 1.1rem;
                }
            }
        `,
    ],
    template: `
        <header>
            <mat-toolbar class="toolbar">
                <div class="toolbar-left">
                    <a class="logo-group" routerLink="/">
                        <img
                            [src]="logoSrc()"
                            [style.height]="logoHeight()"
                            alt="sol-logo"
                        />
                        <h2>Registration</h2>
                    </a>
                    @if (isDesktop() && showProgramTabs()) {
                        <sol-program-tabs variant="toolbar" />
                    }
                </div>

                <div class="toolbar-right">
                    @if (isDesktop()) {
                        @if (isAdminUser()) {
                            <div class="split-btn">
                                <button
                                    mat-icon-button
                                    (click)="toggleDrawer()"
                                    aria-label="Toggle admin menu"
                                    style="color: #fff;"
                                >
                                    <mat-icon>menu</mat-icon>
                                </button>
                                <div class="split-divider"></div>
                                <sol-user-menu />
                            </div>
                        } @else {
                            <sol-user-menu />
                        }
                    } @else {
                        @if (isAdminUser()) {
                            <button
                                mat-icon-button
                                (click)="toggleDrawer()"
                                aria-label="Toggle admin menu"
                                style="color: #fff;"
                            >
                                <mat-icon>menu</mat-icon>
                            </button>
                        }
                        <sol-mobile-menu
                            [showProgramTabs]="showProgramTabs()"
                        />
                    }
                </div>
            </mat-toolbar>
        </header>

        <mat-sidenav-container>
            @if (isAdminUser()) {
                <mat-sidenav
                    [mode]="drawerMode()"
                    [opened]="drawerOpen()"
                    (openedChange)="drawerOpen.set($event)"
                >
                    <sol-admin-drawer-nav [isMedicAdmin]="isMedicAdmin()" />
                </mat-sidenav>
            }
            <mat-sidenav-content>
                <div style="padding: 1rem">
                    <router-outlet></router-outlet>
                </div>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `,
})
export class HeaderComponent {
    private readonly userService = inject(UserService);
    private readonly router = inject(Router);

    readonly isDesktop = toSignal(
        inject(BreakpointObserver)
            .observe('(min-width: 620px)')
            .pipe(map(({ matches }) => matches)),
        { initialValue: true }
    );

    private readonly url = toSignal(
        this.router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map(() => this.router.url)
        ),
        { initialValue: this.router.url }
    );

    readonly isAdmin = toSignal(this.userService.isAdmin(), {
        initialValue: false,
    });
    readonly isMedicAdmin = toSignal(this.userService.isMedicAdmin(), {
        initialValue: false,
    });

    readonly isAdminUser = computed(
        () => this.isAdmin() || this.isMedicAdmin()
    );

    readonly isOnAdminRoute = computed(() => {
        const u = this.url();
        return u.startsWith('/admin') || u.startsWith('/medic/admin');
    });

    readonly drawerOpen = signal(false);

    readonly drawerMode = computed<'side' | 'over'>(() =>
        this.isDesktop() && this.isOnAdminRoute() ? 'side' : 'over'
    );

    readonly logoSrc = computed(() =>
        this.isDesktop()
            ? 'https://www.mountainsol.org/wp-content/uploads/2023/07/Banner-4.png'
            : 'https://firebasestorage.googleapis.com/v0/b/mountain-sol-platform.appspot.com/o/SOL-horizontal-large-1024x234-1.jpg?alt=media&token=ec0f774c-3862-41b6-a646-c834468a3cb1'
    );

    readonly logoHeight = computed(() => (this.isDesktop() ? '50px' : '35px'));

    readonly showProgramTabs = computed(() => {
        const u = this.url();
        return (
            u.startsWith('/classes') ||
            u.startsWith('/medic/sign-up') ||
            u === '/'
        );
    });

    toggleDrawer() {
        this.drawerOpen.update((v) => !v);
    }

    constructor() {
        effect(() => {
            this.url();
            if (!this.isDesktop() || !this.isOnAdminRoute()) {
                this.drawerOpen.set(false);
            }
        });
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { UserService } from '@sol/auth/user';

import { FirebaseAuthService } from '@sol/angular/auth/firebase';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ProgramTabsComponent } from './program-tabs.component';

@Component({
    selector: 'sol-mobile-menu',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        ProgramTabsComponent,
        FirebaseAuthService,
    ],
    styles: [
        `
            :host {
                display: contents;
            }
        `,
    ],
    template: ` <button
            mat-icon-button
            [matMenuTriggerFor]="mobileMenu"
            aria-label="Account menu"
            style="color: #fff;"
        >
            <mat-icon>person</mat-icon>
        </button>

        <mat-menu #mobileMenu="matMenu">
            @if (showProgramTabs()) {
                <div (click)="$event.stopPropagation()">
                    <sol-program-tabs variant="menu" />
                </div>
                <mat-divider></mat-divider>
            }
            @if (email()) {
                <button mat-menu-item disabled>{{ emailDisplay() }}</button>
                <a mat-menu-item routerLink="/account/enrollments"
                    >Enrollments</a
                >
                <a mat-menu-item routerLink="/account/students">Students</a>
                <a mat-menu-item routerLink="/account/manage">Manage Account</a>
                <mat-divider></mat-divider>
                <button mat-menu-item (click)="signOut()">
                    <mat-icon>logout</mat-icon>
                    <span>Sign Out</span>
                </button>
            } @else {
                <a mat-menu-item routerLink="/user/create">
                    <mat-icon>login</mat-icon>
                    <span>Register / Sign In</span>
                </a>
            }
        </mat-menu>`,
})
export class MobileMenuComponent {
    private readonly userService = inject(UserService);
    private readonly auth = inject(FirebaseAuthService);

    readonly showProgramTabs = input(false);

    readonly email = toSignal(
        this.userService.getUser().pipe(map((u) => u?.email ?? null)),
        { initialValue: null as string | null }
    );

    readonly emailDisplay = computed(() => {
        const e = this.email();
        if (!e) return 'User';
        return e.length > 20 ? e.substring(0, 20) + '...' : e;
    });

    signOut() {
        this.auth.logout();
    }
}

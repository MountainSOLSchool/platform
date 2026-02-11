import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { UserService } from '@sol/auth/user';
import { FirebaseAuthService } from '@sol/angular/auth/firebase';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'sol-user-menu',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        FirebaseAuthService,
    ],
    styles: [`
        :host { display: contents; }
        .sign-in-link { text-decoration: none; color: #fff; padding: 0 12px !important; white-space: nowrap; font-size: 14px; font-weight: 500; display: flex; align-items: center; height: 40px; }
        .sign-in-btn { color: #fff !important; }
    `],
    template: `
        @if (email()) {
            <button mat-icon-button [matMenuTriggerFor]="userMenu" aria-label="User menu" style="color: #fff;">
                <mat-icon>account_circle</mat-icon>
            </button>
        } @else {
            <a class="sign-in-link" routerLink="/user/create">Sign In</a>
        }

        <mat-menu #userMenu="matMenu">
            <button mat-menu-item disabled>{{ emailDisplay() }}</button>
            <mat-divider></mat-divider>
            <a mat-menu-item routerLink="/account/enrollments">Enrollments</a>
            <a mat-menu-item routerLink="/account/students">Students</a>
            <a mat-menu-item routerLink="/account/manage">Manage Account</a>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="signOut()">
                <mat-icon>logout</mat-icon>
                <span>Sign Out</span>
            </button>
        </mat-menu>`,
})
export class UserMenuComponent {
    private readonly userService = inject(UserService);
    private readonly auth = inject(FirebaseAuthService);

    readonly menuTrigger = viewChild(MatMenuTrigger);

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

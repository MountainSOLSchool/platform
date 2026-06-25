import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '@sol/auth/user';
import { FirebaseAuthService } from '@sol/angular/auth/firebase';
import { AvatarComponent } from '@sol/angular/avatar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { map, Observable } from 'rxjs';

interface MenuItem {
    label?: string;
    icon?: string;
    disabled?: boolean;
    routerLink?: string;
    command?: () => void;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        AvatarComponent,
        FirebaseAuthService,
    ],
    selector: 'sol-user-button',
    template: `@if (email$ | async; as email) {
            <div style="cursor: pointer">
                <button
                    mat-icon-button
                    [matMenuTriggerFor]="menu"
                    aria-label="Account menu"
                >
                    <sol-avatar [label]="email" size="2.5rem"></sol-avatar>
                </button>
                <mat-menu #menu="matMenu">
                    @for (
                        item of (menuItems$ | async) ?? [];
                        track item.label
                    ) {
                        @if (item.routerLink) {
                            <a
                                mat-menu-item
                                [routerLink]="item.routerLink"
                                [disabled]="item.disabled ?? false"
                            >
                                @if (item.icon) {
                                    <mat-icon>{{ item.icon }}</mat-icon>
                                }
                                <span>{{ item.label }}</span>
                            </a>
                        } @else {
                            <button
                                mat-menu-item
                                type="button"
                                [disabled]="item.disabled ?? false"
                                (click)="item.command && item.command()"
                            >
                                @if (item.icon) {
                                    <mat-icon>{{ item.icon }}</mat-icon>
                                }
                                <span>{{ item.label }}</span>
                            </button>
                        }
                    }
                </mat-menu>
            </div>
        } @else {
            <a mat-raised-button color="primary" routerLink="/user/create">
                {{ size === 'default' ? 'Register / Sign In' : 'Account' }}
            </a>
        }`,
})
export class UserButtonComponent implements OnInit {
    private readonly auth = inject(FirebaseAuthService);
    private readonly userService = inject(UserService);

    @Input() size: 'default' | 'small' = 'default';

    public email$: Observable<string | null | undefined> | undefined;

    public menuItems$: Observable<Array<MenuItem>> = this.userService
        .getUser()
        .pipe(
            map((user) => [
                {
                    label:
                        (user?.email?.substring(0, 15) ?? 'User email') +
                        ((user?.email?.length ?? 0 > 15) ? '...' : ''),
                    disabled: true,
                },
                {
                    label: 'Enrollments',
                    routerLink: '/account/enrollments',
                },
                {
                    label: 'Students',
                    routerLink: '/account/students',
                },
                {
                    label: 'Manage Account',
                    routerLink: '/account/manage',
                },
                {
                    label: 'Sign Out',
                    icon: 'logout',
                    command: () => this.signOut(),
                },
            ])
        );

    ngOnInit() {
        this.email$ = this.userService
            .getUser()
            .pipe(map((user) => user?.email));
    }

    signOut() {
        this.auth.logout();
    }
}

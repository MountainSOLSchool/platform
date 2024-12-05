import { AsyncPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnInit,
} from '@angular/core';
import { UserService } from '@sol/auth/user';
import { FirebaseAuthService } from '@sol/angular/auth/firebase';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { map, Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        MenuModule,
        AvatarModule,
        ButtonModule,
        FirebaseAuthService,
    ],
    selector: 'sol-user-button',
    template: `@if (email$ | async; as email) {
            <div style="cursor: pointer">
                <p-avatar
                    size="large"
                    icon="pi pi-user"
                    (click)="menu.toggle($event)"
                    styleClass="mr-2"
                    [style]="{
                        'background-color': '#aaa',
                        color: '#ffffff'
                    }"
                ></p-avatar>
                <p-menu
                    #menu
                    [popup]="true"
                    [model]="(menuItems$ | async) ?? []"
                ></p-menu>
            </div>
        } @else {
            <p-button
                routerLink="/user/create"
                [label]="size === 'default' ? 'Register / Sign In' : 'Account'"
                styleClass="p-button-md"
            ></p-button>
        }`
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
                        (user?.email?.length ?? 0 > 15 ? '...' : ''),
                    disabled: true,
                },
                {
                    label: 'Enrollments',
                    routerLink: '/account/enrollments',
                },
                {
                    label: 'Manage Account',
                    routerLink: '/account/manage',
                },
                {
                    label: 'Sign Out',
                    icon: 'pi pi-sign-out',
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

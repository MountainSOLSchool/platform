import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { UserService } from '@sol/auth/user';
import { AuthService } from '@sol/firebase/auth';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { map, Observable } from 'rxjs';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        MenuModule,
        AvatarModule,
        ButtonModule,
        AuthService,
    ],
    selector: 'sol-user-button',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <ng-container *ngIf="email$ | async as email; else login">
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
        </ng-container>
        <ng-template #login>
            <p-button
                routerLink="/user/create"
                label="Register / Sign In"
                styleClass="p-button-md"
            ></p-button
        ></ng-template>`,
})
export class UserButtonComponent implements OnInit {
    private readonly auth = inject(AuthService);
    private readonly userService = inject(UserService);

    public email$: Observable<string | null | undefined> | undefined;

    public menuItems$: Observable<Array<MenuItem>> = this.userService
        .getUser()
        .pipe(
            map((user) => [
                {
                    label: user?.email ?? 'User email',
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

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from '@sol/auth/user';
import { AuthService } from '@sol/firebase/auth';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';

@Component({
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
                <p-menu #menu [popup]="true" [model]="menuItems"></p-menu>
            </div>
        </ng-container>
        <ng-template #login>
            <p-button
                routerLink="/user/login"
                label="Sign In"
                styleClass="p-button-md"
            ></p-button
        ></ng-template>`,
})
export class UserButtonComponent implements OnInit {
    constructor(
        private readonly auth: AuthService,
        private readonly userService: UserService
    ) {}

    public email$: Observable<string | null | undefined> | undefined;

    public menuItems: Array<MenuItem> = [
        {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            command: () => this.signOut(),
        },
    ];

    ngOnInit() {
        this.email$ = this.userService
            .getUser()
            .pipe(map((user) => user?.email));
    }

    signOut() {
        this.auth.logout();
    }
}

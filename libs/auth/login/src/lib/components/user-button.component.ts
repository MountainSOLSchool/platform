import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'sol-user-button',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <ng-container *ngIf="email$ | async as email; else login">
            <p-avatar
                size="large"
                [label]="email[0].toLocaleUpperCase()"
            ></p-avatar>
        </ng-container>
        <ng-template #login>
            <p-button routerLink="/user/login" label="Log In"></p-button
        ></ng-template>`,
})
export class UserButtonComponent implements OnInit {
    constructor(private readonly afAuth: AngularFireAuth) {}

    public email$: Observable<string | null | undefined> | undefined;

    ngOnInit() {
        this.email$ = this.afAuth.user.pipe(map((user) => user?.email));
    }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LoginStore } from '@sol/auth/login';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserService } from '@sol/auth/user';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <h2>Manage Account</h2>
        <div style="margin-top: 2rem">
            <p><b>Email:</b> {{ email$ | async }}</p>
        </div>
        <div style="margin-top: 2rem">
            <h3>Change Password</h3>
            <button
                pButton
                type="button"
                label="Email password reset link"
                (click)="sendResetLink()"
            ></button>
        </div>`,
    imports: [AsyncPipe, ButtonModule, LoginStore],
})
export class ManageAccountComponent {
    private readonly loginStore = inject(LoginStore);
    readonly email$ = inject(UserService)
        .getUser()
        .pipe(map((user) => user?.email));
    sendResetLink() {
        this.loginStore.resetPassword();
    }
}

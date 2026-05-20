import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LoginStore } from '@sol/auth/login';
import { map } from 'rxjs';
import { UserService } from '@sol/auth/user';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ` <h2>Manage Account</h2>
        @if (email.hasValue()) {
            <div style="margin-top: 2rem">
                <p><b>Email:</b> {{ email.value() }}</p>
            </div>
        }
        <div style="margin-top: 2rem">
            <h3>Change Password</h3>
            <button mat-raised-button type="button" (click)="sendResetLink()">
                Email password reset link
            </button>
        </div>`,
    imports: [MatButtonModule, LoginStore],
})
export class ManageAccountComponent {
    readonly #loginStore = inject(LoginStore);
    readonly #userService = inject(UserService);

    readonly email = rxResource({
        stream: () =>
            this.#userService.getUser().pipe(map((user) => user?.email)),
    });

    public sendResetLink() {
        this.#loginStore.resetPassword();
    }
}

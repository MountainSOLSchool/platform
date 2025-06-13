import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
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
            <button
                pButton
                type="button"
                label="Email password reset link"
                (click)="sendResetLink()"
            ></button>
        </div>`,
    imports: [ButtonModule, LoginStore],
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

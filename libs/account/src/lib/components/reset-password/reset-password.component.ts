import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LoginStore } from '@sol/auth/login';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
    standalone: true,
    template: `<button
        pButton
        type="button"
        label="Send password reset link"
        (click)="sendResetLink()"
    ></button>`,
    imports: [ButtonModule],
    providers: [provideComponentStore(LoginStore)],
})
export class ResetPasswordComponent {
    private readonly loginStore = inject(LoginStore);
    sendResetLink() {
        this.loginStore.resetPassword();
    }
}

import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LoginStore } from '@sol/auth/login';
import { provideComponentStore } from '@ngrx/component-store';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    template: ` <h2>Manage Account</h2>
        <p><b>Email:</b> {{ email$ | async }}</p>
        <h3>Change Password</h3>
        <button
            pButton
            type="button"
            label="Email password reset link"
            (click)="sendResetLink()"
        ></button>`,
    imports: [CommonModule, ButtonModule],
    providers: [provideComponentStore(LoginStore)],
})
export class ManageAccountComponent {
    private readonly loginStore = inject(LoginStore);
    readonly email$ = inject(AngularFireAuth).user.pipe(
        map((user) => user?.email)
    );
    sendResetLink() {
        this.loginStore.resetPassword();
    }
}

import { CommonModule } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import {
    AngularFireAuth,
    AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { ComponentStore } from '@ngrx/component-store';
import { LoginComponent } from '@sol/auth/login';
import { tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

@Injectable()
class AccountStore extends ComponentStore<{ nil: null }> {
    readonly workflow = inject(EnrollmentWorkflowStore);

    constructor() {
        super({ nil: null });
    }

    readonly next = this.effect(() => {
        return this.workflow.nextClick$.pipe(
            tap(() => this.workflow.completeStep())
        );
    });
}

@Component({
    standalone: true,
    imports: [CommonModule, LoginComponent],
    providers: [AccountStore],
    selector: 'sol-class-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    store = inject(AccountStore);
    user$ = inject(AngularFireAuth).user;
}

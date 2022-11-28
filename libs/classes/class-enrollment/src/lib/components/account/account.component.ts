import { CommonModule } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import {
    AngularFireAuth,
    AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { ComponentStore } from '@ngrx/component-store';
import { LoginComponent } from '@sol/auth/login';
import { CardModule } from 'primeng/card';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

@Injectable()
class AccountStore extends ComponentStore<{ nil: null }> {
    readonly workflow = inject(EnrollmentWorkflowStore);
    private user$ = inject(AngularFireAuth).user;

    constructor() {
        super({ nil: null });
    }

    readonly next = this.effect(() => {
        return this.workflow.nextClick$.pipe(
            withLatestFrom(this.user$),
            filter(([, user]) => !!user),
            tap(() => this.workflow.completeStep())
        );
    });
}

@Component({
    standalone: true,
    imports: [CommonModule, LoginComponent, CardModule],
    providers: [AccountStore],
    selector: 'sol-class-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    store = inject(AccountStore);
    user$ = inject(AngularFireAuth).user;
}

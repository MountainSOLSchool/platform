import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AccountEnrollmentsViewComponent } from './account-enrollments.view.component';
import { provideComponentStore } from '@ngrx/component-store';
import { AccountEnrollmentsStore } from '../../store/account-enrollments.store';
import { RxIf } from '@rx-angular/template/if';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:
        '<sol-account-enrollments-view *rxIf="viewModel; let vm" [enrollments]="vm.enrollments"></sol-account-enrollments-view>',
    imports: [AccountEnrollmentsViewComponent, RxIf],
    providers: [provideComponentStore(AccountEnrollmentsStore)],
})
export class AccountEnrollmentsComponent {
    private readonly store = inject(AccountEnrollmentsStore);
    readonly viewModel = this.store.select({
        enrollments: this.store.select((state) => state.enrollments),
    });
}

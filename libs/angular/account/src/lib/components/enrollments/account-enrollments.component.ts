import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from '@angular/core';

import { AccountEnrollmentsViewComponent } from './account-enrollments.view.component';
import { provideComponentStore } from '@ngrx/component-store';
import { AccountEnrollmentsStore } from '../../store/account-enrollments.store';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:
        '<sol-account-enrollments-view [enrollments]="viewModel().enrollments()"></sol-account-enrollments-view>',
    imports: [AccountEnrollmentsViewComponent],
    providers: [provideComponentStore(AccountEnrollmentsStore)],
})
export class AccountEnrollmentsComponent {
    private readonly store = inject(AccountEnrollmentsStore);
    readonly viewModel = computed(() => ({
        enrollments: this.store.enrollments,
    }));
}

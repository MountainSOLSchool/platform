import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from '@angular/core';

import { AccountEnrollmentsViewComponent } from './account-enrollments.view.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { AccountEnrollmentsApiService } from '../../services/account-enrollments-api.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:
        '<sol-account-enrollments-view [enrollments]="enrollments()"></sol-account-enrollments-view>',
    imports: [AccountEnrollmentsViewComponent],
})
export class AccountEnrollmentsComponent {
    private readonly accountEnrollmentsApiService = inject(
        AccountEnrollmentsApiService
    );

    readonly enrollmentsResource = rxResource({
        loader: () => this.accountEnrollmentsApiService.getAll(),
    });

    readonly enrollments = computed(() => ({
        value: this.enrollmentsResource.value(),
        status: this.enrollmentsResource.status(),
    }));
}

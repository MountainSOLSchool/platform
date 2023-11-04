import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SemesterEnrollment } from '@sol/classes/domain';
import { AccountEnrollmentsService } from '../services/account-enrollments.service';
import { RequestState, Requested } from '@sol/angular/request';
import { of, switchMap, tap } from 'rxjs';

type State = {
    enrollments: Requested<Array<SemesterEnrollment>>;
};

@Injectable()
export class AccountEnrollmentsStore extends ComponentStore<State> {
    private readonly accountEnrollments = inject(AccountEnrollmentsService);

    constructor() {
        super({
            enrollments: RequestState.Empty,
        });
    }

    private loadEnrollmentOnInit = this.effect(() => {
        return of(undefined).pipe(tap(() => this.loadEnrollments()));
    });

    private readonly loadEnrollments = this.effect((call) => {
        return call.pipe(
            switchMap(() =>
                this.accountEnrollments.getAll().pipe(
                    tap((enrollments) =>
                        this.patchState({
                            enrollments,
                        })
                    )
                )
            )
        );
    });
}

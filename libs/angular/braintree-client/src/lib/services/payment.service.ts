import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { filter, Observable, switchMap } from 'rxjs';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { UserService } from '@sol/auth/user';

@Injectable({ providedIn: 'root' })
export class PaymentService {
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly user = inject(UserService).getUser();

    getToken(anonymous = false): Observable<string> {
        return this.user.pipe(
            filter((user) => anonymous || !!user),
            switchMap(() =>
                this.functions
                    .call<string>('paymentToken')
                    .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            )
        );
    }
}

import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { filter, Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
    private readonly functions = inject(FunctionsApi);
    private readonly afAuth = inject(AngularFireAuth);

    getToken(): Observable<string> {
        return this.afAuth.user.pipe(
            filter((user) => !!user),
            switchMap(() => this.functions.call<string>('paymentToken'))
        );
    }
}

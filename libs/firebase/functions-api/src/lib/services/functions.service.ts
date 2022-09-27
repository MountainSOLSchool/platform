import {
    AngularFireFunctions,
    AngularFireFunctionsModule,
} from '@angular/fire/compat/functions';
import { inject, Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

@NgModule({
    imports: [AngularFireFunctionsModule],
})
@Injectable({
    providedIn: 'root',
})
export class FunctionsApi {
    private readonly fns = inject(AngularFireFunctions);

    public call<T>(resourcePath: string, data?: unknown): Observable<T> {
        const firebaseFunction = this.fns.httpsCallable<unknown, T>(
            resourcePath
        );
        return firebaseFunction(data);
    }
}

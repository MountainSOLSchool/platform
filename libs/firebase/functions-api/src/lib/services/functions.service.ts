import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FunctionsApi {
    constructor(private readonly fns: AngularFireFunctions) {}

    public call<T>(resourcePath: string, data?: unknown): Observable<T> {
        const firebaseFunction = this.fns.httpsCallable<unknown, T>(
            resourcePath
        );
        return firebaseFunction(data);
    }
}

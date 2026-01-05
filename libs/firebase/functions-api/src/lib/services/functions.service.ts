import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
    Requested,
    RequestedOperatorsUtility,
    RequestState,
} from '@sol/angular/request';
import { catchError, from, map, Observable, of, startWith } from 'rxjs';
import { FIRE_FUNCTIONS } from '@sol/angular/firebase/adapter';
import { environment } from 'apps/enrollment-portal/src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FirebaseFunctionsService {
    private readonly fns = inject(FIRE_FUNCTIONS);
    private readonly http = inject(HttpClient);

    public call<T>(
        resourcePath: string,
        request?: unknown
    ): Observable<Requested<T>> {
        if (environment.remoteFunctions) {
            // Production: use Firebase SDK
            const fn = this.fns.httpsCallable(resourcePath);
            return from(fn(request)).pipe(
                map(({ data }) => data as T),
                catchError(() => of(RequestState.Error)),
                startWith(RequestState.Loading)
            );
        } else {
            // Dev mode: use /api/* proxy
            return this.http
                .post<{ result: T }>(`/api/${resourcePath}`, { data: request })
                .pipe(
                    map((response) => response.result),
                    catchError(() => of(RequestState.Error)),
                    startWith(RequestState.Loading)
                );
        }
    }

    public callFn<T>(resourcePath: string, request?: unknown): Observable<T> {
        return this.call<T>(resourcePath, request).pipe(
            RequestedOperatorsUtility.ignoreAllStatesButLoaded()
        );
    }
}

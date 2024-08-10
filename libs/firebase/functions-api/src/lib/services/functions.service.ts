import { inject, Injectable } from '@angular/core';
import { Requested, RequestState } from '@sol/angular/request';
import { catchError, from, map, Observable, of, startWith } from 'rxjs';
import { FIRE_FUNCTIONS } from '@sol/angular/firebase/adapter';

@Injectable({
    providedIn: 'root',
})
export class FirebaseFunctionsService {
    private readonly fns = inject(FIRE_FUNCTIONS);

    public call<T>(
        resourcePath: string,
        request?: unknown
    ): Observable<Requested<T>> {
        const fn = this.fns.httpsCallable(resourcePath);
        return from(fn(request)).pipe(
            map(({ data }) => data as T),
            catchError(() => of(RequestState.Error)),
            startWith(RequestState.Loading)
        );
    }
}

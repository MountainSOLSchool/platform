import { inject, Injectable } from '@angular/core';
import {
    Requested,
    RequestedOperatorsUtility,
    RequestState,
} from '@sol/angular/request';
import { from, map, Observable, of, catchError, startWith } from 'rxjs';
import { Value } from 'firebase/remote-config';
import { FIRE_CONFIG_INSTANCE } from '@sol/angular/firebase/adapter';

@Injectable({
    providedIn: 'root',
})
export class FirebaseRemoteConfigService {
    private readonly configInstance = inject(FIRE_CONFIG_INSTANCE);

    public getValue(key: string): Observable<Requested<Value>> {
        return from(this.configInstance.fetchAndActivate()).pipe(
            map((value) => {
                console.log('fetchAndActivate', value);
                return this.configInstance.getValue(key);
            }),
            map((value) => value as Value),
            catchError(() => of(RequestState.Error)),
            startWith(RequestState.Loading)
        );
    }

    public getValueFn(key: string): Observable<Value> {
        return this.getValue(key).pipe(
            RequestedOperatorsUtility.ignoreAllStatesButLoaded()
        );
    }
}

import { filter, map, OperatorFunction, pipe } from 'rxjs';
import { Requested } from '../models/requested.type';
import { RequestedUtility } from './requested.utility';

export class RequestedOperatorsUtility {
    static ignoreAllStatesButLoaded<T>(): OperatorFunction<Requested<T>, T> {
        return pipe(filter(RequestedUtility.isLoaded));
    }
    static mapLoaded<T, R>(
        mapFn: (value: T) => R
    ): OperatorFunction<Requested<T>, Requested<R>> {
        return pipe(
            map((requested) => RequestedUtility.mapLoaded(requested, mapFn))
        );
    }
}

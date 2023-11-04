import { filter, OperatorFunction, pipe } from 'rxjs';
import { Requested } from '../models/requested.type';
import { RequestedUtility } from './requested.utility';

export class RequestedOperatorsUtility {
    static ignoreAllStatesButLoaded<T>(): OperatorFunction<Requested<T>, T> {
        return pipe(filter(RequestedUtility.isLoaded));
    }
}

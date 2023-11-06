import { Requested, RequestState } from '../models/requested.type';

export class RequestedUtility {
    static isLoaded<T>(state: Requested<T>): state is T {
        return !Object.values(RequestState).includes(state);
    }
    static hasAnyError<T>(states: Array<Requested<T>>): boolean {
        return states.includes(RequestState.Error);
    }
    static isEmpty<T>(state: Requested<T>): state is typeof RequestState.Empty {
        return state === RequestState.Empty;
    }
    static mapLoaded<T, U>(
        state: Requested<T>,
        map: (t: T) => U
    ): Requested<U> {
        return RequestedUtility.isLoaded(state)
            ? map(state)
            : (state as Requested<U>);
    }
}

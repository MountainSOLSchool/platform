import { Requested, RequestState } from '../models/requested.type';

export class RequestedUtility {
    static isLoaded<T>(state: Requested<T> | null | undefined): state is T {
        return !!state && !Object.values(RequestState).includes(state);
    }
    static hasAnyError<T>(
        states: Array<Requested<T> | null | undefined>
    ): boolean {
        return states.includes(RequestState.Error);
    }
    static isEmpty<T>(
        state: Requested<T> | null | undefined
    ): state is typeof RequestState.Empty {
        return state === RequestState.Empty;
    }
    static isError<T>(
        state: Requested<T> | null | undefined
    ): state is typeof RequestState.Error {
        return state === RequestState.Error;
    }
    static isComplete<T>(
        state: Requested<T> | null | undefined
    ): state is typeof RequestState.Error | T {
        return (
            RequestedUtility.isLoaded(state) || RequestedUtility.isError(state)
        );
    }
    static isNotComplete<T>(
        state: Requested<T> | null | undefined
    ): state is typeof RequestState.Loading | typeof RequestState.Empty {
        return !RequestedUtility.isComplete(state);
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

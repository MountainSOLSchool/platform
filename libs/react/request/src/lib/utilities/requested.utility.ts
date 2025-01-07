import { Requested, RequestState } from '../models/requested.type';

type UnwrapRequested<T> = T extends Requested<infer U> ? U : never;

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
    static areAllComplete<T extends Array<unknown>>(states: {
        [k in keyof T]: Requested<T[k]> | null | undefined;
    }): states is {
        [k in keyof T]: T[k];
    } {
        return states.every(RequestedUtility.isComplete);
    }
    static isNotComplete<T>(
        state: Requested<T> | null | undefined
    ): state is typeof RequestState.Loading | typeof RequestState.Empty {
        return !RequestedUtility.isComplete(state);
    }
    static isLoading<T>(
        state: Requested<T> | null | undefined
    ): state is typeof RequestState.Loading {
        return state === RequestState.Loading;
    }
    static mapLoaded<T, U>(
        state: Requested<T>,
        map: (t: T) => U
    ): Requested<U> {
        return RequestedUtility.isLoaded(state)
            ? map(state)
            : (state as Requested<U>);
    }
    static mapAllLoaded<T extends readonly unknown[], U>(
        states: readonly [...{ [K in keyof T]: Requested<T[K]> }],
        map: (...args: T) => U
    ): Requested<U> {
        const allLoaded = states.every((state) =>
            RequestedUtility.isLoaded(state)
        );

        if (allLoaded) {
            return map(...(states as T));
        }

        return states.find(
            (state) => !RequestedUtility.isLoaded(state)
        ) as Requested<U>;
    }
}

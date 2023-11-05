import { Requested, RequestState } from '../models/requested.type';

export class RequestedUtility {
    static isLoaded<T>(state: Requested<T>): state is T {
        return !Object.values(RequestState).includes(state);
    }
    static hasAnyError<T>(states: Array<Requested<T>>): boolean {
        return states.includes(RequestState.Error);
    }
}

export class RequestState {
    static Empty = class Empty {};
    static Loading = class Loading {};
    static Error = class Error {};
}

export type Requested<T> =
    | T
    | typeof RequestState.Empty
    | typeof RequestState.Loading
    | typeof RequestState.Error;

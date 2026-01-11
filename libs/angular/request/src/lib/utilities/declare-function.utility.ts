import { Observable } from 'rxjs';
import { RequestedOperatorsUtility } from './requested-operators.utility';
import { Requested } from '../models/requested.type';

/**
 * Creates a typed callable function for Firebase Cloud Functions.
 *
 * This utility provides type-safe function declarations that can be used
 * to call Firebase functions with proper request/response typing.
 *
 * @example
 * ```typescript
 * // In a service:
 * readonly createClass = declareFunction<CreateClassRequest, CreateClassResponse>(
 *     this.functions,
 *     'createClass'
 * );
 *
 * // Usage:
 * this.createClass({ name: 'Math 101', ... }).subscribe(response => {
 *     console.log(response.classId);
 * });
 * ```
 */
export function declareFunction<TReq, TRes>(
    functionsService: { call<T>(name: string, request?: unknown): Observable<Requested<T>> },
    name: string
): (request: TReq) => Observable<TRes> {
    return (request: TReq) =>
        functionsService
            .call<TRes>(name, request)
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded());
}

/**
 * Creates a typed callable function that returns the full Requested<T> state.
 * Use this when you need access to loading/error states.
 */
export function declareFunctionWithState<TReq, TRes>(
    functionsService: { call<T>(name: string, request?: unknown): Observable<Requested<T>> },
    name: string
): (request: TReq) => Observable<Requested<TRes>> {
    return (request: TReq) => functionsService.call<TRes>(name, request);
}

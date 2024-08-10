import {
    Observable,
    catchError,
    of,
    startWith,
    switchMap,
    take,
    tap,
} from 'rxjs';
import { RequestState, Requested } from '../models/requested.type';
import { requestActions } from '../store/request.actions';
import { v4 as uuidv4 } from 'uuid';
import { selectRequest } from '../store/request.feature';

export class UseRequest {
    declareRequest<T>(requestStreamFactory: () => Observable<T>) {
        const uid = uuidv4();
        return {
            getCachedAndLoadWhenEmptyOrFailed: (): Observable<Requested<T>> => {
                return this.store.select(selectRequest(uid)).pipe(
                    take(1),
                    switchMap((requested) => {
                        const statesRequiredToLoad: Array<Requested<unknown>> =
                            [RequestState.Empty, RequestState.Error];
                        if (statesRequiredToLoad.includes(requested)) {
                            this.trackRequest(uid, requestStreamFactory());
                        }
                        return this.store.select(
                            selectRequest(uid)
                        ) as Observable<Requested<T>>;
                    })
                );
            },
        };
    }

    private trackRequest<T>(uid: string, requestStream: Observable<T>): void {
        const requested = requestStream.pipe(
            catchError(() => of(RequestState.Error)),
            startWith(RequestState.Loading),
            tap((requested) =>
                this.store.dispatch(requestActions.changed({ uid, requested }))
            )
        );
        requested.subscribe();
    }
}

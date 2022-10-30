import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgModule } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import firebase from 'firebase/compat/app';
import {
    catchError,
    filter,
    from,
    map,
    Observable,
    of,
    switchMap,
    take,
    tap,
} from 'rxjs';
import { create as createDropIn, Dropin } from 'braintree-web-drop-in';
import { dataCollector, client } from 'braintree-web';
import {
    PreparedTransaction,
    UnpreparedTransaction,
} from '@sol/payments/transactions';
import { UserService } from '@sol/auth/user';

@Injectable({
    providedIn: 'root',
})
export class PaymentCollectorStore extends ComponentStore<{
    deviceData: string | undefined;
    token: string | undefined;
    uncommittedTransaction: PreparedTransaction | undefined;
    dropInInstance: Dropin | undefined;
}> {
    private readonly http = inject(HttpClient);
    private readonly functions = inject(FunctionsApi);
    private readonly user = inject(UserService);

    constructor() {
        super({
            deviceData: undefined,
            token: undefined,
            uncommittedTransaction: undefined,
            dropInInstance: undefined,
        });
    }

    readonly prepareTransaction = this.effect(
        (transaction$: Observable<UnpreparedTransaction>) => {
            return transaction$.pipe(
                switchMap((transaction) => {
                    return this.selectDropInInstance().pipe(
                        take(1),
                        switchMap((instance) =>
                            from(instance.requestPaymentMethod()).pipe(
                                tap((paymentMethod) => {
                                    console.log(paymentMethod);
                                    this.patchState({
                                        uncommittedTransaction: {
                                            nonce: paymentMethod.nonce,
                                            deviceData:
                                                paymentMethod.deviceData ?? '',
                                            ...transaction,
                                        },
                                    });
                                }),
                                catchError(() =>
                                    of(console.log('error caught'))
                                )
                            )
                        )
                    );
                })
            );
        }
    );

    readonly loadToken$ = this.effect(() => {
        return this.functions.call<string>('paymentToken').pipe(
            tap((token) => {
                console.log('got ', token);
                this.patchState({
                    token,
                });
            })
        );
    });

    readonly initialize = this.effect(
        (elementSelector$: Observable<string>) => {
            return elementSelector$.pipe(
                switchMap((elementSelector) => {
                    return this.select(({ token }) => token).pipe(
                        filter((token): token is string => !!token),
                        take(1),
                        map((token) => {
                            client.create(
                                {
                                    authorization: token,
                                },
                                (err, clientInstance) => {
                                    dataCollector.create(
                                        {
                                            client: clientInstance,
                                            kount: true,
                                        },
                                        (err, collector) => {
                                            this.patchState({
                                                deviceData:
                                                    collector?.deviceData,
                                            });
                                        }
                                    );
                                }
                            );
                            console.log('creating');
                            createDropIn(
                                {
                                    authorization: token,
                                    container: `#${elementSelector}`,
                                    dataCollector: {
                                        kount: true,
                                    },
                                },
                                (err, dropInInstance) => {
                                    if (err) {
                                        // Handle any errors that might've occurred when creating Drop-in
                                        console.error(err);
                                        return;
                                    }
                                    this.patchState({ dropInInstance });
                                }
                            );
                        })
                    );
                })
            );
        }
    );

    private selectDropInInstance() {
        return this.state$.pipe(
            map(({ dropInInstance }) => dropInInstance),
            filter((instance): instance is Dropin => !!instance)
        );
    }

    selectUncommittedTransaction(): Observable<PreparedTransaction> {
        return this.state$.pipe(
            map(({ uncommittedTransaction }) => uncommittedTransaction),
            filter(
                (transaction): transaction is PreparedTransaction =>
                    !!transaction
            )
        );
    }
}

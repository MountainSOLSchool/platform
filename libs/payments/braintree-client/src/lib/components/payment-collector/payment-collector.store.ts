import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
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
import {
    create as createDropIn,
    Dropin,
    PaymentMethodPayload,
} from 'braintree-web-drop-in';
import { dataCollector, client } from 'braintree-web';
import {
    PreparedTransaction,
    UnpreparedTransaction,
} from '@sol/payments/transactions';
import { UserService } from '@sol/auth/user';
import { PaymentService } from '../../services/payment.service';

@Injectable()
export class PaymentCollectorStore extends ComponentStore<{
    deviceData: string | undefined;
    token: string | undefined;
    dropInInstance: Dropin | undefined;
    nonce: string | undefined;
    paymentDetails: PaymentMethodPayload['details'] | undefined;
}> {
    private readonly http = inject(HttpClient);
    private readonly functions = inject(FunctionsApi);
    private readonly user = inject(UserService);
    private readonly paymentService = inject(PaymentService);

    constructor() {
        super({
            deviceData: undefined,
            token: undefined,
            dropInInstance: undefined,
            nonce: undefined,
            paymentDetails: undefined,
        });
    }

    readonly prepare = this.effect((prepare$) => {
        return prepare$.pipe(
            tap(() => console.log('preparing')),
            switchMap(() => {
                return this.selectDropInInstance().pipe(
                    take(1),
                    switchMap((instance) =>
                        from(instance.requestPaymentMethod()).pipe(
                            tap((paymentMethod) => {
                                this.patchState({
                                    nonce: paymentMethod.nonce,
                                    paymentDetails: paymentMethod.details,
                                });
                            }),
                            catchError((e) => of(console.error(e)))
                        )
                    )
                );
            })
        );
    });

    readonly loadToken$ = this.effect(() => {
        return this.paymentService.getToken().pipe(
            tap((token) => {
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
                            createDropIn(
                                {
                                    vaultManager: true,
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
                                    dropInInstance?.on(
                                        'paymentMethodRequestable',
                                        (event) => {
                                            console.log('requestable');
                                            this.prepare();
                                        }
                                    );
                                    dropInInstance?.on(
                                        'noPaymentMethodRequestable',
                                        () => {
                                            console.log('not requestable');
                                            this.patchState({
                                                nonce: undefined,
                                                paymentDetails: undefined,
                                            });
                                        }
                                    );
                                    dropInInstance?.clearSelectedPaymentMethod();
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

    selectPaymentMethod(): Observable<
        | {
              nonce: string;
              deviceData: string;
              paymentDetails: PaymentMethodPayload['details'];
          }
        | undefined
    > {
        return this.state$.pipe(
            map(({ nonce, deviceData, paymentDetails }) =>
                nonce && deviceData && paymentDetails
                    ? {
                          nonce,
                          deviceData,
                          paymentDetails,
                      }
                    : undefined
            )
        );
    }
}

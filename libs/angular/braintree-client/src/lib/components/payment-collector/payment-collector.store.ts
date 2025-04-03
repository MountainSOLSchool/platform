import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
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
    type cardPaymentMethodPayload,
    type Dropin,
    create as createDropIn,
} from 'braintree-web-drop-in';
import { dataCollector, client } from 'braintree-web';
import { UserService } from '@sol/auth/user';
import { PaymentService } from '../../services/payment.service';

@Injectable()
export class PaymentCollectorStore extends ComponentStore<{
    deviceData: string | undefined;
    token: string | undefined;
    dropInInstance: Dropin | undefined;
    nonce: string | undefined;
    paymentDetails: cardPaymentMethodPayload['details'] | undefined;
}> {
    private readonly http = inject(HttpClient);
    private readonly functions = inject(FirebaseFunctionsService);
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
            switchMap(() => {
                return this.selectDropInInstance().pipe(
                    take(1),
                    switchMap((instance) =>
                        from(instance.requestPaymentMethod()).pipe(
                            tap((paymentMethod) => {
                                const details = paymentMethod.details;
                                this.patchState({
                                    nonce: paymentMethod.nonce,
                                    paymentDetails:
                                        details as cardPaymentMethodPayload['details'],
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
                                        () => this.prepare()
                                    );
                                    dropInInstance?.on(
                                        'noPaymentMethodRequestable',
                                        () => {
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
    readonly resetDropInInstance = this.effect((trigger$) => {
        return trigger$.pipe(
            tap(() => this.get().dropInInstance?.clearSelectedPaymentMethod())
        );
    });

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
              paymentDetails: cardPaymentMethodPayload['details'];
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

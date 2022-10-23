import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgModule } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { filter, from, map, Observable, switchMap, take, tap } from 'rxjs';
import { create as createDropIn, Dropin } from 'braintree-web-drop-in';
import { dataCollector, client } from 'braintree-web';
import {
    QualifiedTransaction,
    UnqualifiedTransaction,
} from '@sol/payments/transactions';

@NgModule({
    imports: [FunctionsApi],
})
@Injectable()
export class PaymentCollectorStore extends ComponentStore<{
    deviceData: string | undefined;
    uncommittedTransaction: QualifiedTransaction | undefined;
    dropInInstance: Dropin | undefined;
}> {
    private readonly http = inject(HttpClient);
    private readonly functions = inject(FunctionsApi);

    constructor() {
        super({
            deviceData: undefined,
            uncommittedTransaction: undefined,
            dropInInstance: undefined,
        });
    }

    readonly prepareTransaction = this.effect(
        (transaction$: Observable<UnqualifiedTransaction>) => {
            return transaction$.pipe(
                switchMap((transaction) => {
                    return this.selectDropInInstance().pipe(
                        take(1),
                        switchMap((instance) =>
                            from(instance.requestPaymentMethod()).pipe(
                                switchMap((paymentMethod) => {
                                    this.patchState({
                                        uncommittedTransaction: {
                                            nonce: paymentMethod.nonce,
                                            deviceData:
                                                paymentMethod.deviceData ?? '',
                                            ...transaction,
                                        },
                                    });
                                    return this.functions.call('enroll', {
                                        ...transaction,
                                        nonce: paymentMethod.nonce,
                                        deviceData: paymentMethod.deviceData,
                                    });
                                })
                            )
                        )
                    );
                })
            );
        }
    );

    readonly initialize = this.effect(
        (elementSelector$: Observable<string>) => {
            return elementSelector$.pipe(
                switchMap((elementSelector) => {
                    return this.functions.call<string>('paymentToken').pipe(
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
                                    // instance?.requestPaymentMethod((err, payload) => {
                                    //     payload?.nonce;
                                    // });
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

    selectUncommittedTransaction(): Observable<QualifiedTransaction> {
        return this.state$.pipe(
            map(({ uncommittedTransaction }) => uncommittedTransaction),
            filter(
                (transaction): transaction is QualifiedTransaction =>
                    !!transaction
            )
        );
    }
}

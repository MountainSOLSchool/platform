import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable, NgModule } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { Observable, switchMap, take, tap } from 'rxjs';
import { PreparedTransaction } from '@sol/payments/transactions';
import { PaymentMethodPayload } from 'braintree-web-drop-in';

type Enrollment = {
    selectedClasses: Array<string>;
    paymentMethod:
        | {
              nonce: string;
              deviceData: string;
              paymentDetails: PaymentMethodPayload['details'];
          }
        | undefined;
    discountCodes: Array<string>;
};

@Injectable()
export class EnrollmentWorkflowStore extends ComponentStore<{
    enrollment: Enrollment;
}> {
    private readonly http = inject(HttpClient);
    private readonly functions = inject(FunctionsApi);

    constructor() {
        super({
            enrollment: {
                selectedClasses: [],
                paymentMethod: undefined,
                discountCodes: [],
            },
        });
    }

    private readonly _next$ = new EventEmitter();
    get nextClick$() {
        return this._next$.asObservable();
    }

    private readonly _ready$ = new EventEmitter();
    get readyForNext$() {
        return this._ready$.asObservable();
    }

    readonly nextClick = this.effect((next$: Observable<void>) => {
        return next$.pipe(
            tap(() => {
                this._next$.emit();
            })
        );
    });

    readonly completeStep = this.effect(
        (
            ready$: Observable<
                { [K in keyof Enrollment]?: Enrollment[K] } | void
            >
        ) => {
            return ready$.pipe(
                tap((enrollment) =>
                    enrollment
                        ? this.patchState((s) => ({
                              enrollment: { ...s.enrollment, ...enrollment },
                          }))
                        : undefined
                ),
                tap(() => this._ready$.emit(Math.random()))
            );
        }
    );

    readonly completeCheckout = this.effect(
        (transaction$: Observable<PreparedTransaction>) => {
            return transaction$.pipe(
                tap((transaction) =>
                    this.patchState((s) => ({
                        ...s,
                        transaction,
                    }))
                ),
                tap(() => this.completeStep())
            );
        }
    );

    readonly submit = this.effect((submit$) => {
        return submit$.pipe(
            tap(() => console.log('submitted')),
            switchMap(() => {
                return this.select(({ enrollment }) => enrollment).pipe(
                    take(1),
                    switchMap((enrollment) => {
                        return this.functions.call('enroll', enrollment).pipe(
                            tapResponse(
                                (reseponse) => {
                                    console.log(reseponse);
                                },
                                (error) => console.log(error)
                            )
                        );
                    })
                );
            })
        );
    });
}

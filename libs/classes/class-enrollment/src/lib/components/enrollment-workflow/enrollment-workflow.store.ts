import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable, NgModule } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { Observable, switchMap, take, tap } from 'rxjs';
import { PreparedTransaction } from '@sol/payments/transactions';

@Injectable()
export class EnrollmentWorkflowStore extends ComponentStore<{
    transaction: PreparedTransaction | undefined;
}> {
    private readonly http = inject(HttpClient);
    private readonly functions = inject(FunctionsApi);

    constructor() {
        super({
            transaction: undefined,
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

    readonly readyForNext = this.effect((ready$) => {
        return ready$.pipe(tap(() => this._ready$.emit(Math.random())));
    });

    readonly completeCheckout = this.effect(
        (transaction$: Observable<PreparedTransaction>) => {
            return transaction$.pipe(
                tap((transaction) =>
                    this.patchState((s) => ({
                        ...s,
                        transaction,
                    }))
                ),
                tap(() => this.readyForNext())
            );
        }
    );

    readonly submit = this.effect((submit$) => {
        return submit$.pipe(
            tap(() => console.log('submitted')),
            switchMap(() => {
                return this.select(({ transaction }) => transaction).pipe(
                    take(1),
                    switchMap((transaction) => {
                        return this.functions
                            .call('enroll', {
                                classIds: ['9fr11z6ODR8odaXX7d1D'],
                                couponCodes: ['CLASSFREETEST', 'AMOUNTTEST'],
                                transaction,
                            })
                            .pipe(
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

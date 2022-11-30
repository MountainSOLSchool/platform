import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { Observable, switchMap, take, tap } from 'rxjs';
import { PaymentMethodPayload } from 'braintree-web-drop-in';
import { Completeable } from '@sol/workflow';

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
export class EnrollmentWorkflowStore extends ComponentStore<Enrollment> {
    private readonly http = inject(HttpClient);
    private readonly functions = inject(FunctionsApi);

    constructor() {
        super({
            selectedClasses: [],
            paymentMethod: undefined,
            discountCodes: [],
        });
    }

    private readonly _next$ = new EventEmitter<Completeable>();
    get nextClick$() {
        return this._next$.asObservable();
    }

    private readonly _ready$ = new EventEmitter();
    get readyForNext$() {
        return this._ready$.asObservable();
    }

    readonly nextClick = this.effect((next$: Observable<Completeable>) => {
        return next$.pipe(
            tap((completeable) => {
                this._next$.emit(completeable);
            })
        );
    });

    readonly submit = this.effect((submit$) => {
        return submit$.pipe(
            tap(() => console.log('submitted')),
            switchMap(() => {
                return this.select((enrollment) => enrollment).pipe(
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

    readonly selectEnrollment = this.select((enrollment) => enrollment);
}

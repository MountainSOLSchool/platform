import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { fromEvent, switchMap, take, tap } from 'rxjs';
import { PaymentMethodPayload } from 'braintree-web-drop-in';
import { StudentForm } from '@sol/student/domain';

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
    student: Partial<StudentForm> | undefined;
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
            student: {
                guardians: [
                    {
                        guardianName: '',
                        guardianEmail: '',
                        guardianPhone: '',
                        guardianRelationship: '',
                        guardianResidesWithStudent: false,
                    },
                ],
                emergencyContacts: [
                    {
                        name: '',
                        relationship: '',
                        phone: '',
                    },
                    {
                        name: '',
                        relationship: '',
                        phone: '',
                    },
                ],
            },
        });
    }

    private readonly _ready$ = new EventEmitter();
    get readyForNext$() {
        return this._ready$.asObservable();
    }

    readonly submit = this.effect((submit$) => {
        return submit$.pipe(
            switchMap(() => {
                return this.select((enrollment) => enrollment).pipe(
                    take(1),
                    switchMap((enrollment) => {
                        return this.functions.call('enroll', enrollment).pipe(
                            tapResponse(
                                (response) => {
                                    console.log(response);
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

    readonly warnBeforeUnload = this.effect(() => {
        return fromEvent(window, 'beforeunload').pipe(
            tap((event: BeforeUnloadEvent) => {
                event.returnValue = '';
            })
        );
    });
}

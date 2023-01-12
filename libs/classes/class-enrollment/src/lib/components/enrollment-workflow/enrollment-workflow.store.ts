import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import {
    BehaviorSubject,
    fromEvent,
    Subject,
    switchMap,
    take,
    tap,
} from 'rxjs';
import { cardPaymentMethodPayload } from 'braintree-web-drop-in';
import { StudentForm } from '@sol/student/domain';
import { Router } from '@angular/router';

type Enrollment = {
    selectedClasses: Array<string>;
    paymentMethod:
        | {
              nonce: string;
              deviceData: string;
              paymentDetails: cardPaymentMethodPayload['details'];
          }
        | undefined;
    discountCodes: Array<string>;
    student: Partial<StudentForm> | undefined;
};

const initialState = {
    status: 'draft' as const,
    paymentSessionToken: self.crypto.randomUUID(),
    enrollment: {
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
    },
};

@Injectable()
export class EnrollmentWorkflowStore extends ComponentStore<{
    enrollment: Enrollment;
    paymentSessionToken: string;
    status: 'draft' | 'submitted' | 'failed' | 'enrolled';
}> {
    private readonly http = inject(HttpClient);
    private readonly functions = inject(FunctionsApi);
    private readonly router = inject(Router);

    constructor() {
        super(initialState);
    }

    private readonly _ready$ = new Subject();
    get readyForNext$() {
        return this._ready$.asObservable();
    }

    get submitting$() {
        return this.select((state) => state.status === 'submitted');
    }

    readonly submit = this.effect((submit$) => {
        return submit$.pipe(
            tap(() => this.patchState({ status: 'submitted' })),
            switchMap(() => {
                return this.select((enrollment) => enrollment).pipe(
                    take(1),
                    switchMap(({ enrollment }) => {
                        return this.functions
                            .call<{ email: string; success: boolean }>(
                                'enroll',
                                enrollment
                            )
                            .pipe(
                                tapResponse(
                                    (response) => {
                                        console.log(response);
                                        if (response.success) {
                                            this.patchState({
                                                status: 'enrolled',
                                            });
                                        } else {
                                            this.patchState({
                                                status: 'failed',
                                            });
                                        }
                                    },
                                    (error) => {
                                        console.log(error);
                                        this.patchState({
                                            status: 'failed',
                                        });
                                    }
                                )
                            );
                    })
                );
            })
        );
    });

    readonly selectEnrollment = this.select((enrollment) => enrollment);

    readonly startOver = this.effect((trigger$) => {
        return trigger$.pipe(
            tap(() => {
                this.setState({
                    ...initialState,
                    paymentSessionToken: self.crypto.randomUUID(),
                });
                this.router.navigate(['/']);
            })
        );
    });
}

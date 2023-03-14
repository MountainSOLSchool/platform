import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import {
    filter,
    map,
    pairwise,
    startWith,
    Subject,
    switchMap,
    take,
    tap,
} from 'rxjs';
import { cardPaymentMethodPayload } from 'braintree-web-drop-in';
import { StudentForm } from '@sol/student/domain';
import { Router } from '@angular/router';

type Enrollment = {
    selectedClassGroups: Array<string>;
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
    isSignedUpForSolsticeEmails: boolean;
};

const initialState = {
    status: 'draft' as const,
    randomValueThatResetsPaymentCollector: Math.random().toString(),
    enrollment: {
        selectedClassGroups: [],
        selectedClasses: [],
        paymentMethod: undefined,
        discountCodes: [],
        isSignedUpForSolsticeEmails: false,
        student: {
            birthdate: '',
            guardians: [
                {
                    guardianName: '',
                    guardianEmail: '',
                    guardianPhone: '',
                    guardianRelationship: '',
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
    basketCosts: {
        discountAmounts: [],
        finalTotal: 0,
        originalTotal: 0,
    },
    isLoadingDiscounts: false,
};

@Injectable()
export class EnrollmentWorkflowStore extends ComponentStore<{
    enrollment: Enrollment;
    randomValueThatResetsPaymentCollector: string;
    status: 'draft' | 'submitted' | 'failed' | 'enrolled';
    basketCosts: {
        discountAmounts: Array<{ code: string; amount: number }>;
        finalTotal: number;
        originalTotal: number;
    };
    isLoadingDiscounts: boolean;
}> {
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

    get failed$() {
        return this.select((state) => state.status === 'failed');
    }

    readonly setStatusToDraft = this.updater((state) => ({
        ...state,
        status: 'draft',
    }));

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

    readonly calculateBasket = this.effect(() => {
        return this.selectBasketCostRequest().pipe(
            pairwise(),
            filter(
                ([prev, next]) => JSON.stringify(prev) !== JSON.stringify(next)
            ),
            switchMap(([, { codes, classIds, classGroupIds }]) => {
                this.patchState({ isLoadingDiscounts: true });
                return this.functions
                    .call<{
                        discountAmounts: Array<{
                            code: string;
                            amount: number;
                        }>;
                        finalTotal: number;
                        originalTotal: number;
                    }>('calculateBasket', { codes, classIds, classGroupIds })
                    .pipe(
                        tap((basketCosts) => {
                            this.patchState(() => ({
                                basketCosts,
                                isLoadingDiscounts: false,
                            }));
                        })
                    );
            })
        );
    });

    readonly startOver = this.effect((trigger$) => {
        return trigger$.pipe(
            tap(() => {
                this.setState({
                    ...initialState,
                    randomValueThatResetsPaymentCollector:
                        Math.random().toString(),
                });
                this.router.navigate(['/']);
            })
        );
    });

    private selectBasketCostRequest() {
        return this.select((state) => ({
            codes: state.enrollment.discountCodes,
            classIds: state.enrollment.selectedClasses,
            classGroupIds: state.enrollment.selectedClassGroups,
        }));
    }
}

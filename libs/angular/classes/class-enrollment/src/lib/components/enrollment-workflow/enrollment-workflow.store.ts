import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { filter, pairwise, Subject, switchMap, take, tap } from 'rxjs';
import { cardPaymentMethodPayload } from 'braintree-web-drop-in';
import { StudentForm } from '@sol/student/domain';
import { Router } from '@angular/router';
import { createSelector } from '@ngrx/store';

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
    releaseSignatures: Array<{ name: string; signature: string }>;
    isStudentNew: boolean | undefined;
    isSignedUpForSolsticeEmails: boolean;
};

const initialState = {
    status: 'draft' as const,
    randomValueThatResetsPaymentCollector: Math.random().toString(),
    enrollment: {
        selectedClasses: [],
        paymentMethod: undefined,
        discountCodes: [],
        isSignedUpForSolsticeEmails: false,
        isStudentNew: undefined,
        releaseSignatures: [],
        student: {
            id: undefined,
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
    isLoadingStudent: false,
};

type State = {
    enrollment: Enrollment;
    randomValueThatResetsPaymentCollector: string;
    status: 'draft' | 'submitted' | 'failed' | 'enrolled';
    basketCosts: {
        discountAmounts: Array<{ code: string; amount: number }>;
        finalTotal: number;
        originalTotal: number;
    };
    isLoadingDiscounts: boolean;
    isLoadingStudent: boolean;
};

@Injectable()
export class EnrollmentWorkflowStore extends ComponentStore<State> {
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

    private readonly selectState = createSelector(
        (state: State) => state,
        (state) => state
    );
    private readonly selectEnrollment = createSelector(
        this.selectState,
        (state) => state.enrollment
    );
    private readonly selectStudent = createSelector(
        this.selectEnrollment,
        (enrollment) => enrollment.student
    );
    private readonly selectStudentId = createSelector(
        this.selectStudent,
        (student) => student?.id
    );

    readonly setStatusToDraft = this.updater((state) => ({
        ...state,
        status: 'draft',
    }));

    readonly loadStudent = this.effect(() => {
        return this.select(this.selectStudentId).pipe(
            filter(Boolean),
            tap(() => this.patchState({ isLoadingStudent: true })),
            switchMap((id) =>
                this.functions
                    .call<{ student: StudentForm }>('getMyStudent', {
                        studentId: id,
                    })
                    .pipe(
                        tapResponse(
                            ({ student }) => {
                                this.patchState((state) => ({
                                    isLoadingStudent: false,
                                    enrollment: {
                                        ...state.enrollment,
                                        student,
                                    },
                                }));
                            },
                            () => {
                                this.patchState({ isLoadingStudent: false });
                            }
                        )
                    )
            )
        );
    });

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
                                    () => {
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
            switchMap(([, { codes, classIds }]) => {
                this.patchState({ isLoadingDiscounts: true });
                return this.functions
                    .call<{
                        discountAmounts: Array<{
                            code: string;
                            amount: number;
                        }>;
                        finalTotal: number;
                        originalTotal: number;
                    }>('calculateBasket', { codes, classIds })
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

    readonly startOverEnrollment = this.effect((trigger$) => {
        return trigger$.pipe(
            tap(() => {
                this.patchState((state) => ({
                    enrollment: {
                        ...initialState.enrollment,
                        selectedClasses: state.enrollment.selectedClasses,
                    },
                }));
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
        }));
    }
}

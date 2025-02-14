import { computed, inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import {
    debounceTime,
    filter,
    pairwise,
    Subject,
    switchMap,
    take,
    tap,
} from 'rxjs';
import { cardPaymentMethodPayload } from 'braintree-web-drop-in';
import { Enrollment, StudentForm } from '@sol/student/domain';
import { Router } from '@angular/router';
import { createSelector } from '@ngrx/store';
import {
    RequestedOperatorsUtility,
    RequestedUtility,
} from '@sol/angular/request';

type PaidEnrollment = Enrollment & {
    paymentMethod:
        | {
              nonce: string;
              deviceData: string;
              paymentDetails: cardPaymentMethodPayload['details'];
          }
        | undefined;
};

type State = {
    enrollment: PaidEnrollment;
    randomValueThatResetsPaymentCollector: string;
    status: 'draft' | 'submitted' | 'failed' | 'enrolled';
    basketCosts: {
        discountAmounts: Array<{ code: string; amount: number }>;
        finalTotal: number;
        originalTotal: number;
    };
    isLoadingDiscounts: boolean;
    isLoadingStudent: boolean;
    isMedicalInfoOutOfDate: boolean;
    draftEnrollment: Partial<Enrollment> | undefined;
};

const initialState: State = {
    status: 'draft' as const,
    randomValueThatResetsPaymentCollector: Math.random().toString(),
    draftEnrollment: undefined,
    isMedicalInfoOutOfDate: false,
    enrollment: {
        selectedClasses: [],
        userCostsToSelectedClassIds: {},
        additionalOptionIdsByClassId: {},
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

@Injectable()
export class EnrollmentWorkflowStore extends ComponentStore<State> {
    private readonly functions = inject(FirebaseFunctionsService);
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
    private readonly selectDiscountCodes = createSelector(
        this.selectEnrollment,
        (enrollment) => enrollment.discountCodes
    );
    private readonly selectSelectedClasses = createSelector(
        this.selectEnrollment,
        (enrollment) => enrollment.selectedClasses
    );
    private readonly selectUserCostsToSelectedClassIds = createSelector(
        this.selectEnrollment,
        (enrollment) => enrollment.userCostsToSelectedClassIds
    );
    private readonly selectAdditionalOptionIdsByClassId = createSelector(
        this.selectEnrollment,
        (enrollment) => enrollment.additionalOptionIdsByClassId
    );
    private readonly selectBasktCostRequest = createSelector(
        this.selectDiscountCodes,
        this.selectSelectedClasses,
        this.selectUserCostsToSelectedClassIds,
        this.selectAdditionalOptionIdsByClassId,
        (
            codes,
            classes,
            userCostsToClassIds,
            selectedAdditionalOptionIdsByClassId
        ) => ({
            codes,
            classes: classes.map(({ id, semesterId }) => ({
                id,
                semesterId,
                additionalOptionIds:
                    selectedAdditionalOptionIdsByClassId[id] ?? [],
            })),
            userCostsToClassIds,
        })
    );
    readonly isStudentLoading = computed(() => this.state().isLoadingStudent);

    readonly setStatusToDraft = this.updater((state) => ({
        ...state,
        status: 'draft',
    }));

    readonly loadDraft = this.effect(() => {
        return this.functions
            .call<{
                draft: Partial<Enrollment> | undefined;
            }>('loadEnrollmentDraft')
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                tap(
                    ({ draft }) =>
                        draft &&
                        Object.entries(draft).forEach(([key, value]) => {
                            if (value !== undefined) {
                                this.patchState((state) => ({
                                    ...state,
                                    draftEnrollment: draft,
                                    enrollment: {
                                        ...state.enrollment,
                                        [key]: value,
                                    },
                                }));
                            }
                        })
                )
            );
    });

    readonly saveDraft = this.effect(() => {
        return this.select((state) => state.enrollment).pipe(
            debounceTime(500),
            filter((enrollment) => enrollment !== initialState.enrollment),
            tap((enrollmentPatch) =>
                this.functions.call<{
                    enrollmentPatch: Partial<PaidEnrollment>;
                }>('updateEnrollmentDraft', enrollmentPatch)
            )
        );
    });

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
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
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
                            .call<{
                                email: string;
                                success: boolean;
                            }>('enroll', enrollment)
                            .pipe(
                                tap((response) => {
                                    if (RequestedUtility.isLoaded(response)) {
                                        if (response.success) {
                                            this.patchState({
                                                status: 'enrolled',
                                            });
                                        } else {
                                            this.patchState({
                                                status: 'failed',
                                            });
                                        }
                                    } else if (
                                        RequestedUtility.isError(response)
                                    ) {
                                        this.patchState({
                                            status: 'failed',
                                        });
                                    }
                                })
                            );
                    })
                );
            })
        );
    });

    readonly getIsMedicalInfoOutOfDate = this.effect(() => {
        return this.select(this.selectStudent).pipe(
            filter((student) => !!student?.id),
            switchMap((student) => {
                return this.functions
                    .call<{ isOutOfDate: boolean }>('isMedicalInfoOutOfDate', {
                        student,
                    })
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        tap(({ isOutOfDate }) => {
                            this.patchState({
                                isMedicalInfoOutOfDate: isOutOfDate,
                            });
                        })
                    );
            })
        );
    });

    readonly calculateBasket = this.effect(() => {
        return this.select(this.selectBasktCostRequest).pipe(
            pairwise(),
            filter((request) => Object.values(request).every(Boolean)),
            filter(
                ([prev, next]) => JSON.stringify(prev) !== JSON.stringify(next)
            ),
            switchMap(([, { codes, classes, userCostsToClassIds }]) => {
                this.patchState({ isLoadingDiscounts: true });
                return this.functions
                    .call<{
                        discountAmounts: Array<{
                            code: string;
                            amount: number;
                        }>;
                        finalTotal: number;
                        originalTotal: number;
                    }>('calculateBasket', {
                        codes,
                        classes,
                        userCostsToClassIds,
                    })
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
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
            }),
            tap(() => this.functions.call('deleteEnrollmentDraft'))
        );
    });
}

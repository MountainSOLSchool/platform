import { computed, inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import {
    debounceTime,
    filter,
    map,
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
import { UserService } from '@sol/auth/user';

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
    doesStudentInfoRequireReview: boolean;
    hasAcknowledgedOutOfDate: boolean;
    accuracyConfirmations: { [item: string]: boolean };
    draftEnrollment: Partial<Enrollment> | undefined;
    // Addendum mode
    addendumMode: boolean;
    originalEnrollmentId: string | undefined;
    lockedClassIds: Array<string>;
    lockedAdditionalOptionIdsByClassId: Record<string, Array<string>>;
    addendumLoading: boolean;
    addendumError: string | undefined;
};

const initialState: State = {
    status: 'draft' as const,
    randomValueThatResetsPaymentCollector: Math.random().toString(),
    draftEnrollment: undefined,
    doesStudentInfoRequireReview: false,
    hasAcknowledgedOutOfDate: false,
    accuracyConfirmations: {},
    addendumMode: false,
    originalEnrollmentId: undefined,
    lockedClassIds: [],
    lockedAdditionalOptionIdsByClassId: {},
    addendumLoading: false,
    addendumError: undefined,
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
    private readonly isLoggedIn$ = inject(UserService).isLoggedIn();

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
    private readonly selectAddendumState = createSelector(
        this.selectState,
        (state) => ({
            addendumMode: state.addendumMode,
            lockedClassIds: state.lockedClassIds,
            lockedAdditionalOptionIdsByClassId: state.lockedAdditionalOptionIdsByClassId,
        })
    );
    private readonly selectBasktCostRequest = createSelector(
        this.selectDiscountCodes,
        this.selectSelectedClasses,
        this.selectUserCostsToSelectedClassIds,
        this.selectAdditionalOptionIdsByClassId,
        this.selectAddendumState,
        (
            codes,
            classes,
            userCostsToClassIds,
            selectedAdditionalOptionIdsByClassId,
            addendum
        ) => {
            if (!addendum.addendumMode) {
                return {
                    codes,
                    classes: classes.map(({ id, semesterId }) => ({
                        id,
                        semesterId,
                        additionalOptionIds:
                            selectedAdditionalOptionIdsByClassId[id] ?? [],
                    })),
                    userCostsToClassIds,
                    overrideCosts: undefined as Record<string, number> | undefined,
                };
            }
            // In addendum mode, include new classes + locked classes that have new options
            const pricingClasses: Array<{
                id: string;
                semesterId: string;
                additionalOptionIds: Array<string>;
            }> = [];
            const newUserCosts: Record<string, number | undefined> = {};
            const overrideCosts: Record<string, number> = {};

            for (const c of classes) {
                const isLocked = addendum.lockedClassIds.includes(c.id);
                const allOptionIds = selectedAdditionalOptionIdsByClassId[c.id] ?? [];
                const lockedOptionIds = addendum.lockedAdditionalOptionIdsByClassId[c.id] ?? [];
                const newOptionIds = allOptionIds.filter(
                    (id) => !lockedOptionIds.includes(id)
                );

                if (!isLocked) {
                    pricingClasses.push({
                        id: c.id,
                        semesterId: c.semesterId,
                        additionalOptionIds: allOptionIds,
                    });
                    newUserCosts[c.id] = userCostsToClassIds[c.id];
                } else if (newOptionIds.length > 0) {
                    // Locked class with new options — zero the class cost, only price new options
                    pricingClasses.push({
                        id: c.id,
                        semesterId: c.semesterId,
                        additionalOptionIds: newOptionIds,
                    });
                    overrideCosts[c.id] = 0;
                }
            }

            return {
                codes,
                classes: pricingClasses,
                userCostsToClassIds: newUserCosts,
                overrideCosts,
            };
        }
    );
    readonly isStudentLoading = computed(() => this.state().isLoadingStudent);
    readonly isAddendumMode = computed(() => this.state().addendumMode);
    readonly addendumLoading = computed(() => this.state().addendumLoading);
    readonly addendumError = computed(() => this.state().addendumError);
    readonly lockedClassIds = computed(() => this.state().lockedClassIds);
    readonly lockedAdditionalOptionIdsByClassId = computed(
        () => this.state().lockedAdditionalOptionIdsByClassId
    );

    readonly setStatusToDraft = this.updater((state) => ({
        ...state,
        status: 'draft',
    }));

    readonly loadDraft = this.effect(() => {
        return this.isLoggedIn$.pipe(
            filter(Boolean),
            filter(() => !this.state().addendumMode),
            switchMap(() =>
                this.functions
                    .call<{
                        draft: Partial<Enrollment> | undefined;
                    }>('loadEnrollmentDraft')
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        tap(
                            ({ draft }) =>
                                draft &&
                                Object.entries(draft).forEach(
                                    ([key, value]) => {
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
                                    }
                                )
                        )
                    )
            )
        );
    });

    readonly saveDraft = this.effect(() => {
        return this.select((state) => state).pipe(
            filter((state) => !state.addendumMode),
            map((state) => state.enrollment),
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
                        tapResponse({
                            next: ({ student }) => {
                                this.patchState((state) => ({
                                    isLoadingStudent: false,
                                    enrollment: {
                                        ...state.enrollment,
                                        student,
                                    },
                                }));
                            },
                            error: () => {
                                this.patchState({ isLoadingStudent: false });
                            },
                        })
                    )
            )
        );
    });

    readonly submit = this.effect((submit$) => {
        return submit$.pipe(
            tap(() => this.patchState({ status: 'submitted' })),
            switchMap(() => {
                return this.select((s) => s).pipe(
                    take(1),
                    switchMap((state) => {
                        const {
                            enrollment,
                            doesStudentInfoRequireReview,
                            accuracyConfirmations,
                            addendumMode,
                            originalEnrollmentId,
                            lockedClassIds,
                            lockedAdditionalOptionIdsByClassId,
                        } = state;

                        if (addendumMode && originalEnrollmentId) {
                            // Addendum submission
                            const newClasses = enrollment.selectedClasses
                                .filter((c) => !lockedClassIds.includes(c.id));
                            const newAdditionalOptionIdsByClassId: Record<string, Array<string>> = {};
                            for (const [classId, optionIds] of Object.entries(
                                enrollment.additionalOptionIdsByClassId
                            )) {
                                const locked = lockedAdditionalOptionIdsByClassId[classId] ?? [];
                                const newOpts = (optionIds ?? []).filter(
                                    (id) => !locked.includes(id)
                                );
                                if (newOpts.length > 0) {
                                    newAdditionalOptionIdsByClassId[classId] = newOpts;
                                }
                            }
                            return this.functions
                                .call<{ email: string; success: boolean }>(
                                    'enrollAddendum',
                                    {
                                        originalEnrollmentId,
                                        newClasses,
                                        student: enrollment.student,
                                        discountCodes: enrollment.discountCodes,
                                        paymentMethod: enrollment.paymentMethod,
                                        userCostsToSelectedClassIds:
                                            enrollment.userCostsToSelectedClassIds,
                                        newAdditionalOptionIdsByClassId,
                                    }
                                )
                                .pipe(
                                    tap((response) => {
                                        if (RequestedUtility.isLoaded(response)) {
                                            this.patchState({
                                                status: response.success
                                                    ? 'enrolled'
                                                    : 'failed',
                                            });
                                        } else if (RequestedUtility.isError(response)) {
                                            this.patchState({ status: 'failed' });
                                        }
                                    })
                                );
                        }

                        // Normal enrollment submission
                        return this.functions
                            .call<{
                                email: string;
                                success: boolean;
                            }>(
                                'enroll',
                                Object.assign(
                                    ...[
                                        {},
                                        enrollment,
                                        ...(doesStudentInfoRequireReview
                                            ? [
                                                  {
                                                      hasConfirmedAccuracy:
                                                          Object.values(
                                                              accuracyConfirmations
                                                          ).length > 0 &&
                                                          Object.values(
                                                              accuracyConfirmations
                                                          ).every(Boolean),
                                                  },
                                              ]
                                            : []),
                                    ]
                                )
                            )
                            .pipe(
                                tap((response) => {
                                    if (
                                        RequestedUtility.isLoaded(response)
                                    ) {
                                        this.patchState({
                                            status: response.success
                                                ? 'enrolled'
                                                : 'failed',
                                        });
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

    readonly getDoesStudentInfoRequireReview = this.effect(() => {
        return this.select(this.selectStudentId).pipe(
            filter(Boolean),
            filter(() => !this.state().addendumMode),
            switchMap((studentId) => {
                return this.functions
                    .call<{ isOutOfDate: boolean }>(
                        'doesStudentInfoRequireReview',
                        {
                            studentId,
                        }
                    )
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        tap(({ isOutOfDate }) => {
                            this.patchState({
                                doesStudentInfoRequireReview: isOutOfDate,
                            });
                        })
                    );
            })
        );
    });

    readonly initAddendum = this.effect<string>((enrollmentId$) => {
        return enrollmentId$.pipe(
            tap(() =>
                this.patchState({
                    addendumMode: true,
                    addendumLoading: true,
                    addendumError: undefined,
                })
            ),
            tap(() => this.functions.call('deleteEnrollmentDraft')),
            switchMap((enrollmentId) =>
                this.functions
                    .call<{
                        enrollment: {
                            id: string;
                            studentId: string;
                            studentName: string;
                            classes: Array<{ id: string; semesterId: string }>;
                            additionalOptionIdsByClassId: Record<string, Array<string>>;
                            openSemesterIds: Array<string>;
                        };
                    }>('getEnrollmentForAddendum', { enrollmentId })
                    .pipe(
                        RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                        tap(({ enrollment: orig }) => {
                            this.patchState((state) => ({
                                originalEnrollmentId: orig.id,
                                lockedClassIds: orig.classes.map((c) => c.id),
                                lockedAdditionalOptionIdsByClassId:
                                    orig.additionalOptionIdsByClassId,
                                addendumLoading: false,
                                enrollment: {
                                    ...state.enrollment,
                                    selectedClasses: orig.classes,
                                    additionalOptionIdsByClassId:
                                        orig.additionalOptionIdsByClassId,
                                    student: {
                                        ...state.enrollment.student,
                                        id: orig.studentId,
                                    },
                                    isStudentNew: false,
                                },
                            }));
                        })
                    )
            )
        );
    });

    readonly calculateBasket = this.effect(() => {
        return this.select(this.selectBasktCostRequest).pipe(
            pairwise(),
            filter((request) => Object.values(request).every(Boolean)),
            filter(
                ([prev, next]) => JSON.stringify(prev) !== JSON.stringify(next)
            ),
            switchMap(([, { codes, classes, userCostsToClassIds, overrideCosts }]) => {
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
                        ...(overrideCosts && Object.keys(overrideCosts).length > 0
                            ? { overrideCosts }
                            : {}),
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
                const wasAddendum = this.state().addendumMode;
                this.setState({
                    ...initialState,
                    randomValueThatResetsPaymentCollector:
                        Math.random().toString(),
                });
                this.router.navigate(
                    wasAddendum ? ['/account/enrollments'] : ['/']
                );
            }),
            tap(() => this.functions.call('deleteEnrollmentDraft'))
        );
    });
}

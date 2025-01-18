import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    viewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnrollmentWorkflowStore } from './enrollment-workflow.store';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { provideComponentStore } from '@ngrx/component-store';
import { MatStep, MatStepperModule } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, map, of, shareReplay, take, timer } from 'rxjs';
import { ClassesComponent } from '../classes/class-list/class-list.component';
import { InfoComponent } from '../info/info.component';
import { AccountComponent } from '../account/account.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {
    CdkStepper,
    CdkStepperModule,
    STEPPER_GLOBAL_OPTIONS,
} from '@angular/cdk/stepper';
import { MedicalComponent } from '../medical/medical.component';
import { RxLet } from '@rx-angular/template/let';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { EventsComponent } from '../events/events.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { RxIf } from '@rx-angular/template/if';
import { MatVerticalStepperScrollerDirective } from './vertical-steps.directive';
import { SelectStudentComponent } from '../select-student/select-student.component';
import { ReleasesComponent } from '../releases/releases.component';
import { UserService } from '@sol/auth/user';
import { Dialog } from '@angular/cdk/dialog';
import { StartOverDialogComponent } from '../start-over-dialog/start-over-dialog.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideComponentStore(EnrollmentWorkflowStore),
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true },
        },
    ],
    templateUrl: './enrollment-workflow.component.html',
    imports: [
        AsyncPipe,
        NgTemplateOutlet,
        RouterModule,
        StepsModule,
        CdkStepperModule,
        ButtonModule,
        MatStepperModule,
        ClassesComponent,
        InfoComponent,
        AccountComponent,
        CheckoutComponent,
        ConfirmationComponent,
        MedicalComponent,
        RxLet,
        ProgressSpinnerModule,
        DialogModule,
        EventsComponent,
        MessagesModule,
        MessageModule,
        ToastModule,
        RxIf,
        MatVerticalStepperScrollerDirective,
        SelectStudentComponent,
        ReleasesComponent,
    ],
    styles: [
        `
            ::ng-deep .mat-vertical-stepper-content {
                overflow: unset !important;
            }
            ::ng-deep .mat-horizontal-content-container {
                overflow: unset !important;
            }
            :host ::ng-deep .p-message-early-bird {
                background-color: #ffff99;
                border: solid #ffcc00;
                border-width: 0 0 0 6px;
                color: black;
            }
            :host ::ng-deep .mat-vertical-content-container {
                margin-left: -5px;
            }
            :host ::ng-deep .mat-stepper-vertical-line::before {
                border: none;
            }
        `,
    ],
})
export class ClassEnrollmentComponent {
    private readonly store = inject(EnrollmentWorkflowStore);

    private readonly user$ = inject(UserService).getUser().pipe(shareReplay());

    readonly isUserLoggedIn$ = this.user$.pipe(map((user) => !!user));

    readonly userEmail$ = this.user$.pipe(
        map((user) => user?.email),
        filter((email): email is string => !!email)
    );

    readonly isStudentLoading = this.store.isStudentLoading;

    readonly earlyBirdEnd = Date.parse('2023-04-01T23:59:59.999Z');

    readonly isNowBeforeEarlyBirdEnd$ = timer(0, 5000).pipe(
        map(() => Date.now() < this.earlyBirdEnd)
    );

    readonly stepperOrientation = inject(BreakpointObserver)
        .observe('(min-width: 800px)')
        .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    readonly showSecretAutofill$ = of(false);

    readonly steps = [
        { label: 'Class Selection', routerLink: 'classes' },
        { label: 'Student Info', routerLink: 'info' },
        { label: 'Medical Info', routerLink: 'medical' },
        { label: 'Account', routerLink: 'account' },
        { label: 'Payment Method', routerLink: 'checkout' },
        {
            label: 'Confirm Enrollment',
            routerLink: 'confirmation',
        },
    ];

    readonly didLoadFromDraft = computed(
        () => !!this.store.state().draftEnrollment
    );

    readonly isSubmitting$ = this.store.submitting$;
    readonly failureDialogState$ = this.store.failed$.pipe(
        map(
            (failed) =>
                new Proxy(
                    { visible: failed },
                    {
                        set: (target, prop, newValue) => {
                            prop === 'visible' && newValue === false
                                ? this.store.setStatusToDraft()
                                : undefined;
                            return Reflect.set(target, prop, newValue);
                        },
                    }
                )
        )
    );

    readonly shouldShowSuccess$ = this.store.select(
        (s) => s.status === 'enrolled'
    );

    readonly enrollment$ = this.store.select((s) => s.enrollment);
    readonly randomValueThatResetsPaymentCollector$ = this.store.select(
        (s) => s.randomValueThatResetsPaymentCollector
    );

    complete() {
        this.store.submit();
    }

    next(stepper: CdkStepper) {
        stepper.next();
    }

    allStepsComplete(
        isUserLoggedIn: boolean,
        ...steps: Array<MatStep>
    ): boolean {
        return (
            isUserLoggedIn && steps.every((step) => this.isStepComplete(step))
        );
    }

    private isStepComplete(step: MatStep) {
        const hasStepValidationBeenRun = step.hasError !== undefined;
        const isStepValid = hasStepValidationBeenRun && !step.hasError;
        const labelsOStepsNotRequiringInteraction = ['Confirm Enrollment'];
        const hasStepRequiringInteractionBeenInteractedWith =
            step.interacted ||
            labelsOStepsNotRequiringInteraction.includes(step.label);
        return isStepValid && hasStepRequiringInteractionBeenInteractedWith;
    }

    fillOutForTest() {
        this.store.patchState({
            enrollment: {
                selectedClasses: [],
                userCostsToSelectedClassIds: {},
                additionalOptionIdsByClassId: {},
                isSignedUpForSolsticeEmails: false,
                paymentMethod: {
                    nonce: 'fake-valid-nonce-NOT',
                    deviceData: '{}',
                    paymentDetails: {
                        cardType: 'Visa',
                        lastTwo: '11',
                        lastFour: '1111',
                        bin: '411111',
                        expirationMonth: '12',
                        expirationYear: '2025',
                        cardholderName: 'Fake Cardholder Name',
                    },
                },
                discountCodes: [],
                isStudentNew: false,
                releaseSignatures: [],
                student: {
                    id: undefined,
                    firstName: 'David',
                    lastName: 'McCoy',
                    birthdate: '09/24/1980',
                    pronouns: 'pronoun',
                    school: 'school',
                    tshirtSize: 'AS',
                    notes: 'notes',
                    contactEmail: 'contactEmail@email.com',
                    studentEmail: 'contact@email.com',
                    contactFirstName: 'Somebody',
                    contactLastName: 'Somelast',
                    contactPhone: '1234567890',
                    studentPhone: '1234567890',
                    address: 'address',
                    city: 'some city',
                    state: 'some state',
                    zip: '12345',
                    deetBugspray: true,
                    naturalBugspray: false,
                    sunscreen: true,
                    photography: 'yes',
                    guardians: [
                        {
                            guardianName: 'someone',
                            guardianRelationship: 'parent',
                            guardianPhone: '1234567890',
                            guardianEmail: 'email@mail.com',
                            guardianResidesWithStudent: true,
                        },
                    ],
                    pickupCodeword: 'code',
                    authorizedForPickup: [
                        {
                            name: 'someone',
                            relationship: 'parent',
                            phone: '1234567890',
                        },
                    ],
                    emergencyContacts: [
                        {
                            name: 'someone',
                            relationship: 'parent',
                            phone: '1234567890',
                        },
                    ],
                    weightImperial: 100,
                    heightFeet: 5,
                    heightInches: 4,
                    doctorName: 'doctor',
                    doctorPhone: '1234567890',
                    insuranceCompany: 'insurance',
                    insuranceId: '1234567890',
                    doesNotHaveInsurance: false,
                    allergies: 'allergies',
                    hasLifeThreateningAllergies: false,
                    medications: [
                        {
                            name: 'medication',
                            dosage: 'dosage',
                            doctor: 'doctor',
                        },
                    ],
                    authorizedToAdministerMedication: true,
                    medicalNotes: 'notes',
                },
            },
        });
    }

    enrollAnother(stepper: CdkStepper) {
        this.store.startOver();
        stepper.reset();
    }

    closeFailure() {
        this.store.setStatusToDraft();
    }

    private readonly dialog = inject(Dialog);
    private readonly stepper = viewChild(CdkStepper);

    showStartOverDialog() {
        const { closed } = this.dialog.open(StartOverDialogComponent);
        closed.pipe(take(1)).subscribe((confirmed) => {
            if (confirmed) {
                this.store.startOver();
                this.stepper()?.reset();
            }
        });
    }
}

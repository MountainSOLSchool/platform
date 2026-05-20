import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    OnInit,
    viewChild,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EnrollmentWorkflowStore } from './enrollment-workflow.store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { provideComponentStore } from '@ngrx/component-store';
import { MatStep, MatStepperModule } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, map, of, shareReplay, take } from 'rxjs';
import { ClassesComponent } from '../classes/class-list/class-list.component';
import { InfoComponent } from '../info/info.component';
import { AccountComponent } from '../account/account.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {
    CdkStepper,
    CdkStepperModule,
    STEPPER_GLOBAL_OPTIONS,
} from '@angular/cdk/stepper';
import { MedicalComponent } from '../medical/medical.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventsComponent } from '../events/events.component';
import { MatVerticalStepperScrollerDirective } from './vertical-steps.directive';
import { SelectStudentComponent } from '../select-student/select-student.component';
import { ReleasesComponent } from '../releases/releases.component';
import { UserService } from '@sol/auth/user';
import { Dialog } from '@angular/cdk/dialog';
import { StartOverDialogComponent } from '../start-over-dialog/start-over-dialog.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { FirebaseRemoteConfigService } from '@sol/firebase/remote-config-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { AcknowledgeOutOfDateComponent } from '../acknowledge-out-of-date/acknowledge-out-of-date.component';
import { MarkdownModule } from 'ngx-markdown';

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
    styleUrls: ['./enrollment-workflow.component.css'],
    imports: [
        AsyncPipe,
        NgTemplateOutlet,
        RouterModule,
        CdkStepperModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        ClassesComponent,
        InfoComponent,
        AccountComponent,
        ConfirmationComponent,
        MedicalComponent,
        EventsComponent,
        MatVerticalStepperScrollerDirective,
        SelectStudentComponent,
        ReleasesComponent,
        AcknowledgeOutOfDateComponent,
        MarkdownModule,
    ],
})
export class ClassEnrollmentComponent implements OnInit {
    private readonly store = inject(EnrollmentWorkflowStore);
    private readonly remoteConfig = inject(FirebaseRemoteConfigService);
    private readonly api = inject(MountainSolApiService);
    private readonly route = inject(ActivatedRoute);

    private readonly user$ = inject(UserService).getUser().pipe(shareReplay());

    readonly isUserLoggedIn$ = this.user$.pipe(map((user) => !!user));

    readonly userEmail$ = this.user$.pipe(
        map((user) => user?.email),
        filter((email): email is string => !!email)
    );

    readonly isStudentLoading = this.store.isStudentLoading;

    readonly enrollmentMessages = rxResource({
        stream: () => this.api.getEnrollmentMessages(undefined as never),
    });

    readonly stepperOrientation = inject(BreakpointObserver)
        .observe('(min-width: 800px)')
        .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    readonly showSecretAutofill$ = of(false);

    readonly shouldShowEventsStep = rxResource({
        stream: () =>
            this.remoteConfig.getValue('show_events_step').pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                map((value) => value.asBoolean())
            ),
    });

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

    readonly isAddendumMode = this.store.isAddendumMode;
    readonly addendumLoading = this.store.addendumLoading;
    readonly addendumError = this.store.addendumError;

    readonly didLoadFromDraft = computed(
        () => !!this.store.state().draftEnrollment
    );

    ngOnInit() {
        const enrollmentId = this.route.snapshot.paramMap.get('enrollmentId');
        if (enrollmentId) {
            this.store.initAddendum(enrollmentId);
        }
    }

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

import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    HostListener,
    inject,
    ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnrollmentWorkflowStore } from './enrollment-workflow.store';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { provideComponentStore } from '@ngrx/component-store';
import { MatStep, MatStepperModule } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, fromEvent, map, skip, take, timer } from 'rxjs';
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
import { LetModule } from '@rx-angular/template/let';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ComponentCanDeactivate } from './pending-changes.guard';
import { EventsComponent } from '../events/events.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { IfModule } from '@rx-angular/template/if';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatVerticalStepperScrollerDirective } from './vertical-steps.directive';

@Component({
    standalone: true,
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
        CommonModule,
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
        LetModule,
        ProgressSpinnerModule,
        DialogModule,
        EventsComponent,
        MessagesModule,
        MessageModule,
        ToastModule,
        IfModule,
        MatVerticalStepperScrollerDirective,
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
                margin-left: 0;
            }
            :host ::ng-deep .mat-stepper-vertical-line::before {
                border: none;
            }
        `,
    ],
})
export class ClassEnrollmentComponent implements ComponentCanDeactivate {
    private readonly store = inject(EnrollmentWorkflowStore);

    readonly userEmail$ = inject(AngularFireAuth).user.pipe(
        map((user) => user?.email),
        filter((email): email is string => !!email)
    );

    readonly earlyBirdEnd = Date.parse('2023-04-01T23:59:59.999Z');

    readonly isNowBeforeEarlyBirdEnd$ = timer(0, 5000).pipe(
        map(() => Date.now() < this.earlyBirdEnd)
    );

    readonly stepperOrientation = inject(BreakpointObserver)
        .observe('(min-width: 800px)')
        .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    readonly showSecretAutofill$ = fromEvent<KeyboardEvent>(
        document,
        'keypress'
    ).pipe(
        filter((event) => event.key === 'z'),
        skip(3),
        map(() => true),
        take(1)
    );

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
    readonly isSubmitting$ = this.store.submitting$;
    readonly hasFailed$ = this.store.failed$;

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

    allStepsComplete(...steps: Array<MatStep>): boolean {
        return steps.every(
            (step) =>
                !step.hasError &&
                // TODO: detect better
                (step.interacted || step.label === 'Confirm Enrollment')
        );
    }

    fillOutForTest() {
        this.store.patchState({
            enrollment: {
                selectedClassGroups: [],
                selectedClasses: [],
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
                student: {
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
                    medicalReleaseSignature: 'David Shortman',
                    releaseOfLiabilitySignature: 'David Shortman',
                },
            },
        });
    }

    enrollAnother(stepper: CdkStepper) {
        this.store.startOver();
        stepper.reset();
    }

    @HostListener('window:beforeunload')
    canDeactivate(): boolean {
        return false;
    }
}

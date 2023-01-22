import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnrollmentWorkflowStore } from './enrollment-workflow.store';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { provideComponentStore } from '@ngrx/component-store';
import { MatStep, MatStepperModule } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, fromEvent, map, skip, take } from 'rxjs';
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

@Component({
    standalone: true,
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
    ],
    styles: [
        `
            ::ng-deep .mat-vertical-stepper-content {
                overflow: unset !important;
            }
            ::ng-deep .mat-horizontal-content-container {
                overflow: unset !important;
            }
        `,
    ],
})
export class ClassEnrollmentComponent implements ComponentCanDeactivate {
    private readonly store = inject(EnrollmentWorkflowStore);

    readonly data$ = this.store.select((state) => state);

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

    readonly shouldShowSuccess$ = this.store.select(
        (s) => s.status === 'enrolled'
    );

    readonly enrollment$ = this.store.select((s) => s.enrollment);
    readonly paymentSessionToken$ = this.store.select(
        (s) => s.paymentSessionToken
    );

    complete() {
        this.store.submit();
    }

    next(stepper: CdkStepper) {
        stepper.next();
    }

    allStepsComplete(...steps: Array<MatStep>): boolean {
        return steps.every((step) => !step.hasError && step.interacted);
    }

    fillOutForTest() {
        this.store.patchState({
            enrollment: {
                selectedClasses: ['kzIlBrIIbrnfboPLvgA7'],
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
                    notes: 'notes',
                    contactEmail: 'contactEmail@email.com',
                    studentEmail: 'contact@email.com',
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
                    heightImperial: 100,
                    doctorName: 'doctor',
                    doctorPhone: '1234567890',
                    insuranceCompany: 'insurance',
                    insuranceId: '1234567890',
                    doesNotHaveInsurance: false,
                    hasLifeThreateningAllergies: false,
                    allergies: 'allergies',
                    medications: [
                        {
                            name: 'medication',
                            dosage: 'dosage',
                            doctor: 'doctor',
                        },
                    ],
                    authorizedToAdministerMedication: true,
                    medicalNotes: 'notes',
                    signedMedicalRelease: 'true',
                    signedReleaseOfLiability: 'true',
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

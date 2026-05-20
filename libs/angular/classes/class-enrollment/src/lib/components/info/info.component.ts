import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { map } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { create, test, enforce, group } from 'vest';
import { MessagesComponent, ValidDirective } from '@sol/form/validity';
import { StudentForm } from '@sol/student/domain';
import { NgStyle } from '@angular/common';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { ConfirmAccuracyComponent } from '../confirm-accuracy/confirm-accuracy.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgStyle,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        ValidDirective,
        MessagesComponent,
        ConfirmAccuracyComponent,
    ],
    selector: 'sol-student-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css'],
})
export class InfoComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);

    private readonly validationSuite = create(
        (
            student: Partial<StudentForm>,
            accuracyCheck: {
                isOutOfDate: boolean;
                accuracyConfirmations: Record<string, boolean>;
            }
        ) => {
            group('student', () => {
                test(
                    'confirmedAccuracyStudent',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['student']
                            ).isTruthy();
                        }
                    }
                );

                test('firstName', 'First name is required', () => {
                    enforce(student.firstName).isNotEmpty();
                });

                test('lastName', 'Last name is required', () => {
                    enforce(student.lastName).isNotEmpty();
                });

                test('birthdate', 'Birthdate is required', () => {
                    enforce(student.birthdate).isNotBlank();
                });

                test('pronouns', 'Pronouns are required', () => {
                    enforce(student.pronouns).isNotEmpty();
                });

                test('school', 'School is required', () => {
                    enforce(student.school).isNotEmpty();
                });

                test('tshirtSize', 'T-shirt size is required', () => {
                    enforce(student.tshirtSize).isNotEmpty();
                });
            });

            group('contact', () => {
                test(
                    'confirmedAccuracyContact',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['contact']
                            ).isTruthy();
                        }
                    }
                );

                test('contactFirstName', 'First name is required', () => {
                    enforce(student.contactFirstName).isNotEmpty();
                });

                test('contactLastName', 'Last name is required', () => {
                    enforce(student.contactLastName).isNotEmpty();
                });

                test('contactEmail', 'Email is required', () => {
                    enforce(student.contactEmail).isNotEmpty();
                });

                test('contactPhone', 'Phone is required', () => {
                    enforce(student.contactPhone).isNotEmpty();
                });

                test('address', 'Address is required', () => {
                    enforce(student.address).isNotEmpty();
                });

                test('city', 'City is required', () => {
                    enforce(student.city).isNotEmpty();
                });

                test('state', 'State is required', () => {
                    enforce(student.state).isNotEmpty();
                });

                test('zip', 'Zip is required', () => {
                    enforce(student.zip).isNotEmpty();
                });
            });

            group('privacy', () => {
                test(
                    'confirmedAccuracyPrivacy',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['privacy']
                            ).isTruthy();
                        }
                    }
                );

                test('photography', 'Photography privacy is required', () => {
                    enforce(student.photography).isNotUndefined();
                });
                test('deetspray', 'DEET bug spray choice is required', () => {
                    enforce(student.deetBugspray).isNotUndefined();
                });
                test(
                    'naturalspray',
                    'Natural bug spray choice is required',
                    () => {
                        enforce(student.naturalBugspray).isNotUndefined();
                    }
                );
                test('sunscreen', 'Sunscreen choice is required', () => {
                    enforce(student.sunscreen).isNotUndefined();
                });
            });

            group('guardians', () => {
                test(
                    'confirmedAccuracyGuardians',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['guardians']
                            ).isTruthy();
                        }
                    }
                );

                student.guardians?.forEach((guardian, i) => {
                    test(`guardian_${i}_name`, 'Name is required', () => {
                        enforce(guardian.guardianName).isNotEmpty();
                    });

                    test(`guardian_${i}_email`, 'Email is required', () => {
                        enforce(guardian.guardianEmail).isNotEmpty();
                    });

                    test(`guardian_${i}_phone`, 'Phone is required', () => {
                        enforce(guardian.guardianPhone).isNotEmpty();
                    });

                    test(
                        `guardian_${i}_relationship`,
                        'Relationship is required',
                        () => {
                            enforce(guardian.guardianRelationship).isNotEmpty();
                        }
                    );

                    test(
                        `guardian_${i}_residence`,
                        'Residence is required',
                        () => {
                            enforce(
                                guardian.guardianResidesWithStudent
                            ).isNotUndefined();
                        }
                    );
                });
            });

            group('pickup', () => {
                test(
                    'confirmedAccuracyPickup',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['pickup']
                            ).isTruthy();
                        }
                    }
                );

                test('codeword', 'Codeword is required', () => {
                    enforce(student.pickupCodeword).isNotEmpty();
                });

                student.authorizedForPickup?.forEach((pickup, i) => {
                    test(`pickup_${i}_name`, 'Name is required', () => {
                        enforce(pickup.name).isNotEmpty();
                    });

                    test(
                        `pickup_${i}_relationship`,
                        'Relationship is required',
                        () => {
                            enforce(pickup.relationship).isNotEmpty();
                        }
                    );
                    test(`pickup_${i}_phone`, 'Phone is required', () => {
                        enforce(pickup.phone).isNotEmpty();
                    });
                });
            });
        }
    );

    authorized = true;

    readonly isUpdatingExistingStudent = this.workflow.selectSignal(
        (state) => state.enrollment.isStudentNew === false
    );

    private readonly workflowStudent = this.workflow.selectSignal(
        (state) => state.enrollment.student
    );

    readonly student = computed(() => {
        const student = this.workflowStudent();
        let age: string;
        if (student?.birthdate) {
            const ageDiffMs =
                Date.now() - new Date(student.birthdate).getTime();
            const ageDate = new Date(ageDiffMs);
            age = Math.abs(ageDate.getUTCFullYear() - 1970).toString();
        } else {
            age = '';
        }
        return {
            ...student,
            age,
        };
    });

    private readonly isOutOfDate = this.workflow.selectSignal(
        (state) => state.doesStudentInfoRequireReview
    );

    readonly accuracyConfirmations = this.workflow.selectSignal(
        (state) => state.accuracyConfirmations
    );

    private readonly validation = computed(() => {
        return this.validationSuite(this.student(), {
            isOutOfDate: this.isOutOfDate(),
            accuracyConfirmations: this.accuracyConfirmations(),
        });
    });

    readonly errors = computed(() => {
        return this.validation().getErrors();
    });

    readonly hasErrorsByGroup = computed(() => {
        const validation = this.validation();
        const interacted = this.interacted();
        return interacted
            ? Object.assign(
                  {},
                  ...Object.keys(validation.groups).map((group) => ({
                      [group]: !!Object.values(
                          validation.getErrorsByGroup(group)
                      ).find((field) => field.length > 0),
                  }))
              )
            : {};
    });

    readonly viewModel = computed(() => {
        const student = this.student();
        const errors = this.errors();
        const interacted = this.interacted();
        const hasErrorsByGroup = this.hasErrorsByGroup();
        return {
            student,
            errors: interacted ? errors : {},
            hasErrorsByGroup,
        };
    });

    readonly interacted = input<boolean>(false);

    readonly isStudentLoading = input<boolean>(false);

    readonly validityChange = outputFromObservable(
        toObservable(this.errors).pipe(
            map((errors) => Object.keys(errors).length === 0)
        )
    );

    readonly yesNoOptions = [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
    ];

    readonly photographyPrivacyOptions = [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' },
        { name: 'Yes, but no name', value: 'yesNoName' },
    ];

    readonly guardianResidesWithStudentOptions = [
        { name: 'Lives with Student', value: true },
        { name: 'Does Not Live With Student', value: false },
    ];

    readonly tshirtSizes = [
        { name: 'Adult XSmall', value: 'XS' },
        { name: 'Adult Small', value: 'S' },
        { name: 'Adult Medium', value: 'M' },
        { name: 'Adult Large', value: 'L' },
        { name: 'Adult XL', value: 'XL' },
        { name: 'Adult 2XL', value: '2XL' },
    ];

    sectionConfirmationChanged(sectionName: string, confirmed: boolean) {
        this.workflow.patchState((s) => ({
            accuracyConfirmations: {
                ...s.accuracyConfirmations,
                [sectionName]: confirmed,
            },
        }));
    }

    updateStudentInfo(info: ReturnType<typeof this.student>): void {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                student: {
                    ...s.enrollment.student,
                    ...info,
                },
            },
        }));
    }

    removeGuardian(index: number): void {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                student: {
                    ...s.enrollment.student,
                    guardians: s.enrollment.student?.guardians?.filter(
                        (g, i) => i !== index
                    ),
                },
            },
        }));
    }

    addGuardian(): void {
        this.workflow.patchState(({ enrollment }) => ({
            enrollment: {
                ...enrollment,
                student: {
                    ...enrollment.student,
                    guardians: [
                        ...(enrollment.student?.guardians ?? []),
                        {
                            guardianName: '',
                            guardianEmail: '',
                            guardianPhone: '',
                            guardianRelationship: '',
                        },
                    ],
                },
            },
        }));
    }

    removeAuthorized(index: number) {
        this.workflow.patchState(({ enrollment }) => ({
            enrollment: {
                ...enrollment,
                student: {
                    ...enrollment.student,
                    authorizedForPickup:
                        enrollment.student?.authorizedForPickup?.filter(
                            (g, i) => i !== index
                        ),
                },
            },
        }));
    }

    addAuthorized() {
        this.workflow.patchState(({ enrollment }) => ({
            enrollment: {
                ...enrollment,
                student: {
                    ...enrollment.student,
                    authorizedForPickup: [
                        ...(enrollment.student?.authorizedForPickup ?? []),
                        {
                            name: '',
                            relationship: '',
                            phone: '',
                        },
                    ],
                },
            },
        }));
    }
}

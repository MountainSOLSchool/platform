import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
} from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, shareReplay } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { RippleModule } from 'primeng/ripple';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { create, enforce, group, test } from 'vest';
import { StudentForm } from '@sol/student/domain';
import { LetModule } from '@rx-angular/template/let';
import { MessagesComponent, ValidDirective } from '@sol/form/validity';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        InputTextModule,
        CalendarModule,
        ButtonModule,
        InputMaskModule,
        FieldsetModule,
        RippleModule,
        InputTextareaModule,
        InputNumberModule,
        AccordionModule,
        ToggleButtonModule,
        SelectButtonModule,
        FormsModule,
        LetModule,
        ValidDirective,
        MessagesComponent,
    ],
    selector: 'sol-medical-n-releases',
    templateUrl: './medical.component.html',
    styleUrls: ['./medical.component.css'],
})
export class MedicalComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);

    readonly medicationAuth = [
        {
            name: 'Yes, I authorize staff to administer the listed medications to my child.',
            value: 'Yes',
        },
        {
            name: 'My child does not need medication.',
            value: 'No',
        },
    ];

    private readonly validationSuite = create(
        (student: Partial<StudentForm>) => {
            group('contacts', () => {
                student.emergencyContacts?.forEach((contact, i) => {
                    test(`contact_${i}_name`, 'Name is required', () => {
                        enforce(contact.name).isNotEmpty();
                    });

                    test(`contact_${i}_phone`, 'Phone is required', () => {
                        enforce(contact.phone).isNotEmpty();
                    });

                    test(
                        `contact_${i}_relationship`,
                        'Relationship is required',
                        () => {
                            enforce(contact.relationship).isNotEmpty();
                        }
                    );
                });
            });
            group('health', () => {
                test('weight', 'Weight is required', () => {
                    enforce(student.weightImperial).isNotEmpty();
                });

                test('height', 'Height is required', () => {
                    enforce(student.heightImperial).isNotEmpty();
                });

                test('doctorName', "Doctor's name is required", () => {
                    enforce(student.doctorName).isNotBlank();
                });

                test('doctorPhone', "Doctor's phone is required", () => {
                    enforce(student.doctorPhone).isNotEmpty();
                });

                test('insuranceCompany', 'Insurance name is required', () => {
                    enforce(student.insuranceCompany).isNotEmpty();
                });

                test('insuranceId', 'Insurance ID is required', () => {
                    enforce(student.insuranceId).isNotEmpty();
                });

                group('medications', () => {
                    student.medications?.forEach((medication, i) => {
                        test(
                            `medication_${i}_name`,
                            'Medication name is required',
                            () => {
                                enforce(medication.name).isNotEmpty();
                            }
                        );
                        test(
                            `medication_${i}_dosage`,
                            'Medication dosage is required',
                            () => {
                                enforce(medication.dosage).isNotEmpty();
                            }
                        );
                        test(
                            `medication_${i}_doctor`,
                            'Prescribing doctor is required',
                            () => {
                                enforce(medication.doctor).isNotEmpty();
                            }
                        );
                    });
                });

                test(
                    'authorizedToAdministerMedication',
                    'Medication authorization selection is required',
                    () => {
                        enforce(
                            student.authorizedToAdministerMedication
                        ).isNotEmpty();
                    }
                );
            });

            group('healthRelease', () => {
                test('signedMedicalRelease', 'Must sign to continue', () => {
                    enforce(student.signedMedicalRelease).isTruthy();
                });
            });

            group('liabilityRelease', () => {
                test(
                    'signedReleaseOfLiability',
                    'Must sign to continue',
                    () => {
                        enforce(student.signedReleaseOfLiability).isTruthy();
                    }
                );
            });
        }
    );

    authorized = true;

    readonly student$ = this.workflow
        .select((state) => state.enrollment.student)
        .pipe(map((student) => student ?? {}));

    private readonly interacted$ = new BehaviorSubject(false);

    private readonly validation$ = this.student$.pipe(
        filter((student): student is StudentForm => !!student),
        map((student) => {
            return this.validationSuite(student);
        }),
        shareReplay()
    );

    readonly errors$ = this.validation$.pipe(
        map((validation) => {
            return validation.getErrors();
        })
    );

    readonly hasErrorsByGroup$ = combineLatest([
        this.validation$,
        this.interacted$,
    ]).pipe(
        map(([validation, interacted]) => {
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
        })
    );

    readonly viewModel$ = combineLatest([
        this.student$,
        this.errors$,
        this.interacted$,
        this.hasErrorsByGroup$,
    ]).pipe(
        map(([student, errors, interacted, hasErrorsByGroup]) => {
            return {
                student,
                errors: interacted ? errors : {},
                hasErrorsByGroup,
            };
        })
    );

    @Input() set interacted(value: boolean) {
        this.interacted$.next(value);
    }

    @Output() validityChange = this.errors$.pipe(
        map((errors) => Object.keys(errors).length === 0)
    );

    trackByIndex(index: number) {
        return index;
    }

    updateStudentMedicalInfo(info: any): void {
        this.workflow.patchState(({ enrollment }) => ({
            enrollment: {
                ...enrollment,
                student: {
                    ...enrollment.student,
                    ...info,
                },
            },
        }));
    }

    removeContact(index: number): void {
        this.workflow.patchState(({ enrollment }) => ({
            enrollment: {
                ...enrollment,
                student: {
                    ...enrollment.student,
                    emergencyContacts:
                        enrollment.student?.emergencyContacts?.filter(
                            (g, i) => i !== index
                        ),
                },
            },
        }));
    }

    addContact(): void {
        this.workflow.patchState(({ enrollment }) => ({
            enrollment: {
                ...enrollment,
                student: {
                    ...enrollment.student,
                    emergencyContacts: [
                        ...(enrollment.student?.emergencyContacts ?? []),
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

    addMedication(): void {
        this.workflow.patchState(({ enrollment }) => ({
            enrollment: {
                ...enrollment,
                student: {
                    ...enrollment.student,
                    medications: [
                        ...(enrollment.student?.medications ?? []),
                        {
                            name: '',
                            dosage: '',
                            doctor: '',
                        },
                    ],
                },
            },
        }));
    }

    removeMedication(index: number): void {
        this.workflow.patchState(({ enrollment }) => ({
            enrollment: {
                ...enrollment,
                student: {
                    ...enrollment.student,
                    medications: enrollment.student?.medications?.filter(
                        (g, i) => i !== index
                    ),
                },
            },
        }));
    }
}

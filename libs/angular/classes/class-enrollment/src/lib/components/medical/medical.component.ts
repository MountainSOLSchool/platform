import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
} from '@angular/core';
import {
    BehaviorSubject,
    combineLatest,
    filter,
    map,
    ObservedValueOf,
    shareReplay,
} from 'rxjs';
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
import { MessagesComponent, ValidDirective } from '@sol/form/validity';
import { MessagesModule } from 'primeng/messages';
import { AsyncPipe, NgStyle } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgStyle,
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
        ValidDirective,
        MessagesComponent,
        MessagesModule,
        ProgressSpinnerModule,
        AsyncPipe,
    ],
    selector: 'sol-medical',
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

                test('heightFeet', 'Height (ft) is required', () => {
                    enforce(student.heightFeet).isNotEmpty();
                });

                test('heightInches', 'Height (in) is required', () => {
                    enforce(student.heightInches).isNotEmpty();
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

                test(
                    'hasLifeThreateningAllergies',
                    'Must select an option',
                    () => {
                        enforce(
                            student.hasLifeThreateningAllergies
                        ).isNotUndefined();
                    }
                );

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
        }
    );

    readonly isOutOfDate = this.workflow.selectSignal(
        (s) => s.isMedicalInfoOutOfDate
    );

    readonly lifeThreateningOptions = [
        { name: 'My child has a life-threatening allergy', value: true },
        {
            name: 'My child does not have a life-threatening allergy',
            value: false,
        },
    ];

    readonly isUpdatingExistingStudent$ = this.workflow.select(
        (state) => !state.enrollment.isStudentNew
    );

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
    @Input() isStudentLoading = false;

    @Output() validityChange = combineLatest([
        this.errors$,
        toObservable(this.isOutOfDate),
    ]).pipe(
        map(
            ([errors, isOutOfDate]) =>
                !isOutOfDate && Object.keys(errors).length === 0
        )
    );

    trackByIndex(index: number) {
        return index;
    }

    updateStudentMedicalInfo(
        info: ObservedValueOf<typeof this.student$>
    ): void {
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

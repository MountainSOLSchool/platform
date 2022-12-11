import { Component, inject, Input, Output } from '@angular/core';
import {
    BehaviorSubject,
    combineLatest,
    map,
    shareReplay,
    tap,
    timer,
} from 'rxjs';
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
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { LetModule } from '@rx-angular/template/let';
import { create, test, enforce, group } from 'vest';
import { CommonModule } from '@angular/common';
import { MessagesComponent, ValidDirective } from '@sol/form/validity';
import { StudentForm } from '@sol/student/domain';

@Component({
    standalone: true,
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
    selector: 'sol-student-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css'],
})
export class InfoComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);

    private readonly validationSuite = create(
        (student: Partial<StudentForm>) => {
            group('student', () => {
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
            });

            group('contact', () => {
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
                test('photography', 'Photography privacy is required', () => {
                    enforce(student.photography).isNotUndefined();
                });
            });

            group('guardians', () => {
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

    readonly student$ = this.workflow
        .select((state) => state.student)
        .pipe(
            map((student) => {
                let age: string;
                if (student?.birthdate) {
                    const ageDiffMs = Date.now() - student.birthdate.getTime();
                    const ageDate = new Date(ageDiffMs);
                    age = Math.abs(ageDate.getUTCFullYear() - 1970).toString();
                } else {
                    age = '';
                }
                return {
                    ...student,
                    age,
                };
            })
        );

    private readonly interacted$ = new BehaviorSubject(false);

    private readonly validation$ = this.student$.pipe(
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

    readonly photographyPrivacyOptions = [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' },
        { name: 'Yes, but no name', value: 'yesNoName' },
    ];

    readonly guardianResidesWithStudentOptions = [
        { name: 'Lives with Student', value: true },
        { name: 'Does Not Live With Student', value: false },
    ];

    trackByIndex(index: number) {
        return index;
    }

    updateStudentInfo(info: any): void {
        this.workflow.patchState((s) => ({
            ...s,
            student: {
                ...s.student,
                ...info,
            },
        }));
    }

    removeGuardian(index: number): void {
        this.workflow.patchState((s) => ({
            ...s,
            student: {
                ...s.student,
                guardians: s.student?.guardians?.filter((g, i) => i !== index),
            },
        }));
    }

    addGuardian(): void {
        this.workflow.patchState((s) => ({
            ...s,
            student: {
                ...s.student,
                guardians: [
                    ...(s.student?.guardians ?? []),
                    {
                        guardianName: '',
                        guardianEmail: '',
                        guardianPhone: '',
                        guardianRelationship: '',
                        guardianResidesWithStudent: false,
                    },
                ],
            },
        }));
    }

    removeAuthorized(index: number) {
        this.workflow.patchState((s) => ({
            ...s,
            student: {
                ...s.student,
                authorizedForPickup: s.student?.authorizedForPickup?.filter(
                    (g, i) => i !== index
                ),
            },
        }));
    }

    addAuthorized() {
        this.workflow.patchState((s) => ({
            ...s,
            student: {
                ...s.student,
                authorizedForPickup: [
                    ...(s.student?.authorizedForPickup ?? []),
                    {
                        name: '',
                        relationship: '',
                        phone: '',
                    },
                ],
            },
        }));
    }
}

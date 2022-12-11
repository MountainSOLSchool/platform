import { Component, inject, Input, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap, timer } from 'rxjs';
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
            test('firstName', 'First name is required', () => {
                enforce(student.firstName).isNotEmpty();
            });

            test('lastName', 'Last name is required', () => {
                enforce(student.lastName).isNotEmpty();
            });

            test('birthdate', 'Birthdate is required', () => {
                enforce(student.birthdate).isNotUndefined();
            });

            test('pronouns', 'Pronouns are required', () => {
                enforce(student.pronouns).isNotUndefined();
            });

            test('school', 'School is required', () => {
                enforce(student.school).isNotUndefined();
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

            test('photography', 'Photography privacy is required', () => {
                enforce(student.photography).isNotUndefined();
            });

            test('guardians', 'Must enter at least one guardian', () => {
                enforce(student.guardians).longerThanOrEquals(1);
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

            test('codeword', 'Codeword is required', () => {
                enforce(student.pickupCodeword).isNotEmpty();
            });
        }
    );

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

    readonly errors$ = this.student$.pipe(
        map((student) => {
            return this.validationSuite(student).getErrors();
        })
    );

    readonly viewModel$ = combineLatest([
        this.student$,
        this.errors$,
        this.interacted$,
    ]).pipe(
        map(([student, errors, interacted]) => {
            return {
                student,
                errors: interacted ? errors : {},
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

    updateStudentInfo(info: any): void {
        this.workflow.patchState((s) => ({
            ...s,
            student: {
                ...s.student,
                ...info,
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
}

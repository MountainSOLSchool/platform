import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import {
    BehaviorSubject,
    combineLatest,
    map,
    shareReplay,
    switchMap,
    ObservedValueOf,
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
import { RxLet } from '@rx-angular/template/let';
import { create, test, enforce, group, skipWhen } from 'vest';
import { MessagesComponent, ValidDirective } from '@sol/form/validity';
import { StudentForm } from '@sol/student/domain';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { RxIf } from '@rx-angular/template/if';
import { SemesterClass } from '@sol/classes/domain';
import { NgStyle } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ClassListService } from '@sol/angular/classes/list';

export const studentInfoValidationSuite = create(
    (student: Partial<StudentForm>, classes: Array<SemesterClass>) => {
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

            test('schoolGrade', 'Grade is required', () => {
                enforce(student.schoolGrade?.initialGrade).isNotBlank();
            });

            skipWhen(
                () => !student.schoolGrade,
                () => {
                    test(
                        'schoolGrade',
                        'Age range must be appropriate for class(es)',
                        () => {
                            const schoolGrade =
                                student.schoolGrade as NonNullable<
                                    typeof student.schoolGrade
                                >;

                            const today = new Date();
                            const july = 6;

                            const isCurrentlyFirstHalfOfYear =
                                today.getMonth() < july;
                            const yearsPassedSinceGradeWasEntered =
                                today.getFullYear() -
                                schoolGrade.atDate.getFullYear();
                            const wasStudentGradeCapturedInFirstHalfOfYear =
                                schoolGrade.atDate.getMonth() < july;

                            const offset = isCurrentlyFirstHalfOfYear
                                ? wasStudentGradeCapturedInFirstHalfOfYear
                                    ? 0
                                    : 1
                                : wasStudentGradeCapturedInFirstHalfOfYear
                                  ? 1
                                  : 0;

                            const studentCurrentGrade =
                                schoolGrade.initialGrade +
                                yearsPassedSinceGradeWasEntered +
                                offset;

                            classes.forEach(
                                ({ gradeRangeStart, gradeRangeEnd }) =>
                                    enforce(studentCurrentGrade).isBetween(
                                        gradeRangeStart,
                                        gradeRangeEnd
                                    )
                            );
                        }
                    );
                }
            );

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
            test('photography', 'Photography privacy is required', () => {
                enforce(student.photography).isNotUndefined();
            });
            test('deetspray', 'DEET bug spray choice is required', () => {
                enforce(student.deetBugspray).isNotUndefined();
            });
            test('naturalspray', 'Natural bug spray choice is required', () => {
                enforce(student.naturalBugspray).isNotUndefined();
            });
            test('sunscreen', 'Sunscreen choice is required', () => {
                enforce(student.sunscreen).isNotUndefined();
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

                test(`guardian_${i}_residence`, 'Residence is required', () => {
                    enforce(
                        guardian.guardianResidesWithStudent
                    ).isNotUndefined();
                });
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

@Component({
    standalone: true,
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
        RxLet,
        ValidDirective,
        MessagesComponent,
        OverlayPanelModule,
        DropdownModule,
        MessagesModule,
        RxIf,
        ProgressSpinnerModule,
    ],
    selector: 'sol-student-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css'],
})
export class InfoComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);
    private readonly classList = inject(ClassListService);

    private readonly validationSuite = studentInfoValidationSuite;

    authorized = true;

    readonly isUpdatingExistingStudent$ = this.workflow.select(
        (state) => state.enrollment.isStudentNew === false
    );

    readonly student$ = this.workflow
        .select((state) => state.enrollment.student)
        .pipe(
            map((student) => {
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
            })
        );

    private readonly interacted$ = new BehaviorSubject(false);

    private selectedClassList$ = this.workflow
        .select(({ enrollment: { selectedClasses } }) => selectedClasses)
        .pipe(switchMap((classIds) => this.classList.getClasses(classIds)));

    private readonly validation$ = combineLatest([
        this.student$,
        this.selectedClassList$,
    ]).pipe(
        map(([student, selectedClassList]) => {
            return this.validationSuite(student, selectedClassList);
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

    @Output() validityChange = this.errors$.pipe(
        map((errors) => Object.keys(errors).length === 0)
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

    @ViewChild('op') op!: OverlayPanel;

    updateStudentInfo(info: ObservedValueOf<typeof this.student$>): void {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                student: {
                    ...s.enrollment.student,
                    ...info,
                },
            },
        }));
        this.op?.hide();
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

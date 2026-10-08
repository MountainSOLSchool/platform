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
import { createInfoSuite } from './info.suite';
import { MessagesComponent, ValidDirective } from '@sol/form/validity';
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

    private readonly validationSuite = createInfoSuite();

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
        return this.validationSuite.run(this.student(), {
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

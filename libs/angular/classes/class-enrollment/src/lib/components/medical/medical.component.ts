import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { map } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { createMedicalSuite } from './medical.suite';
import { MessagesComponent, ValidDirective } from '@sol/form/validity';
import { AsyncPipe, NgStyle } from '@angular/common';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { ConfirmAccuracyComponent } from '../confirm-accuracy/confirm-accuracy.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgStyle,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        ValidDirective,
        MessagesComponent,
        AsyncPipe,
        ConfirmAccuracyComponent,
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

    private readonly validationSuite = createMedicalSuite();

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

    readonly workflowStudent = this.workflow.selectSignal(
        (state) => state.enrollment.student
    );

    readonly student = computed(() => {
        return this.workflowStudent() ?? {};
    });

    readonly isOutOfDate = this.workflow.selectSignal(
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
        const interacted = this.interacted();
        const validation = this.validation();
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

    readonly interacted = input(false);

    readonly isStudentLoading = input(false);

    readonly validityChange = outputFromObservable(
        toObservable(this.errors).pipe(
            map((errors) => Object.keys(errors).length === 0)
        )
    );

    trackByIndex(index: number) {
        return index;
    }

    sectionConfirmationChanged(sectionName: string, confirmed: boolean) {
        this.workflow.patchState((s) => ({
            accuracyConfirmations: {
                ...s.accuracyConfirmations,
                [sectionName]: confirmed,
            },
        }));
    }

    updateStudentMedicalInfo(info: ReturnType<typeof this.student>): void {
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

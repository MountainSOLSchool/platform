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
import { RxLet } from '@rx-angular/template/let';
import { MessagesComponent, ValidDirective } from '@sol/form/validity';
import { CommonModule } from '@angular/common';
import { RxFor } from '@rx-angular/template/for';

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
        RxLet,
        RxFor,
        ValidDirective,
        MessagesComponent,
    ],
    selector: 'sol-releases',
    templateUrl: './releases.component.html',
    styleUrls: ['./releases.component.css'],
})
export class ReleasesComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);

    private readonly validationSuite = create(
        (student: Partial<StudentForm>) => {
            group('healthRelease', () => {
                test('medicalReleaseSignature', 'Must sign to continue', () => {
                    enforce(student.medicalReleaseSignature).isNotEmpty();
                });
            });

            group('liabilityRelease', () => {
                test(
                    'releaseOfLiabilitySignature',
                    'Must sign to continue',
                    () => {
                        enforce(
                            student.releaseOfLiabilitySignature
                        ).isNotEmpty();
                    }
                );
            });
        }
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
}

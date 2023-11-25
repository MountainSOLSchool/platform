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
import { RxLet } from '@rx-angular/template/let';
import { MessagesComponent, ValidDirective } from '@sol/form/validity';
import { RxFor } from '@rx-angular/template/for';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
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
        (enrollment: {
            releaseSignatures: Array<{ name: string; signature: string }>;
        }) => {
            group('healthRelease', () => {
                test('medicalReleaseSignature', 'Must sign to continue', () => {
                    enforce(
                        enrollment.releaseSignatures.find(
                            ({ name }) => name === 'MEDICAL_RELEASE_FALL_2023'
                        )?.signature
                    ).isNotBlank();
                });
            });

            group('liabilityRelease', () => {
                test(
                    'releaseOfLiabilitySignature',
                    'Must sign to continue',
                    () => {
                        enforce(
                            enrollment.releaseSignatures.find(
                                ({ name }) =>
                                    name === 'LIABILITY_RELEASE_FALL_2023'
                            )?.signature
                        ).isNotBlank();
                    }
                );
            });
        }
    );

    readonly enrollment$ = this.workflow.select((state) => state.enrollment);

    private readonly interacted$ = new BehaviorSubject(false);

    private readonly validation$ = this.enrollment$.pipe(
        map((enrollment) => {
            return this.validationSuite(enrollment);
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
        this.enrollment$,
        this.errors$,
        this.interacted$,
        this.hasErrorsByGroup$,
    ]).pipe(
        map(([enrollment, errors, interacted, hasErrorsByGroup]) => {
            return {
                releaseSignatures: {
                    MEDICAL_RELEASE_FALL_2023:
                        enrollment.releaseSignatures.find(
                            ({ name }) => name === 'MEDICAL_RELEASE_FALL_2023'
                        ) ?? {
                            name: 'MEDICAL_RELEASE_FALL_2023',
                            signature: '',
                        },
                    LIABILITY_RELEASE_FALL_2023:
                        enrollment.releaseSignatures.find(
                            ({ name }) => name === 'LIABILITY_RELEASE_FALL_2023'
                        ) ?? {
                            name: 'LIABILITY_RELEASE_FALL_2023',
                            signature: '',
                        },
                },
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

    updateReleaseSignatures(
        releaseSignatures: ObservedValueOf<
            typeof this.viewModel$
        >['releaseSignatures']
    ): void {
        this.workflow.patchState(({ enrollment }) => ({
            enrollment: {
                ...enrollment,
                releaseSignatures: [
                    {
                        name: 'MEDICAL_RELEASE_FALL_2023',
                        signature:
                            releaseSignatures.MEDICAL_RELEASE_FALL_2023
                                .signature,
                    },
                    {
                        name: 'LIABILITY_RELEASE_FALL_2023',
                        signature:
                            releaseSignatures.LIABILITY_RELEASE_FALL_2023
                                .signature,
                    },
                ],
            },
        }));
    }
}

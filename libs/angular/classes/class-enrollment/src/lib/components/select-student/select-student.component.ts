import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
    BehaviorSubject,
    combineLatest,
    filter,
    map,
    merge,
    Observable,
    pairwise,
    shareReplay,
    startWith,
    Subject,
    take,
} from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { create, enforce, omitWhen, test } from 'vest';
import { MatButtonModule } from '@angular/material/button';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectStudentCardComponent } from '../select-student-card/select-student-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCardModule,
        MatSelectModule,
        MatFormFieldModule,
        MatRadioModule,
        FormsModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        SelectStudentCardComponent,
        AsyncPipe,
    ],
    selector: 'sol-student-selection',
    templateUrl: './select-student.component.html',
    styleUrls: ['./select-student.component.css'],
})
export class SelectStudentComponent {
    private api = inject(FirebaseFunctionsService);
    private workflow = inject(EnrollmentWorkflowStore);

    private readonly validationSuite = create(
        (enrollment: {
            isStudentNew: boolean | undefined;
            student?: { id?: string };
        }) => {
            test(
                'studentSelectionType',
                'Student type selection is required',
                () => {
                    enforce(enrollment.isStudentNew).isNotUndefined();
                }
            );
            omitWhen(enrollment.isStudentNew === true, () => {
                test(
                    'studentSelection',
                    'Student selection is required',
                    () => {
                        enforce(enrollment.student?.id).isNotUndefined();
                    }
                );
            });
        }
    );

    private readonly interactedFromWorkflow$ = new BehaviorSubject(false);

    private enrollment$ = this.workflow.select((state) => state.enrollment);

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

    readonly hasAnyErrors$ = this.errors$.pipe(
        map((errors) => Object.keys(errors).length !== 0),
        shareReplay()
    );

    readonly transitionOccurredToNoErrors$ = this.hasAnyErrors$.pipe(
        pairwise(),
        map(([prev, curr]) => prev && !curr),
        filter((value) => value),
        take(1),
        startWith(false)
    );

    private selectedStudentType$: Observable<'previous' | 'new' | undefined> =
        this.workflow.select((state) =>
            state.enrollment.isStudentNew === true
                ? 'new'
                : state.enrollment.isStudentNew === false
                  ? 'previous'
                  : undefined
        );

    private selectedStudentId$: Observable<string | undefined> =
        this.workflow.select((state) => state.enrollment.student?.id);

    private students$ = this.api
        .call<{
            students: Array<{ id: string; name: string; birthday: string }>;
        }>('myEnrolledStudents')
        .pipe(
            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
            map(({ students }) => students)
        );

    readonly viewModel$ = combineLatest([
        this.selectedStudentType$,
        this.selectedStudentId$,
        this.students$.pipe(startWith(undefined)),
        this.interactedFromWorkflow$,
        this.hasAnyErrors$,
        this.transitionOccurredToNoErrors$,
    ]).pipe(
        map(
            ([
                selectedStudentType,
                selectedStudentId,
                students,
                interacted,
                hasAnyErrors,
                transitionOccurredToNoErrors,
            ]) => ({
                selectedStudentType,
                selectedStudentId,
                students,
                showAsReadonlyBlock:
                    selectedStudentType !== undefined &&
                    interacted &&
                    !transitionOccurredToNoErrors &&
                    !hasAnyErrors,
            })
        )
    );

    readonly startOverIntent$ = new Subject<void>();
    readonly confirmedStartOver$ = new Subject<void>();
    readonly canceledChange$ = new Subject<void>();

    readonly showStartOverModal$ = merge(
        merge(this.startOverIntent$).pipe(map(() => true)),
        merge(this.confirmedStartOver$, this.canceledChange$).pipe(
            map(() => false)
        )
    );

    startOverIntent() {
        this.startOverIntent$.next();
    }

    confirmStartOver() {
        this.confirmedStartOver$.next();
        this.workflow.startOverEnrollment();
    }

    selectedStudent(id: string) {
        this.selectedStudentType('previous');
        this.workflow.patchState((state) => ({
            enrollment: {
                ...state.enrollment,
                isStudentNew: false,
                student: {
                    ...state.enrollment.student,
                    id,
                },
            },
        }));
    }

    selectedStudentType(type: 'previous' | 'new') {
        this.workflow.patchState((state) => ({
            enrollment: {
                ...state.enrollment,
                isStudentNew: type === 'new',
                student:
                    type === 'new'
                        ? {
                              ...state.enrollment.student,
                              id: undefined,
                          }
                        : state.enrollment.student,
            },
        }));
    }

    @Input() set interacted(value: boolean) {
        this.interactedFromWorkflow$.next(value);
    }

    @Output() validityChange = this.hasAnyErrors$.pipe(map((value) => !value));
}

import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
} from '@angular/core';
import { LoginComponent } from '@sol/auth/login';
import { CardModule } from 'primeng/card';
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
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { RxLet } from '@rx-angular/template/let';
import { DropdownModule } from 'primeng/dropdown';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { RxIf } from '@rx-angular/template/if';
import { create, enforce, omitWhen, test } from 'vest';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RequestedOperatorsUtility } from '@sol/angular/request';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        LoginComponent,
        CardModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        RxLet,
        DropdownModule,
        RadioButtonModule,
        FormsModule,
        RxIf,
        ButtonModule,
        DialogModule,
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
            students: Array<{ id: string; name: string }>;
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
        this.workflow.patchState((state) => ({
            enrollment: {
                ...state.enrollment,
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
            },
        }));
    }

    @Input() set interacted(value: boolean) {
        this.interactedFromWorkflow$.next(value);
    }

    @Output() validityChange = this.hasAnyErrors$.pipe(map((value) => !value));
}

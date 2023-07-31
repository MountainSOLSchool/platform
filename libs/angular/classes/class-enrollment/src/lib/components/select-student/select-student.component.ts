import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Output,
} from '@angular/core';
import { LoginComponent } from '@sol/auth/login';
import { CardModule } from 'primeng/card';
import {
    combineLatest,
    map,
    Observable,
    shareReplay,
    startWith,
    tap,
} from 'rxjs';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { RxLet } from '@rx-angular/template/let';
import { DropdownModule } from 'primeng/dropdown';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { RxIf } from '@rx-angular/template/if';
import { create, enforce, omitWhen, test } from 'vest';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
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
    ],
    selector: 'sol-student-selection',
    templateUrl: './select-student.component.html',
    styleUrls: ['./select-student.component.css'],
})
export class SelectStudentComponent {
    private api = inject(FunctionsApi);
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
        .call<{ students: Array<{ id: string; name: string }> }>(
            'myEnrolledStudents'
        )
        .pipe(map(({ students }) => students));

    readonly viewModel$ = combineLatest([
        this.selectedStudentType$,
        this.selectedStudentId$,
        this.students$.pipe(startWith(undefined)),
    ]).pipe(
        map(([selectedStudentType, selectedStudentId, students]) => ({
            selectedStudentType,
            selectedStudentId,
            students,
        }))
    );

    selectedStudent(id: string) {
        console.log('patching', id);
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
        console.log('patching', type);
        this.workflow.patchState((state) => ({
            enrollment: {
                ...state.enrollment,
                isStudentNew: type === 'new',
            },
        }));
    }

    @Output() validityChange = this.errors$.pipe(
        tap((errors) => console.log('errors', errors)),
        map((errors) => Object.keys(errors).length === 0)
    );
}

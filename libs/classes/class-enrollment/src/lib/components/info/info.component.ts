import { Component, inject, Output } from '@angular/core';
import { combineLatest, map, tap, timer } from 'rxjs';
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
import { create, test, enforce } from 'vest';
import { CommonModule } from '@angular/common';

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
    ],
    selector: 'sol-student-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css'],
})
export class InfoComponent {
    private readonly workflow = inject(EnrollmentWorkflowStore);

    private readonly validationSuite = create((student) => {
        test('firstName', 'First name is required', () => {
            enforce(student.firstName).isNotEmpty();
        });

        test('lastName', 'Last name is required', () => {
            enforce(student.lastName).isNotEmpty();
        });

        test('birthdate', 'Birthdate is required', () => {
            console.log(student);
            enforce(student.birthdate).isNotUndefined();
        });
    });

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

    readonly errors$ = this.student$.pipe(
        map((student) => {
            return this.validationSuite(student).getErrors();
        })
    );

    readonly viewModel$ = combineLatest([this.student$, this.errors$]).pipe(
        map(([student, errors]) => {
            return {
                student,
                errors,
            };
        })
    );

    @Output() validityChange = this.errors$.pipe(
        tap((errors) => console.log(errors)),
        map((errors) => Object.keys(errors).length === 0)
    );

    readonly chemicalPreferences = [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' },
        { name: 'Yes, but no name', value: 'yesNoName' },
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
}

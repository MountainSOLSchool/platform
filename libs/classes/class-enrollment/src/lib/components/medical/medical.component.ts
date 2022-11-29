import { Component, inject, Injectable, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map, tap, timer } from 'rxjs';
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

@Injectable()
class InfoStore extends ComponentStore<{ nil: null }> {
    readonly workflow = inject(EnrollmentWorkflowStore);

    constructor() {
        super({ nil: null });
    }

    readonly next = this.effect(() => {
        return this.workflow.nextClick$.pipe(
            tap(() => this.workflow.completeStep())
        );
    });
}

@Component({
    standalone: true,
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
    ],
    selector: 'sol-medical-n-releases',
    templateUrl: './medical.component.html',
    styleUrls: ['./medical.component.css'],
    providers: [InfoStore],
})
export class MedicalComponent {
    store = inject(InfoStore);

    @Output() validityChange = timer(500).pipe(map(() => true));

    student = {
        birthdate: undefined,
        age: '',
    };

    medicationAuth = [
        {
            name: 'Yes, I authorize staff to administer the listed medications to my child.',
            value: 'Yes',
        },
        {
            name: 'My child does not need medication.',
            value: 'No',
        },
    ];

    updateAge(birthdate: Date | undefined): void {
        if (birthdate) {
            const ageDiffMs = Date.now() - birthdate.getTime();
            const ageDate = new Date(ageDiffMs);
            this.student.age = Math.abs(
                ageDate.getUTCFullYear() - 1970
            ).toString();
        } else {
            this.student.age = '';
        }
    }
}

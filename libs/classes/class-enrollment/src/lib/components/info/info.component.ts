import { Component, Output } from '@angular/core';
import { map, timer } from 'rxjs';
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
    selector: 'sol-student-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css'],
})
export class InfoComponent {
    @Output() validityChange = timer(500).pipe(map(() => true));

    student = {
        birthdate: undefined,
        age: '',
    };

    chemicalPreferences = [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' },
        { name: 'Yes, but no name', value: 'yesNoName' },
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

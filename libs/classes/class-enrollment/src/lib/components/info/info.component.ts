import { Component, inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { RippleModule } from 'primeng/ripple';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';

@Injectable()
class InfoStore extends ComponentStore<{ nil: null }> {
    readonly workflow = inject(EnrollmentWorkflowStore);

    constructor() {
        super({ nil: null });
    }

    readonly next = this.effect(() => {
        return this.workflow.nextClick$.pipe(
            tap(() => this.workflow.readyForNext())
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
    ],
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css'],
    providers: [InfoStore],
})
export class InfoComponent {
    store = inject(InfoStore);
}

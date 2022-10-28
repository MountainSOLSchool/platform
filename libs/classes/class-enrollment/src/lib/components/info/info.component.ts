import { Component, inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

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
    imports: [],
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css'],
    providers: [InfoStore],
})
export class InfoComponent {
    store = inject(InfoStore);
}

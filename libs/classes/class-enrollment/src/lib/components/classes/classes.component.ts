import { Component, inject, Injectable } from '@angular/core';
import { ComponentStore, provideComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../enrollment-workflow/enrollment-workflow.store';

@Injectable()
class ClassesStore extends ComponentStore<{ nil: null }> {
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
    selector: 'sol-class-picker',
    templateUrl: './classes.component.html',
    styleUrls: ['./classes.component.css'],
    providers: [provideComponentStore(ClassesStore)],
})
export class ClassesComponent {
    readonly store = inject(ClassesStore);
}

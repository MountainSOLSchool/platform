import { Component, inject, Injectable } from '@angular/core';
import { ComponentStore, provideComponentStore } from '@ngrx/component-store';
import { map, tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../../enrollment-workflow/enrollment-workflow.store';
import { CardModule } from 'primeng/card';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { CommonModule, DatePipe } from '@angular/common';
import { format } from 'path';

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
    imports: [CardModule, CommonModule],
    selector: 'sol-class-picker',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.css'],
    providers: [provideComponentStore(ClassesStore), DatePipe],
})
export class ClassesComponent {
    readonly store = inject(ClassesStore);
    private readonly functionsApi = inject(FunctionsApi);
    private readonly datePipe = inject(DatePipe);

    private today = Date.now();

    classes$ = this.functionsApi
        .call<{
            classes: Array<{
                title: string;
                startMs: number;
                endMs: number;
                id: string;
                classType: string;
                gradeRangeStart: number;
                gradeRangeEnd: number;
                description: string;
                cost: number;
                location: string;
                instructors: Array<{ first_name: string; last_name: string }>;
                dailyTimes: string;
                weekday: string;
            }>;
        }>('classes')
        .pipe(
            map((response) =>
                response.classes
                    .filter((c) => c.startMs > this.today)
                    .map((c) => {
                        return {
                            ...c,
                            classDateTimes:
                                c.startMs && c.endMs
                                    ? this.datePipe.transform(
                                          new Date(c.startMs),
                                          'shortDate'
                                      ) +
                                      ' - ' +
                                      this.datePipe.transform(
                                          new Date(c.endMs),
                                          'shortDate'
                                      ) +
                                      ', ' +
                                      c.weekday +
                                      ', ' +
                                      c.dailyTimes
                                    : '',
                        };
                    })
            )
        );
}

import { Component, inject, Injectable } from '@angular/core';
import { ComponentStore, provideComponentStore } from '@ngrx/component-store';
import { filter, map, switchMap, tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../../enrollment-workflow/enrollment-workflow.store';
import { CardModule } from 'primeng/card';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { CommonModule, DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';

@Injectable()
class ClassesStore extends ComponentStore<{ selectedClasses: Array<string> }> {
    readonly workflow = inject(EnrollmentWorkflowStore);

    constructor() {
        super({ selectedClasses: ['apc2zggoBoOZpTkUHDDb'] });
    }

    readonly next = this.effect(() => {
        return this.workflow.nextClick$.pipe(
            filter(() => this.get().selectedClasses.length > 0),
            tap(() =>
                this.workflow.completeStep({
                    selectedClasses: this.get().selectedClasses,
                })
            )
        );
    });
}

@Component({
    standalone: true,
    imports: [
        CardModule,
        CommonModule,
        CheckboxModule,
        InputTextModule,
        ChipModule,
        SkeletonModule,
        FormsModule,
    ],
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

    selectedClasses$ = this.store
        .select((state) => state.selectedClasses)
        .pipe(tap(console.log));

    // TODO: cache this
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
                                      )
                                    : '',
                        };
                    })
            ),
            switchMap((classes) =>
                this.selectedClasses$.pipe(
                    map((selectedClasses) => {
                        return classes.map((c) => {
                            return {
                                ...c,
                                selected: selectedClasses.includes(c.id),
                            };
                        });
                    })
                )
            )
        );

    selectionChanged({
        id: classId,
        selected,
    }: {
        id: string;
        selected: boolean;
    }) {
        this.store.patchState((s) => ({
            selectedClasses: selected
                ? Array.from(new Set([...s.selectedClasses, classId]))
                : s.selectedClasses.filter((id) => id !== classId),
        }));
    }

    trackByClass(
        index: number,
        { id: classId, selected }: { id: string; selected: boolean }
    ) {
        return `${classId}${selected}`;
    }
}

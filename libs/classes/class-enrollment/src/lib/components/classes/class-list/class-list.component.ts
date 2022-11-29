import { Component, inject, Injectable, Output } from '@angular/core';
import { ComponentStore, provideComponentStore } from '@ngrx/component-store';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { EnrollmentWorkflowStore } from '../../enrollment-workflow/enrollment-workflow.store';
import { CardModule } from 'primeng/card';
import { CommonModule, DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { ClassListService } from '../../../services/class-list.service';

@Injectable()
class ClassesStore extends ComponentStore<{ selectedClasses: Array<string> }> {
    readonly workflow = inject(EnrollmentWorkflowStore);

    constructor() {
        super({ selectedClasses: [] });
    }

    readonly reloadSelections = this.effect(() => {
        return this.workflow
            .select(({ enrollment }) => enrollment)
            .pipe(
                filter((enrollment) => !!enrollment),
                take(1),
                tap((enrollment) => {
                    this.patchState({
                        selectedClasses: enrollment.selectedClasses,
                    });
                })
            );
    });

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
    private readonly classListService = inject(ClassListService);
    private readonly datePipe = inject(DatePipe);
    readonly workflow = inject(EnrollmentWorkflowStore);

    selectedClasses$ = this.store
        .select((state) => state.selectedClasses)
        .pipe(tap(console.log));

    @Output() validityChange = this.selectedClasses$.pipe(
        map((selectedClasses) => selectedClasses.length > 0)
    );

    private today = Date.now();

    classes$ = this.classListService.getFutureClasses().pipe(
        map((classes) =>
            classes.map((c) => {
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

import { Component, inject, Output } from '@angular/core';
import {
    BehaviorSubject,
    combineLatest,
    map,
    switchMap,
    withLatestFrom,
} from 'rxjs';
import { EnrollmentWorkflowStore } from '../../enrollment-workflow/enrollment-workflow.store';
import { CardModule } from 'primeng/card';
import { CommonModule, DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { ClassListService } from '../../../services/class-list.service';
import { LetModule } from '@rx-angular/template/let';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';

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
        LetModule,
        SelectButtonModule,
        TagModule,
        ToggleButtonModule,
    ],
    selector: 'sol-class-picker',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.css'],
    providers: [DatePipe],
})
export class ClassesComponent {
    private readonly classListService = inject(ClassListService);
    private readonly datePipe = inject(DatePipe);
    readonly workflow = inject(EnrollmentWorkflowStore);

    private search$ = new BehaviorSubject('');

    selectedClassIds$ = this.workflow.select(
        (state) => state.enrollment.selectedClasses
    );

    @Output() validityChange = this.selectedClassIds$.pipe(
        map((selectedClasses) => selectedClasses.length > 0)
    );

    readonly filterOptions = [
        { name: 'All', value: [] },
        { name: 'Grades 2-5', value: [2, 5] },
        { name: 'Grades 6-12', value: [6, 12] },
    ];

    classes$ = this.classListService.getFutureClasses().pipe(
        map((classes) =>
            classes
                .map((c) => {
                    return {
                        ...c,
                        image: 'https://firebasestorage.googleapis.com/v0/b/mountain-sol-platform.appspot.com/o/th.jpeg?alt=media&token=930a83c7-9e29-45be-b192-58e4546c5802',
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
                .sort((a, b) => a.startMs - b.startMs)
        ),
        switchMap((classes) =>
            this.selectedClassIds$.pipe(
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

    classesResult$ = combineLatest([this.classes$, this.search$]).pipe(
        map(([classes, search]) => {
            return classes.filter((c) =>
                c.title.toLowerCase().includes(search.toLowerCase())
            );
        })
    );

    selectedClasses$ = this.selectedClassIds$.pipe(
        withLatestFrom(this.classes$),
        map(([selectedIds, classes]) =>
            classes.filter((c) => selectedIds.includes(c.id))
        )
    );

    selectionChanged({
        id: classId,
        selected,
    }: {
        id: string;
        selected: boolean;
    }) {
        this.workflow.patchState((s) => ({
            enrollment: {
                ...s.enrollment,
                selectedClasses: selected
                    ? Array.from(
                          new Set([...s.enrollment.selectedClasses, classId])
                      )
                    : s.enrollment.selectedClasses.filter(
                          (id) => id !== classId
                      ),
            },
        }));
    }

    searchChange(search: string) {
        this.search$.next(search);
    }
}

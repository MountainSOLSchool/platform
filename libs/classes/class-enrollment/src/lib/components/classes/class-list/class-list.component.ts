import { Component, inject, Output } from '@angular/core';
import { map, switchMap } from 'rxjs';
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

    selectedClasses$ = this.workflow.select(
        (state) => state.enrollment.selectedClasses
    );

    @Output() validityChange = this.selectedClasses$.pipe(
        map((selectedClasses) => selectedClasses.length > 0)
    );

    readonly filterOptions = [
        { name: 'All', value: [] },
        { name: 'Grades 2-5', value: [2, 5] },
        { name: 'Grades 6-12', value: [6, 12] },
    ];

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
}

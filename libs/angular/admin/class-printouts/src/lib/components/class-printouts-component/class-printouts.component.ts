import {
    ChangeDetectionStrategy,
    Component,
    inject,
    linkedSignal,
    OnInit,
    signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ClassPrintoutsViewComponent } from './class-printouts.view.component';
import { ClassPrintoutRow } from '../../models/class-printout-row.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { ClassListService } from '@sol/angular/classes/list';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { filter, map, pipe, switchMap, tap } from 'rxjs';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { CopyClassEmailsService } from '../../services/copy-class-emails.service';
import { CopyClassService } from '../../services/copy-class.service';
import { Dialog } from '@angular/cdk/dialog';
import { ClassPrintoutsDisplayComponent } from './class-printouts-display.component';
import { ClassEmailsDialogComponent } from './class-emails.component';
import {
    CopyClassDialogComponent,
    CopyClassDialogData,
    CopyClassDialogResult,
} from './copy-class-dialog.component';
import { DialogContainerComponent } from '@sol/angular/dialog';

@Component({
    template: `<sol-class-printouts-view
        [rows]="classRows.value()"
        [classIdOfEmailsBeingCopied]="rowOfEmailsBeingCopied()?.id"
        [classIdBeingCopied]="rowBeingCopied()?.id"
        [semesters]="semesters.value()"
        [selectedSemester]="selectedSemester()"
        (selectedSemesterChange)="selectedSemesterChange($event)"
        (downloadClick)="downloadClick($event)"
        (copyEmailsClick)="copyEmailsClick($event)"
        (copyClick)="copyClick($event)"
    ></sol-class-printouts-view>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ClassPrintoutsViewComponent],
})
export class ClassPrintoutsComponent implements OnInit {
    readonly #classSemesterListService = inject(ClassesSemesterListService);
    readonly #classListService = inject(ClassListService);
    readonly #copyClassEmailsService = inject(CopyClassEmailsService);
    readonly #copyClassService = inject(CopyClassService);
    readonly #dialog = inject(Dialog);
    readonly #router = inject(Router);

    readonly semesters = rxResource({
        stream: () =>
            this.#classSemesterListService
                .getAllSemestersWithCurrentFirst()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly selectedSemester = linkedSignal<string>(
        () => this.semesters.value()?.[0]?.id ?? ''
    );

    readonly classRows = rxResource({
        params: () => this.selectedSemester(),
        stream: ({ params: selectedSemester }) =>
            this.#classListService
                .getClassesBySemesterIds([selectedSemester])
                .pipe(
                    RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                    map((classesAndGroupsBySemesterId) =>
                        this.#mapToClassRows(
                            classesAndGroupsBySemesterId[selectedSemester]
                        )
                    )
                ),
    });

    readonly rowOfEmailsBeingCopied = signal<ClassPrintoutRow | undefined>(
        undefined
    );

    readonly rowBeingCopied = signal<ClassPrintoutRow | undefined>(undefined);

    readonly #copyClassEmailsFor = rxMethod<ClassPrintoutRow | undefined>(
        pipe(
            filter((row): row is ClassPrintoutRow => !!row),
            switchMap((row) => {
                return this.#copyClassEmailsService
                    .getClassEmails({
                        classId: row.id,
                        semesterId: this.selectedSemester(),
                    })
                    .pipe(
                        tap((emails) =>
                            this.#dialog.open(ClassEmailsDialogComponent, {
                                container: DialogContainerComponent,
                                data: {
                                    emails,
                                    title: row.title,
                                    fullscreen: false,
                                },
                            })
                        ),
                        tap(() => this.rowOfEmailsBeingCopied.set(undefined))
                    );
            })
        )
    );

    ngOnInit() {
        this.#copyClassEmailsFor(this.rowOfEmailsBeingCopied);
    }

    selectedSemesterChange(semester: string) {
        this.selectedSemester.set(semester);
    }

    copyEmailsClick(row: ClassPrintoutRow) {
        this.rowOfEmailsBeingCopied.set(row);
    }

    downloadClick(classId: string) {
        this.#dialog.open(ClassPrintoutsDisplayComponent, {
            container: DialogContainerComponent,
            data: {
                classId,
                semesterId: this.selectedSemester(),
                fullscreen: true,
            },
        });
    }

    copyClick(row: ClassPrintoutRow) {
        const semesters = this.semesters.value();
        if (!semesters) return;

        const dialogRef = this.#dialog.open<CopyClassDialogResult | undefined>(
            CopyClassDialogComponent,
            {
                container: DialogContainerComponent,
                data: {
                    classTitle: row.title,
                    currentSemesterId: this.selectedSemester(),
                    semesters,
                    title: 'Copy Class',
                    fullscreen: false,
                } as CopyClassDialogData & { title: string; fullscreen: boolean },
            }
        );

        dialogRef.closed.subscribe((result) => {
            if (!result) return;

            this.rowBeingCopied.set(row);

            this.#copyClassService
                .copyClass({
                    classId: row.id,
                    sourceSemesterId: this.selectedSemester(),
                    targetSemesterId: result.targetSemesterId,
                    newSemesterName: result.newSemesterName,
                })
                .subscribe({
                    next: (response) => {
                        this.rowBeingCopied.set(undefined);
                        this.#router.navigate([
                            '/admin/classes/management/edit',
                            response.newClassId,
                        ]);
                    },
                    error: () => {
                        this.rowBeingCopied.set(undefined);
                    },
                });
        });
    }

    #mapToClassRows({
        classes,
        groups,
    }: {
        classes: Array<SemesterClass>;
        groups: Array<SemesterClassGroup>;
    }): Array<ClassPrintoutRow> {
        const allClasses = [
            ...classes,
            ...groups.flatMap(({ classes }) => classes),
        ];
        return allClasses.map((c) => {
            const start = new Date(c.startMs).toLocaleDateString();
            const end = new Date(c.endMs).toLocaleDateString();
            return {
                id: c.id,
                title: c.title,
                enrolledCount: String(c.enrolledCount),
                start,
                end,
            };
        });
    }
}

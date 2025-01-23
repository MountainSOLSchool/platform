import {
    ChangeDetectionStrategy,
    Component,
    inject,
    linkedSignal,
    OnInit,
    signal,
} from '@angular/core';
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
import { DownloadClassFormsService } from '../../services/download-class-forms.service';

@Component({
    template: `<sol-class-printouts-view
        [rows]="classRows.value()"
        [classIdOfEmailsBeingCopied]="rowOfEmailsBeingCopied()?.id"
        [classIdOfFormsBeingDownloaded]="classIdOfFormsBeingDownloaded()"
        [semesters]="semesters.value()"
        [selectedSemester]="selectedSemester()"
        (selectedSemesterChange)="selectedSemesterChange($event)"
        (downloadClick)="downloadClick($event)"
        (copyEmailsClick)="copyEmailsClick($event)"
    ></sol-class-printouts-view>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ClassPrintoutsViewComponent],
})
export class ClassPrintoutsComponent implements OnInit {
    readonly #classSemesterListService = inject(ClassesSemesterListService);
    readonly #classListService = inject(ClassListService);
    readonly #copyClassEmailsService = inject(CopyClassEmailsService);
    readonly #downloadClassFormsService = inject(DownloadClassFormsService);

    readonly semesters = rxResource({
        loader: () =>
            this.#classSemesterListService
                .getAllSemestersWithCurrentFirst()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly selectedSemester = linkedSignal<string>(
        () => this.semesters.value()?.[0]?.id ?? ''
    );

    readonly classRows = rxResource({
        request: () => this.selectedSemester(),
        loader: ({ request: selectedSemester }) =>
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

    readonly #copyClassEmailsFor = rxMethod<ClassPrintoutRow | undefined>(
        pipe(
            filter((row): row is ClassPrintoutRow => !!row),
            switchMap((row) => {
                return this.#copyClassEmailsService
                    .copyClassEmails({
                        classId: row.id,
                        classTitle: row.title,
                        semesterId: this.selectedSemester(),
                    })
                    .pipe(
                        tap(() => this.rowOfEmailsBeingCopied.set(undefined))
                    );
            })
        )
    );

    readonly classIdOfFormsBeingDownloaded = signal<string | undefined>(
        undefined
    );

    readonly #downloadClassFormsFor = rxMethod<string | undefined>(
        pipe(
            filter((classId): classId is string => !!classId),
            switchMap((classId) => {
                return this.#downloadClassFormsService
                    .downloadClassForms(classId, this.selectedSemester())
                    .pipe(
                        tap(() =>
                            this.classIdOfFormsBeingDownloaded.set(undefined)
                        )
                    );
            })
        )
    );

    ngOnInit() {
        this.#copyClassEmailsFor(this.rowOfEmailsBeingCopied);
        this.#downloadClassFormsFor(this.classIdOfFormsBeingDownloaded);
    }

    selectedSemesterChange(semester: string) {
        this.selectedSemester.set(semester);
    }

    copyEmailsClick(row: ClassPrintoutRow) {
        this.rowOfEmailsBeingCopied.set(row);
    }

    downloadClick(classId: string) {
        this.classIdOfFormsBeingDownloaded.set(classId);
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

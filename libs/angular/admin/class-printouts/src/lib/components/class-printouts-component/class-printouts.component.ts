import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from '@angular/core';
import { ClassPrintoutsStore } from '../../store/class-printouts.store';
import { provideComponentStore } from '@ngrx/component-store';
import { ClassPrintoutsViewComponent } from './class-printouts.view.component';
import { SolLoadingDirective } from '@sol/angular/request';
import { ClassPrintoutRow } from '../../models/class-printout-row.type';

@Component({
    template: `@if (viewModel(); as viewModel) {
        <sol-class-printouts-view
            [rows]="viewModel.rows"
            [isCopyEmailsInProgress]="viewModel.isCopyEmailsInProgress"
            [isClassFormDownloadInProgress]="
                viewModel.isClassFormDownloadInProgress
            "
            [semesters]="viewModel.semesters"
            [selectedSemester]="viewModel.selectedSemester"
            (selectedSemesterChange)="selectedSemesterChange($event)"
            (downloadClick)="downloadClick($event)"
            (copyEmailsClick)="copyEmailsClick($event)"
        ></sol-class-printouts-view>
    }`,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ClassPrintoutsViewComponent, SolLoadingDirective],
    providers: [provideComponentStore(ClassPrintoutsStore)],
})
export class ClassPrintoutsComponent {
    private readonly store = inject(ClassPrintoutsStore);

    readonly viewModel = computed(() => ({
        rows: this.store.rows(),
        isCopyEmailsInProgress: this.store.inProgressCopyClassEmails(),
        isClassFormDownloadInProgress:
            this.store.inProgressClassFormDownloads(),
        semesters: this.store.semesters(),
        selectedSemester: this.store.selectedSelectedSemester(),
    }));

    selectedSemesterChange(semester: string) {
        this.store.loadClassRows(semester);
    }

    copyEmailsClick(semesterClass: ClassPrintoutRow) {
        this.store.copyClassEmails(semesterClass);
    }

    downloadClick(classId: string) {
        this.store.downloadClassForms(classId);
    }
}

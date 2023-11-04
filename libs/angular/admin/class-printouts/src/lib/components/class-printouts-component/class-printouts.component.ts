import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { combineLatest, map, shareReplay } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ClassPrintoutsStore } from './class-printouts.store';
import { provideComponentStore } from '@ngrx/component-store';
import { RxLet } from '@rx-angular/template/let';
import { SemesterClass } from '@sol/classes/domain';
import { RequestedOperatorsUtility } from '@sol/angular/request';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        AutoCompleteModule,
        FileUploadModule,
        ProgressBarModule,
        TableModule,
        RxLet,
    ],
    providers: [provideComponentStore(ClassPrintoutsStore)],
    templateUrl: './class-printouts.component.html',
})
export class ClassPrintoutsComponent {
    private readonly store = inject(ClassPrintoutsStore);
    readonly classes$ = inject(FirebaseFunctionsService)
        .call<{
            classes: Array<{
                title: string;
                startMs: number;
                endMs: number;
                id: string;
                enrolledCount: string;
            }>;
        }>('classes')
        .pipe(
            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
            map(({ classes }) =>
                classes.map((c) => {
                    const start = new Date(c.startMs).toLocaleDateString();
                    const end = new Date(c.endMs).toLocaleDateString();
                    return {
                        id: c.id,
                        title: c.title,
                        enrolledCount: c.enrolledCount,
                        start,
                        end,
                    };
                })
            ),
            shareReplay()
        );

    readonly isClassFormDownloadInProgress$ = this.store.select(
        (state) => state.inProgressClassFormDownloads
    );
    readonly isClassSignInFormDownloadsInProgress$ = this.store.select(
        (state) => state.inProgressCopyClassEmails
    );

    readonly viewModel$ = combineLatest([
        this.classes$,
        this.isClassSignInFormDownloadsInProgress$,
        this.isClassFormDownloadInProgress$,
    ]).pipe(
        map(
            ([
                classes,
                isClassSignInFormDownloadsInProgress,
                isClassFormDownloadInProgress,
            ]) => ({
                classes,
                isClassSignInFormDownloadsInProgress,
                isClassFormDownloadInProgress,
            })
        )
    );

    copyEmailsClick(semesterClass: SemesterClass) {
        this.store.copyClassEmails(semesterClass);
    }

    downloadClick(classId: string) {
        this.store.downloadClassForms(classId);
    }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { combineLatest, map, shareReplay } from 'rxjs';
import { ClassPrintoutsStore } from './class-printouts.store';
import { provideComponentStore } from '@ngrx/component-store';
import { SemesterClass } from '@sol/classes/domain';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { ClassPrintoutsViewComponent } from './class-printouts.view.component';

@Component({
    template: `<sol-class-printouts-view
        [classes]="viewModel().classes()"
        [isClassSignInFormDownloadsInProgress]="
            viewModel().isClassSignInFormDownloadsInProgress()
        "
        [isClassFormDownloadInProgress]="
            viewModel().isClassFormDownloadInProgress()
        "
    ></sol-class-printouts-view>`,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ClassPrintoutsViewComponent],
    providers: [provideComponentStore(ClassPrintoutsStore)],
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

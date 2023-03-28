import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { combineLatest, map, shareReplay, tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ClassPrintoutsStore } from './class-printouts.store';
import { provideComponentStore } from '@ngrx/component-store';
import { LetModule } from '@rx-angular/template/let';

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
        LetModule,
    ],
    providers: [provideComponentStore(ClassPrintoutsStore)],
    templateUrl: './class-printouts.component.html',
})
export class ClassPrintoutsComponent {
    private readonly store = inject(ClassPrintoutsStore);
    readonly classes$ = inject(FunctionsApi)
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
            shareReplay(),
            tap(() => console.log('loaded classes'))
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
        ),
        tap(() => console.log('loaded view model'))
    );

    copyEmailsClick(classId: string) {
        this.store.copyClassEmails(classId);
    }

    downloadClick(classId: string) {
        this.store.downloadClassForms(classId);
    }
}

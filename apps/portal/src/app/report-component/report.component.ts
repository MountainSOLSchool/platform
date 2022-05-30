import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { BehaviorSubject, map, Observable, shareReplay, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { reportComponentActions } from './store/report.actions';
import { reportComponentFeature } from './store/report.feature';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './report.component.html',
})
export class ReportComponent implements OnInit {
    constructor(
        private readonly functionsApi: FunctionsApi,
        private readonly store: Store
    ) {}

    isClassFormDownloadInProgress$:
        | Observable<Record<string, boolean>>
        | undefined;
    isClassSignInFormDownloadsInProgress$:
        | Observable<Record<string, boolean>>
        | undefined;
    copyEmailsButtonLabel$: Observable<Record<string, string>> | undefined;
    copyEmailButtonStyleClass$: Observable<string> | undefined;

    uploadClick$ = new Subject<{ files: Array<File> }>();
    selectedClass$ = new BehaviorSubject<{ name: string } | undefined>(
        undefined
    );
    classNameInput$ = new Subject<{ query: string }>();
    reportNameKeydown$ = new Subject<KeyboardEvent>();
    emailClick$ = new Subject<string | undefined>();

    classes$ = this.functionsApi
        .call<{
            classes: Array<{
                title: string;
                start: { _seconds: number };
                end: { _seconds: number };
                id: string;
                enrolledCount: string;
            }>;
        }>('classes')
        .pipe(
            map(({ classes }) =>
                classes.map((c) => {
                    const start = new Date(
                        (c.start?._seconds ?? 0) * 1000
                    ).toLocaleDateString();
                    const end = new Date(
                        (c.end?._seconds ?? 0) * 1000
                    ).toLocaleDateString();
                    return {
                        id: c.id,
                        title: c.title,
                        enrolledCount: c.enrolledCount,
                        start,
                        end,
                    };
                })
            ),
            shareReplay(1)
        );

    ngOnInit(): void {
        this.isClassFormDownloadInProgress$ = this.store.select(
            reportComponentFeature.selectInProgressClassFormDownloads
        );
        this.isClassSignInFormDownloadsInProgress$ = this.store.select(
            reportComponentFeature.selectInProgressCopyClassEmails
        );
        // this.copyEmailsButtonLabel$ = this.store.select(
        //     reportComponentFeature.selectInProgressCopyClassEmails
        // ).pipe(
        //     pairwise(),
        //     filter(([prev, cur])=> Object.assign({}, Object.entries(cur).map))
        //     startWith('Copy emails'),
        //     repeatWhen()
        // );
    }

    copyEmailsClick(className: string) {
        this.store.dispatch(
            reportComponentActions.copyEmailsIntent({ className })
        );
    }

    downloadClick(className: string) {
        this.store.dispatch(
            reportComponentActions.downloadFormsIntent({ className })
        );
    }
}

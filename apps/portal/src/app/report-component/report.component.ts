import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import {
    BehaviorSubject,
    delay,
    filter,
    forkJoin,
    from,
    map,
    mapTo,
    merge,
    Observable,
    of,
    pairwise,
    repeatWhen,
    shareReplay,
    startWith,
    Subject,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import * as Papa from 'papaparse';
import {
    StudentEnrollmentCsvHeaderMap,
    StudentEnrollmentEntry,
} from '@sol/student/import';
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
            classes: Array<{ title: string; enrolledCount: string }>;
        }>('classes')
        .pipe(shareReplay(1));

    isUploading$ = this.uploadClick$.pipe(
        switchMap(({ files }) => {
            return forkJoin(
                files.map((file) => {
                    return from(file.text()).pipe(
                        map((text) => {
                            const repeatedHeaderCount = new Map<
                                string,
                                number
                            >();
                            const enrollmentRecords =
                                Papa.parse<StudentEnrollmentEntry>(text, {
                                    header: true,
                                    transform: (value) => value?.trim() ?? '',
                                    transformHeader: (h) => {
                                        const transformConfig =
                                            StudentEnrollmentCsvHeaderMap[h];
                                        const repeatedCount =
                                            repeatedHeaderCount.get(h) ?? 0;
                                        const transformed =
                                            typeof transformConfig === 'string'
                                                ? transformConfig
                                                : transformConfig[
                                                      repeatedCount
                                                  ];
                                        repeatedHeaderCount.set(
                                            h,
                                            repeatedCount + 1
                                        );
                                        return transformed;
                                    },
                                });
                            return enrollmentRecords.data;
                        })
                    );
                })
            ).pipe(
                map((enrollmentGroups) =>
                    enrollmentGroups.reduce(
                        (agg, group) => [...agg, ...group],
                        []
                    )
                ),
                switchMap((enrollmentEntries) =>
                    this.functionsApi
                        .call(
                            'importStudentEnrollmentSummer2022',
                            enrollmentEntries
                        )
                        .pipe(mapTo(false))
                ),
                startWith(true)
            );
        })
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

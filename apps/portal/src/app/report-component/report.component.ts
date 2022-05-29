import { ChangeDetectionStrategy, Component } from '@angular/core';
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

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './report.component.html',
})
export class ReportComponent {
    constructor(
        private readonly functionsApi: FunctionsApi,
        private readonly clipboard: Clipboard
    ) {}

    uploadClick$ = new Subject<{ files: Array<File> }>();
    downloadClick$ = new Subject<string | undefined>();
    selectedClass$ = new BehaviorSubject<{ name: string } | undefined>(
        undefined
    );
    classNameInput$ = new Subject<{ query: string }>();
    reportNameKeydown$ = new Subject<KeyboardEvent>();
    emailClick$ = new Subject<string | undefined>();

    #downloadIntent$ = merge(
        this.downloadClick$,
        this.reportNameKeydown$.pipe(
            filter((event) => event.key === 'Enter'),
            mapTo(undefined)
        )
    );

    classes$ = this.functionsApi
        .call<{
            classes: Array<{ title: string; enrollmentCount: string }>;
        }>('classes')
        .pipe(shareReplay(1));

    classSuggestions$: Observable<Array<{ name: string }>> =
        this.classNameInput$.pipe(
            withLatestFrom(this.classes$),
            map(([{ query }, { classes }]) => {
                return classes
                    .map((c) => c.title)
                    .filter((c) =>
                        c
                            .toLocaleLowerCase()
                            .startsWith(query.toLocaleLowerCase())
                    );
            }),
            map((suggestions) => suggestions.map((s) => ({ name: s })))
        );

    isLoadingReport$ = this.#downloadIntent$.pipe(
        withLatestFrom(this.selectedClass$),
        filter(
            ([classFromRow, selected]) =>
                !!classFromRow ?? selected?.name !== ''
        ),
        switchMap(([classFromRow, selected]) => {
            return merge(
                this.#downloadRosterReport$(
                    classFromRow ?? selected?.name ?? ''
                ).pipe(map(({ finished }) => !finished)),
                this.#downloadSignInReport$(
                    classFromRow ?? selected?.name ?? ''
                ).pipe(map(({ finished }) => !finished))
            );
        }),
        startWith(false)
    );

    isLoadingEmails$ = this.emailClick$.pipe(
        withLatestFrom(this.selectedClass$),
        filter(
            ([classFromRow, selected]) =>
                !!classFromRow ?? selected?.name !== ''
        ),
        switchMap(([classFromRow, selected]) =>
            this.copyEmailsToClipboard(
                classFromRow ?? selected?.name ?? ''
            ).pipe(map(({ finished }) => !finished))
        ),
        startWith(false)
    );

    copyEmailsButtonLabelWhenCopyHappens$ = this.isLoadingEmails$.pipe(
        pairwise(),
        filter(([last, current]) => last === true && current === false),
        map(() => 'Copied emails!')
    );

    copyEmailsButtonLabel$ = merge(
        of('Copy Email List'),
        this.copyEmailsButtonLabelWhenCopyHappens$,
        this.copyEmailsButtonLabelWhenCopyHappens$.pipe(
            delay(5000),
            map(() => 'Copy Email List')
        )
    );

    copyEmailButtonStyleClass$ = this.copyEmailsButtonLabel$.pipe(
        map((label) => (label === 'Copied emails!' ? 'p-button-success' : ''))
    );

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

    copyEmailsToClipboard(className: string) {
        return this.functionsApi
            .call<{ list: Array<string> }>(`emails?class=${className}`)
            .pipe(
                map(({ list }) => list.join(', ')),
                tap((joinedEmails) => this.clipboard.copy(joinedEmails)),
                mapTo({ finished: true }),
                startWith({ finished: false })
            );
    }

    #downloadRosterReport$(
        className: string
    ): Observable<{ finished: boolean }> {
        return this.functionsApi
            .call<{ data: Array<number> }>(`roster?class=${className}`)
            .pipe(
                tap(({ data }) => {
                    const spreadsheetFile = new Blob([new Uint8Array(data)], {
                        type: 'application/pdf',
                    });
                    this.#downloadBlob(
                        spreadsheetFile,
                        `${className} roster.pdf`
                    );
                }),
                mapTo({ finished: true }),
                startWith({ finished: false })
            );
    }

    #downloadSignInReport$(
        className: string
    ): Observable<{ finished: boolean }> {
        return this.functionsApi
            .call<{ data: Array<number> }>(`signIn?class=${className}`)
            .pipe(
                tap(({ data }) => {
                    const spreadsheetFile = new Blob([new Uint8Array(data)], {
                        type: 'application/pdf',
                    });
                    this.#downloadBlob(
                        spreadsheetFile,
                        `${className} sign-in.pdf`
                    );
                }),
                mapTo({ finished: true }),
                startWith({ finished: false })
            );
    }

    #downloadBlob(blob: Blob, name = 'file.txt') {
        const data = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = data;
        link.download = name;

        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            })
        );

        setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
        }, 100);
    }
}

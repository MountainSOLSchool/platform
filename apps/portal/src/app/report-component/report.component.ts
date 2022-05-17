import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import {
    delay,
    filter,
    map,
    mapTo,
    merge,
    Observable,
    of,
    pairwise,
    startWith,
    Subject,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './report.component.html',
})
export class ReportComponent {
    constructor(
        private readonly functionsApi: FunctionsApi,
        private readonly clipboard: Clipboard
    ) {}

    downloadClick$ = new Subject<void>();
    selectedClass$ = new Subject<{ name: string }>();
    classNameInput$ = new Subject<{ query: string }>();
    reportNameKeydown$ = new Subject<KeyboardEvent>();
    emailClick$ = new Subject<void>();

    #downloadIntent$ = merge(
        this.downloadClick$,
        this.reportNameKeydown$.pipe(filter((event) => event.key === 'Enter'))
    );

    #classNames$ = this.functionsApi
        .get<{
            classes: Array<{ title: string }>;
        }>('classes')
        .pipe(map(({ classes }) => classes.map(({ title }) => title)));

    classSuggestions$: Observable<Array<{ name: string }>> =
        this.classNameInput$.pipe(
            withLatestFrom(this.#classNames$),
            map(([{ query }, classNames]) => {
                return classNames.filter((c) =>
                    c.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())
                );
            }),
            map((suggestions) => suggestions.map((s) => ({ name: s })))
        );

    isLoadingReport$ = this.#downloadIntent$.pipe(
        withLatestFrom(this.selectedClass$),
        filter(([, { name }]) => name !== ''),
        switchMap(([, { name }]) => {
            return this.#downloadReport$(name).pipe(
                map(({ finished }) => !finished)
            );
        }),
        startWith(false)
    );

    isLoadingEmails$ = this.emailClick$.pipe(
        withLatestFrom(this.selectedClass$),
        filter(([, { name }]) => name !== ''),
        switchMap(([, { name }]) =>
            this.copyEmailsToClipboard(name).pipe(
                map(({ finished }) => !finished)
            )
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

    copyEmailsToClipboard(className: string) {
        return this.functionsApi
            .get<{ emails: Array<string> }>(`emails?class=${className}`)
            .pipe(
                map(({ emails }) => emails.join(', ')),
                tap((joinedEmails) => this.clipboard.copy(joinedEmails)),
                mapTo({ finished: true }),
                startWith({ finished: false })
            );
    }

    #downloadReport$(reportName: string): Observable<{ finished: boolean }> {
        return this.functionsApi
            .get<{ data: Array<number> }>(`roster?class=${reportName}`)
            .pipe(
                tap(({ data }) => {
                    const spreadsheetFile = new Blob([new Uint8Array(data)], {
                        type: 'application/pdf',
                    });
                    this.#downloadBlob(spreadsheetFile, 'roster.pdf');
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

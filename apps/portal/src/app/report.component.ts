import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import {
    filter,
    map,
    mapTo,
    merge,
    Observable,
    startWith,
    Subject,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<span class="field" style="margin-right: 4px">
            <label for="classNameInput" class="block">Class Name</label>
            <input
                pInputText
                type="text"
                (keyup)="reportNameInputChange$.next($event)"
                (keydown)="reportNameInputKeydown$.next($event)"
                id="classNameInput"
                placeholder="Knots-fall-2021"
            />
        </span>
        <p-button
            label="Download"
            icon="pi pi-download"
            id="downloadBtn"
            [loading]="(isLoadingReport$ | async) ?? false"
            (click)="downloadClick$.next()"
        >
        </p-button>`,
})
export class ReportComponent {
    constructor(private readonly functionsApi: FunctionsApi) {}

    downloadClick$ = new Subject<void>();
    reportNameInputChange$ = new Subject<Event>();
    reportNameInputKeydown$ = new Subject<KeyboardEvent>();

    #downloadIntent$ = merge(
        this.downloadClick$,
        this.reportNameInputKeydown$.pipe(
            filter((event) => event.key === 'Enter')
        )
    );

    #reportName$ = this.reportNameInputChange$.pipe(
        map((event) => (event.target as HTMLInputElement).value ?? '')
    );

    isLoadingReport$ = this.#downloadIntent$.pipe(
        withLatestFrom(this.#reportName$),
        filter(([, reportName]) => reportName !== ''),
        switchMap(([, reportName]) => {
            return this.#downloadReport$(reportName).pipe(
                map(({ finished }) => !finished)
            );
        }),
        startWith(false)
    );

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

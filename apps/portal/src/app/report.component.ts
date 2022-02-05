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
    template: `<div style="display:flex; align-items: flex-start">
        <div style="align-self:flex-end">
            <span class="field" style="margin-right: 4px">
                <label for="classNameInput" class="block">Class Name</label>
                <p-autoComplete
                    field="name"
                    (completeMethod)="classNameInput$.next($event)"
                    (onSelect)="selectedClass$.next($event)"
                    (onKeyUp)="reportNameKeydown$.next($event)"
                    [showEmptyMessage]="true"
                    [suggestions]="(classSuggestions$ | async) ?? []"
                    field="name"
                    [minLength]="1"
                ></p-autoComplete>
            </span>
        </div>
        <div style="align-self:flex-end">
            <p-button
                label="Download"
                icon="pi pi-download"
                id="downloadBtn"
                [loading]="(isLoadingReport$ | async) ?? false"
                (click)="downloadClick$.next()"
            >
            </p-button>
        </div>
    </div>`,
})
export class ReportComponent {
    constructor(private readonly functionsApi: FunctionsApi) {}

    downloadClick$ = new Subject<void>();
    selectedClass$ = new Subject<{ name: string }>();
    classNameInput$ = new Subject<{ query: string }>();
    reportNameKeydown$ = new Subject<KeyboardEvent>();

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

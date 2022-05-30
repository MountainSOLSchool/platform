import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { MessageService } from 'primeng/api';
import { forkJoin, map, mapTo, startWith, switchMap, tap } from 'rxjs';
import { reportComponentActions, reportEffectsActions } from './report.actions';

@Injectable({ providedIn: 'root' })
export class ReportComponentEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly functionsApi: FunctionsApi,
        private readonly clipboard: Clipboard,
        private readonly messageService: MessageService
    ) {}

    downloadClassForms$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(reportComponentActions.downloadFormsIntent),
            switchMap(({ className }) => {
                return forkJoin([
                    this.functionsApi
                        .call<{ data: Array<number> }>(
                            `roster?class=${className}`
                        )
                        .pipe(
                            tap(({ data }) => {
                                const spreadsheetFile = new Blob(
                                    [new Uint8Array(data)],
                                    {
                                        type: 'application/pdf',
                                    }
                                );
                                this.#downloadBlob(
                                    spreadsheetFile,
                                    `${className} roster.pdf`
                                );
                            })
                        ),
                    this.functionsApi
                        .call<{ data: Array<number> }>(
                            `signIn?class=${className}`
                        )
                        .pipe(
                            tap(({ data }) => {
                                const spreadsheetFile = new Blob(
                                    [new Uint8Array(data)],
                                    {
                                        type: 'application/pdf',
                                    }
                                );
                                this.#downloadBlob(
                                    spreadsheetFile,
                                    `${className} sign-in.pdf`
                                );
                            })
                        ),
                ]).pipe(
                    mapTo(
                        reportEffectsActions.finishedDownloadingForms({
                            className,
                        })
                    ),
                    startWith(
                        reportEffectsActions.startedDownloadingForms({
                            className,
                        })
                    )
                );
            })
        );
    });

    // loadClasses$ = createEffect();

    copyClassEmails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(reportComponentActions.copyEmailsIntent),
            switchMap(({ className }) => {
                return this.functionsApi
                    .call<{ list: Array<string> }>(`emails?class=${className}`)
                    .pipe(
                        map(({ list }) => list.join(', ')),
                        tap((joinedEmails) =>
                            this.clipboard.copy(joinedEmails)
                        ),
                        mapTo(
                            reportEffectsActions.finishedDownloadingClassEmails(
                                { className }
                            )
                        ),
                        tap(() =>
                            this.messageService.add({
                                summary: `Copied emails for ${className}!`,
                                severity: 'success',
                            })
                        ),
                        startWith(
                            reportEffectsActions.startedDownloadingClassEmails({
                                className,
                            })
                        )
                    );
            })
        );
    });

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

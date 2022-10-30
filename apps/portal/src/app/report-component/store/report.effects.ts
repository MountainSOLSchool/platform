import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { inject, Injectable, NgModule } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { forkJoin, map, mapTo, startWith, switchMap, tap } from 'rxjs';
import { reportComponentActions, reportEffectsActions } from './report.actions';

@NgModule({
    imports: [ClipboardModule, MessageModule],
    providers: [MessageService],
})
@Injectable({ providedIn: 'root' })
export class ReportComponentEffects {
    private readonly actions$ = inject(Actions);
    private readonly functionsApi = inject(FunctionsApi);
    private readonly clipboard = inject(Clipboard);
    private readonly messageService = inject(MessageService);

    downloadClassForms$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(reportComponentActions.downloadFormsIntent),
            switchMap(({ className }) => {
                return forkJoin([
                    this.functionsApi
                        .call<{ html: string }>(`roster?class=${className}`)
                        .pipe(
                            tap(({ html }) => {
                                const win = window.open(
                                    '',
                                    `${className} Roster`,
                                    `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${
                                        screen.width / 2
                                    },height=${screen.height},top=0,left=0`
                                );
                                if (win) {
                                    win.document.body.innerHTML = html;
                                }
                            })
                        ),
                    this.functionsApi
                        .call<{ html: string }>(`signIn?class=${className}`)
                        .pipe(
                            tap(({ html }) => {
                                const win = window.open(
                                    '',
                                    `${className} Sign In/Out`,
                                    `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${
                                        screen.width / 2
                                    },height=${screen.height},top=0,left=${
                                        screen.width / 2
                                    }`
                                );
                                if (win) {
                                    win.document.body.innerHTML = html;
                                }
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

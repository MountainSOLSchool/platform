import { ComponentStore } from '@ngrx/component-store';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { Clipboard } from '@angular/cdk/clipboard';
import { MessageService } from 'primeng/api';

interface ClassPrintoutsState {
    inProgressClassFormDownloads: Record<string, boolean>;
    inProgressCopyClassEmails: Record<string, boolean>;
}

@Injectable()
export class ClassPrintoutsStore extends ComponentStore<ClassPrintoutsState> {
    private readonly functionsApi = inject(FunctionsApi);
    private readonly clipboard = inject(Clipboard);
    private readonly messageService = inject(MessageService);

    constructor() {
        super({
            inProgressClassFormDownloads: {},
            inProgressCopyClassEmails: {},
        });
    }

    readonly downloadClassForms = this.effect(
        (className$: Observable<string>) => {
            return className$.pipe(
                tap((className) =>
                    this.patchState({
                        inProgressClassFormDownloads: {
                            ...this.get().inProgressClassFormDownloads,
                            [className]: true,
                        },
                    })
                ),
                switchMap((className) => {
                    return forkJoin([
                        this.openClassRoster(className),
                        this.openClassSignIn(className),
                    ]).pipe(
                        tap(() => {
                            this.patchState({
                                inProgressClassFormDownloads: {
                                    ...this.get().inProgressClassFormDownloads,
                                    [className]: false,
                                },
                            });
                        })
                    );
                })
            );
        }
    );

    readonly copyClassEmails = this.effect((className$: Observable<string>) => {
        return className$.pipe(
            tap((className) =>
                this.patchState({
                    inProgressCopyClassEmails: {
                        ...this.get().inProgressCopyClassEmails,
                        [className]: true,
                    },
                })
            ),
            switchMap((className) => {
                return this.functionsApi
                    .call<{ list: Array<string> }>(`emails?class=${className}`)
                    .pipe(
                        map(({ list }) => list.join(', ')),
                        tap((joinedEmails) =>
                            this.clipboard.copy(joinedEmails)
                        ),
                        tap((emails) => {
                            this.clipboard.copy(emails);
                            this.messageService.add({
                                severity: 'success',
                                summary: `Copied emails for ${className}`,
                            });
                            this.patchState({
                                inProgressCopyClassEmails: {
                                    ...this.get().inProgressCopyClassEmails,
                                    [className]: false,
                                },
                            });
                        })
                    );
            })
        );
    });

    private openClassSignIn(className: string) {
        return this.functionsApi
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
            );
    }

    private openClassRoster(className: string) {
        return this.functionsApi
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
            );
    }
}

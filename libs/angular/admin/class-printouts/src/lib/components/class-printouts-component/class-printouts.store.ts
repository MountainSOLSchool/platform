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
        (classId$: Observable<string>) => {
            return classId$.pipe(
                tap((classId) =>
                    this.patchState((state) => ({
                        inProgressClassFormDownloads: {
                            ...state.inProgressClassFormDownloads,
                            [classId]: true,
                        },
                    }))
                ),
                switchMap((classId) => {
                    return forkJoin([
                        this.openClassRoster(classId),
                        this.openClassSignIn(classId),
                    ]).pipe(
                        tap(() => {
                            this.patchState((state) => ({
                                inProgressClassFormDownloads: {
                                    ...state.inProgressClassFormDownloads,
                                    [classId]: false,
                                },
                            }));
                        })
                    );
                })
            );
        }
    );

    readonly copyClassEmails = this.effect((classId$: Observable<string>) => {
        return classId$.pipe(
            tap((classId) =>
                this.patchState((state) => ({
                    inProgressCopyClassEmails: {
                        ...state.inProgressCopyClassEmails,
                        [classId]: true,
                    },
                }))
            ),
            switchMap((classId) => {
                return this.functionsApi
                    .call<{ list: Array<string> }>(`emails?classId=${classId}`)
                    .pipe(
                        map(({ list }) => list.join(', ')),
                        tap((joinedEmails) =>
                            this.clipboard.copy(joinedEmails)
                        ),
                        tap((emails) => {
                            this.clipboard.copy(emails);
                            this.messageService.add({
                                severity: 'success',
                                summary: `Copied emails for ${classId}`,
                            });
                            this.patchState((state) => ({
                                inProgressCopyClassEmails: {
                                    ...state.inProgressCopyClassEmails,
                                    [classId]: false,
                                },
                            }));
                        })
                    );
            })
        );
    });

    private openClassSignIn(classId: string) {
        return this.functionsApi
            .call<{ html: string }>(`signIn?classId=${classId}`)
            .pipe(
                tap(({ html }) => {
                    const win = window.open(
                        '',
                        `${classId} Sign In/Out`,
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

    private openClassRoster(classId: string) {
        return this.functionsApi
            .call<{ html: string }>(`roster?classId=${classId}`)
            .pipe(
                tap(({ html }) => {
                    const win = window.open(
                        '',
                        `${classId} Roster`,
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

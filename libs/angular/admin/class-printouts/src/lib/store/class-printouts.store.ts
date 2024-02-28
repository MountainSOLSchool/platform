import { ComponentStore } from '@ngrx/component-store';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { computed, inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { Clipboard } from '@angular/cdk/clipboard';
import { MessageService } from 'primeng/api';
import {
    Requested,
    RequestedOperatorsUtility,
    RequestedUtility,
    RequestState,
} from '@sol/angular/request';
import { ClassPrintoutRow } from '../models/class-printout-row.type';
import { ClassListService } from '@sol/angular/classes/list';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';

interface ClassPrintoutsState {
    inProgressClassFormDownloads: Record<string, boolean>;
    inProgressCopyClassEmails: Record<string, boolean>;
    rows: Requested<Array<ClassPrintoutRow>>;
    semesters: Array<{ id: string; name: string }>;
    selectedSelectedSemester: string;
}

@Injectable()
export class ClassPrintoutsStore extends ComponentStore<ClassPrintoutsState> {
    private readonly classListService = inject(ClassListService);
    private readonly functionsApi = inject(FirebaseFunctionsService);
    private readonly clipboard = inject(Clipboard);
    private readonly messageService = inject(MessageService);
    private readonly classSemesterListService = inject(
        ClassesSemesterListService
    );

    readonly rows = computed(() => this.state().rows);
    readonly selectedSelectedSemester = computed(
        () => this.state().selectedSelectedSemester
    );
    readonly semesters = computed(() => this.state().semesters);
    readonly inProgressClassFormDownloads = computed(
        () => this.state().inProgressClassFormDownloads
    );
    readonly inProgressCopyClassEmails = computed(
        () => this.state().inProgressCopyClassEmails
    );

    constructor() {
        super({
            inProgressClassFormDownloads: {},
            inProgressCopyClassEmails: {},
            rows: RequestState.Empty,
            semesters: [],
            selectedSelectedSemester: '',
        });
    }

    readonly loadClassRows = this.effect(
        (selectedSemester: Observable<string>) => {
            return selectedSemester.pipe(
                switchMap((semester) => {
                    return this.classListService
                        .getCurrentSemesterClasses()
                        .pipe(
                            map((classes) =>
                                RequestedUtility.mapLoaded(classes, (cs) =>
                                    cs.map((c) => {
                                        const start = new Date(
                                            c.startMs
                                        ).toLocaleDateString();
                                        const end = new Date(
                                            c.endMs
                                        ).toLocaleDateString();
                                        return {
                                            id: c.id,
                                            title: c.title,
                                            enrolledCount: String(
                                                c.enrolledCount
                                            ),
                                            start,
                                            end,
                                        };
                                    })
                                )
                            ),
                            tap((rows) => this.patchState({ rows }))
                        );
                })
            );
        }
    );

    private readonly loadSemesters = this.effect(() => {
        // TODO: load all historical semesters
        return this.classSemesterListService.getEnrollableSemesters().pipe(
            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
            tap((semesters) => {
                this.patchState({
                    semesters,
                    selectedSelectedSemester: semesters[0].id,
                });
                this.loadClassRows(semesters[0].id);
            })
        );
    });

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
                        this.openStudentHealth(classId),
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

    readonly copyClassEmails = this.effect(
        (class$: Observable<ClassPrintoutRow>) => {
            return class$.pipe(
                tap((row) =>
                    this.patchState((state) => ({
                        inProgressCopyClassEmails: {
                            ...state.inProgressCopyClassEmails,
                            [row.id]: true,
                        },
                    }))
                ),
                switchMap((semeseterClass) => {
                    return this.functionsApi
                        .call<{
                            list: Array<string>;
                        }>(`emails?classId=${semeseterClass.id}`)
                        .pipe(
                            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                            map(({ list }) => list.join(', ')),
                            tap((joinedEmails) =>
                                this.clipboard.copy(joinedEmails)
                            ),
                            tap((emails) => {
                                this.clipboard.copy(emails);
                                this.messageService.add({
                                    severity: 'success',
                                    summary: `Copied emails for ${semeseterClass.title}`,
                                });
                                this.patchState((state) => ({
                                    inProgressCopyClassEmails: {
                                        ...state.inProgressCopyClassEmails,
                                        [semeseterClass.id]: false,
                                    },
                                }));
                            })
                        );
                })
            );
        }
    );

    private openClassSignIn(classId: string) {
        return this.functionsApi
            .call<{ html: string }>(`signIn?classId=${classId}`)
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
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
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
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

    private openStudentHealth(classId: string) {
        return this.functionsApi
            .call<{ html: string }>(`studentHealth?classId=${classId}`)
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                tap(({ html }) => {
                    const win = window.open(
                        '',
                        `${classId} Student Health`,
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

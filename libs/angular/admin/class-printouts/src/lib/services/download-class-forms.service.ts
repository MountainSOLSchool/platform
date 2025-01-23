import { inject, Injectable } from '@angular/core';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { forkJoin, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DownloadClassFormsService {
    readonly #functionsApi = inject(FirebaseFunctionsService);

    downloadClassForms(classId: string, semesterId: string) {
        return forkJoin([
            this.#openClassRoster(classId, semesterId),
            this.#openClassSignIn(classId, semesterId),
            this.#openStudentHealth(classId, semesterId),
        ]);
    }

    #openClassSignIn(classId: string, semesterId: string) {
        return this.#functionsApi
            .call<{
                html: string;
            }>(`signIn?classId=${classId}&semesterId=${semesterId}`)
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

    #openClassRoster(classId: string, semesterId: string) {
        return this.#functionsApi
            .call<{
                html: string;
            }>(`roster?classId=${classId}&semesterId=${semesterId}`)
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

    #openStudentHealth(classId: string, semesterId: string) {
        return this.#functionsApi
            .call<{
                html: string;
            }>(`studentHealth?classId=${classId}&semesterId=${semesterId}`)
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

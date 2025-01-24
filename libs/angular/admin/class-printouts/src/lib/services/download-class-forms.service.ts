import { inject, Injectable } from '@angular/core';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { forkJoin, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DownloadClassFormsService {
    readonly #functionsApi = inject(FirebaseFunctionsService);

    downloadClassForms(classId: string, semesterId: string) {
        return forkJoin([
            this.#openClassRoster(classId, semesterId),
            this.#openClassSignIn(classId, semesterId),
            this.#openStudentHealth(classId, semesterId),
        ]).pipe(
            map(([roster, signIn, health]) => ({
                roster,
                signIn,
                health,
            }))
        );
    }

    #openClassSignIn(classId: string, semesterId: string) {
        return this.#functionsApi
            .call<{
                html: string;
            }>(`signIn?classId=${classId}&semesterId=${semesterId}`)
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded());
    }

    #openClassRoster(classId: string, semesterId: string) {
        return this.#functionsApi
            .call<{
                html: string;
            }>(`roster?classId=${classId}&semesterId=${semesterId}`)
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded());
    }

    #openStudentHealth(classId: string, semesterId: string) {
        return this.#functionsApi
            .call<{
                html: string;
            }>(`studentHealth?classId=${classId}&semesterId=${semesterId}`)
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded());
    }
}

import { inject, Injectable } from '@angular/core';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CopyClassEmailsService {
    readonly #functionsApi = inject(FirebaseFunctionsService);

    getClassEmails({
        classId,
        semesterId,
    }: {
        classId: string;
        semesterId: string;
    }) {
        return this.#functionsApi
            .call<{
                list: Array<string>;
            }>(`emails?classId=${classId}&semesterId=${semesterId}`)
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                map(({ list }) => list)
            );
    }
}

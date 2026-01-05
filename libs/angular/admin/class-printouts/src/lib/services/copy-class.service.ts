import { inject, Injectable } from '@angular/core';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { map } from 'rxjs';

export interface CopyClassRequest {
    classId: string;
    sourceSemesterId: string;
    targetSemesterId: string;
    newSemesterName?: string;
}

export interface CopyClassResponse {
    newClassId: string;
    targetSemesterId: string;
}

@Injectable({ providedIn: 'root' })
export class CopyClassService {
    readonly #functionsApi = inject(FirebaseFunctionsService);

    copyClass(request: CopyClassRequest) {
        return this.#functionsApi
            .call<CopyClassResponse>('copyClass', request)
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                map((response) => response)
            );
    }
}

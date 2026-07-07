import { inject, Injectable } from '@angular/core';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { map } from 'rxjs';
import type {
    ClassRosterResponse,
    RosterStudent,
} from '@sol/ts/firebase/api-types';

@Injectable({ providedIn: 'root' })
export class ClassRosterService {
    readonly #functionsApi = inject(FirebaseFunctionsService);

    getClassRoster(classId: string, semesterId: string) {
        return this.#functionsApi
            .call<ClassRosterResponse>(
                `classRoster?classId=${classId}&semesterId=${semesterId}`
            )
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                map((response): Array<RosterStudent> => response.students)
            );
    }
}

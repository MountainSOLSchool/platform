import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import {
    RequestedOperatorsUtility,
    RequestService,
} from '@sol/angular/request';

@Injectable({
    providedIn: 'root',
})
export class ClassesSemesterListService {
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly requestService = inject(RequestService);

    private readonly getEnrollableSemestersRequest =
        this.requestService.declareRequest(() =>
            this.functions.call<{
                semesters: Array<{ id: string; name: string }>;
            }>('semestersAvailableToEnroll')
        );

    getEnrollableSemesters() {
        return this.getEnrollableSemestersRequest
            .getCachedAndLoadWhenEmptyOrFailed()
            .pipe(RequestedOperatorsUtility.mapLoaded((r) => r.semesters));
    }
}
